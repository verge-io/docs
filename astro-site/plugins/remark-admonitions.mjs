/**
 * Remark plugin to convert MkDocs Material admonition syntax to Starlight-compatible HTML.
 *
 * Handles:
 *   !!! type "title"       -> non-collapsible aside
 *   !!! type               -> non-collapsible aside (no custom title)
 *   ??? type "title"       -> collapsible <details> block
 *   ???+ type "title"      -> collapsible, open by default
 *
 * MkDocs type mapping to Starlight aside types:
 *   note, abstract, summary, tldr -> note
 *   tip, hint, important -> tip
 *   info, todo -> note
 *   success, check, done -> tip
 *   question, help, faq -> note
 *   warning, caution, attention -> caution
 *   failure, fail, missing -> danger
 *   danger, error -> danger
 *   bug -> danger
 *   example -> note
 *   quote, cite -> note
 */

import { visit } from 'unist-util-visit';

const TYPE_MAP = {
  note: 'note',
  abstract: 'note',
  summary: 'note',
  tldr: 'note',
  tip: 'tip',
  hint: 'tip',
  important: 'tip',
  info: 'note',
  todo: 'note',
  success: 'tip',
  check: 'tip',
  done: 'tip',
  question: 'note',
  help: 'note',
  faq: 'note',
  warning: 'caution',
  caution: 'caution',
  attention: 'caution',
  failure: 'danger',
  fail: 'danger',
  missing: 'danger',
  danger: 'danger',
  error: 'danger',
  bug: 'danger',
  example: 'note',
  quote: 'note',
  cite: 'note',
};

// Default titles for each MkDocs type
const DEFAULT_TITLES = {
  note: 'Note',
  abstract: 'Abstract',
  summary: 'Summary',
  tldr: 'TL;DR',
  tip: 'Tip',
  hint: 'Hint',
  important: 'Important',
  info: 'Info',
  todo: 'Todo',
  success: 'Success',
  check: 'Check',
  done: 'Done',
  question: 'Question',
  help: 'Help',
  faq: 'FAQ',
  warning: 'Warning',
  caution: 'Caution',
  attention: 'Attention',
  failure: 'Failure',
  fail: 'Fail',
  missing: 'Missing',
  danger: 'Danger',
  error: 'Error',
  bug: 'Bug',
  example: 'Example',
  quote: 'Quote',
  cite: 'Cite',
};

/**
 * Parse lines of a markdown document to find admonition blocks and convert them.
 */
export default function remarkAdmonitions() {
  return (tree) => {
    // We need to work at the paragraph/raw level to find admonition markers
    // Strategy: walk the tree, find paragraphs that start with !!! or ???,
    // then collect the indented content below them.

    const newChildren = [];
    let i = 0;

    while (i < tree.children.length) {
      const node = tree.children[i];

      // Check if this is a paragraph that starts an admonition
      const admonitionStart = getAdmonitionStart(node);

      if (admonitionStart) {
        const { type, title, collapsible, openByDefault } = admonitionStart;
        const starlightType = TYPE_MAP[type] || 'note';

        // Collect indented content (next nodes that are part of the admonition body)
        // In the parsed markdown AST, the indented content after !!! is typically
        // in the same paragraph node or in subsequent nodes
        const bodyParts = [];

        // Check if there's content in the same paragraph after the marker line
        const inlineBody = getInlineBody(node);
        if (inlineBody) {
          bodyParts.push(inlineBody);
        }

        // Look ahead for indented content blocks
        let j = i + 1;
        while (j < tree.children.length) {
          const nextNode = tree.children[j];
          // Check if this node is indented content (part of the admonition)
          if (isIndentedContent(nextNode)) {
            bodyParts.push(nextNode);
            j++;
          } else {
            break;
          }
        }

        // Build the replacement HTML node
        const displayTitle = title || DEFAULT_TITLES[type] || starlightType.charAt(0).toUpperCase() + starlightType.slice(1);

        if (collapsible) {
          // Use <details> for collapsible
          const detailsNode = {
            type: 'html',
            value: buildDetailsHtml(starlightType, displayTitle, bodyParts, openByDefault),
          };
          newChildren.push(detailsNode);
        } else {
          // Use Starlight's aside syntax via HTML
          // Starlight supports :::note[title] syntax in markdown
          // But since we're in remark, we'll output the directive syntax
          const asideNode = buildAsideDirective(starlightType, displayTitle, bodyParts);
          newChildren.push(...asideNode);
        }

        i = j;
      } else {
        newChildren.push(node);
        i++;
      }
    }

    tree.children = newChildren;
  };
}

/**
 * Check if a node is the start of an admonition block.
 * Returns parsed info or null.
 */
function getAdmonitionStart(node) {
  if (!node) return null;

  let text = '';

  if (node.type === 'paragraph' && node.children) {
    // Get the raw text from the first text child
    const firstChild = node.children[0];
    if (firstChild && firstChild.type === 'text') {
      text = firstChild.value;
    }
  } else if (node.type === 'html') {
    text = node.value;
  }

  if (!text) return null;

  // Match !!! type "title" or !!! type or ??? type "title" or ???+ type "title"
  const match = text.match(/^([\!\?]{3}\+?)\s+(\w+)(?:\s+"([^"]*)")?/);
  if (!match) return null;

  const marker = match[1];
  const type = match[2].toLowerCase();
  const title = match[3] || null;

  const collapsible = marker.startsWith('???');
  const openByDefault = marker === '???+';

  // Verify the type is known
  if (!TYPE_MAP.hasOwnProperty(type)) return null;

  return { type, title, collapsible, openByDefault };
}

/**
 * Extract inline body text from an admonition start node.
 */
function getInlineBody(node) {
  if (!node || !node.children) return null;

  const firstChild = node.children[0];
  if (!firstChild || firstChild.type !== 'text') return null;

  // Remove the admonition marker line
  const lines = firstChild.value.split('\n');
  const bodyLines = lines.slice(1).map(line => {
    // Remove 4-space indent
    if (line.startsWith('    ')) return line.slice(4);
    if (line.startsWith('\t')) return line.slice(1);
    return line;
  }).filter((line, idx, arr) => {
    // Keep lines that were indented or empty (part of body)
    return true;
  });

  if (bodyLines.length === 0 || bodyLines.every(l => l.trim() === '')) return null;

  // Rebuild the node with remaining children
  const remainingChildren = [...node.children];
  remainingChildren[0] = { ...firstChild, value: bodyLines.join('\n') };

  return {
    type: 'paragraph',
    children: remainingChildren,
  };
}

/**
 * Check if a node appears to be indented content (part of an admonition body).
 * In the parsed AST, this is tricky — MkDocs uses 4-space indent.
 * After markdown parsing, indented content under a paragraph becomes a blockquote
 * or a code block, or sometimes just part of the paragraph.
 */
function isIndentedContent(node) {
  // This is a simplification — in practice, the markdown parser
  // will have already parsed the indented content as part of the
  // paragraph or as a separate structure. We may need to refine this.
  return false;
}

/**
 * Build a Starlight-compatible aside using the ::: directive syntax.
 * This outputs nodes that use the container directive syntax that
 * Starlight's built-in remark plugin can process.
 */
function buildAsideDirective(type, title, bodyParts) {
  // Use Starlight's native :::type[title] syntax
  const bodyText = extractTextFromNodes(bodyParts);

  return [{
    type: 'html',
    value: `<aside class="starlight-aside starlight-aside--${type}" aria-label="${escapeHtml(title)}">
<p class="starlight-aside__title" aria-hidden="true">${escapeHtml(title)}</p>
<section class="starlight-aside__content">

${bodyText}

</section>
</aside>`,
  }];
}

/**
 * Build a collapsible <details> block.
 */
function buildDetailsHtml(type, title, bodyParts, openByDefault) {
  const bodyText = extractTextFromNodes(bodyParts);
  const openAttr = openByDefault ? ' open' : '';

  return `<details${openAttr} class="starlight-aside starlight-aside--${type}">
<summary class="starlight-aside__title">${escapeHtml(title)}</summary>
<section class="starlight-aside__content">

${bodyText}

</section>
</details>`;
}

/**
 * Extract text content from parsed nodes.
 */
function extractTextFromNodes(nodes) {
  return nodes.map(node => {
    if (node.type === 'html') return node.value;
    if (node.type === 'text') return node.value;
    if (node.children) {
      return node.children.map(child => {
        if (child.type === 'text') return child.value;
        if (child.type === 'html') return child.value;
        if (child.type === 'inlineCode') return `\`${child.value}\``;
        if (child.type === 'strong') return `**${child.children?.map(c => c.value).join('')}**`;
        if (child.type === 'emphasis') return `*${child.children?.map(c => c.value).join('')}*`;
        if (child.type === 'link') return `[${child.children?.map(c => c.value).join('')}](${child.url})`;
        return child.value || '';
      }).join('');
    }
    return node.value || '';
  }).join('\n\n');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
