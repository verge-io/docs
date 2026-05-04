#!/usr/bin/env node
/**
 * Migration script for converting MkDocs markdown files to Starlight format.
 *
 * Usage: node scripts/migrate-file.mjs <source-path> <dest-path> [--kb]
 *
 * Handles:
 * - Adding/fixing frontmatter (title extracted from first # heading)
 * - Converting MkDocs admonitions (!!! / ???) to Starlight :::type[title] syntax
 * - Converting tabbed content (=== "Tab") to Starlight <Tabs> import
 * - Fixing image paths (relative -> /assets/)
 * - Fixing internal links for Starlight routing
 * - Removing MkDocs-specific abbreviation definitions (*[ TERM ]: ...)
 */

import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const sourcePath = args[0];
const destPath = args[1];
const isKB = args.includes('--kb');

if (!sourcePath || !destPath) {
  console.error('Usage: node migrate-file.mjs <source> <dest> [--kb]');
  process.exit(1);
}

let content = fs.readFileSync(sourcePath, 'utf-8');

// ===== 1. Handle frontmatter =====
let frontmatter = {};
let body = content;

const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (fmMatch) {
  // Parse existing frontmatter
  const fmLines = fmMatch[1].split('\n');
  for (const line of fmLines) {
    const kv = line.match(/^(\w+):\s*(.+)/);
    if (kv) {
      frontmatter[kv[1]] = kv[2].trim();
    }
  }
  body = fmMatch[2];
}

// Extract title from first heading if not in frontmatter
if (!frontmatter.title) {
  const headingMatch = body.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    frontmatter.title = headingMatch[1].trim();
  } else {
    frontmatter.title = path.basename(sourcePath, '.md').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
}

// Clean up title quotes
frontmatter.title = frontmatter.title.replace(/^["']|["']$/g, '');

// ===== 2. Convert admonitions =====
// MkDocs: !!! type "title"\n    content\n    more content
// Starlight: :::type[title]\ncontent\n:::
body = convertAdmonitions(body);

// ===== 3. Convert tabbed content =====
// MkDocs: === "Tab Name"\n    content
// Starlight: Uses <Tabs> and <TabItem> components
body = convertTabs(body);

// ===== 4. Fix image paths =====
// Convert relative image paths to absolute /assets/ paths
body = body.replace(/!\[([^\]]*)\]\((\.\.\/)*assets\//g, '![$1](/assets/');

// ===== 5. Fix internal links =====
// Convert /product-guide/... links to work with Starlight routing
body = fixInternalLinks(body);

// ===== 6. Remove abbreviation definitions =====
body = body.replace(/^\*\[\s*[^\]]+\s*\]\s*:.*$/gm, '');

// ===== 7. Remove duplicate title heading if it matches frontmatter =====
const titleHeadingRegex = new RegExp(`^#\\s+${escapeRegex(frontmatter.title)}\\s*$`, 'm');
body = body.replace(titleHeadingRegex, '');

// Clean up excessive blank lines
body = body.replace(/\n{4,}/g, '\n\n\n');
body = body.trim();

// ===== 8. Build output =====
let output = '---\n';
output += `title: "${frontmatter.title.replace(/"/g, '\\"')}"\n`;

if (frontmatter.description) {
  output += `description: "${frontmatter.description.replace(/"/g, '\\"')}"\n`;
}

if (isKB && frontmatter.date) {
  // Keep date for KB articles
  const dateStr = frontmatter.date.split('T')[0];
  output += `date: ${dateStr}\n`;
}

if (isKB && frontmatter.slug) {
  output += `slug: knowledge-base/${frontmatter.slug.replace(/^["']|["']$/g, '')}\n`;
}

output += '---\n\n';
output += body + '\n';

// Write output
const destDir = path.dirname(destPath);
fs.mkdirSync(destDir, { recursive: true });
fs.writeFileSync(destPath, output);
console.log(`Migrated: ${sourcePath} -> ${destPath}`);

// ===== Helper Functions =====

function convertAdmonitions(text) {
  const lines = text.split('\n');
  const result = [];
  let i = 0;

  while (i < lines.length) {
    // Match !!! type "title" or !!! type or ??? type "title" or ???+ type "title"
    const admonMatch = lines[i].match(/^(\!{3}|\?{3}\+?)\s+(\w+)(?:\s+"([^"]*)")?/);

    if (admonMatch) {
      const marker = admonMatch[1];
      const type = admonMatch[2].toLowerCase();
      const title = admonMatch[3] || null;
      const collapsible = marker.startsWith('???');
      const openByDefault = marker === '???+';

      // Map MkDocs type to Starlight type
      const typeMap = {
        note: 'note', abstract: 'note', summary: 'note', tldr: 'note',
        tip: 'tip', hint: 'tip', important: 'tip',
        info: 'note', todo: 'note',
        success: 'tip', check: 'tip', done: 'tip',
        question: 'note', help: 'note', faq: 'note',
        warning: 'caution', caution: 'caution', attention: 'caution',
        failure: 'danger', fail: 'danger', missing: 'danger',
        danger: 'danger', error: 'danger', bug: 'danger',
        example: 'note', quote: 'note', cite: 'note',
      };

      const starlightType = typeMap[type] || 'note';

      // Collect indented body lines
      const bodyLines = [];
      i++;
      while (i < lines.length) {
        if (lines[i].startsWith('    ') || lines[i].startsWith('\t')) {
          bodyLines.push(lines[i].replace(/^    |\t/, ''));
          i++;
        } else if (lines[i].trim() === '' && i + 1 < lines.length &&
                   (lines[i + 1].startsWith('    ') || lines[i + 1].startsWith('\t'))) {
          bodyLines.push('');
          i++;
        } else {
          break;
        }
      }

      const bodyText = bodyLines.join('\n').trim();
      const titleStr = title ? `[${title}]` : '';

      if (collapsible) {
        // Use <details> for collapsible admonitions
        const openAttr = openByDefault ? ' open' : '';
        result.push(`<details${openAttr}>`);
        result.push(`<summary>${title || starlightType.charAt(0).toUpperCase() + starlightType.slice(1)}</summary>`);
        result.push('');
        result.push(bodyText);
        result.push('');
        result.push('</details>');
        result.push('');
      } else {
        result.push(`:::${starlightType}${titleStr}`);
        result.push(bodyText);
        result.push(':::');
        result.push('');
      }
    } else {
      result.push(lines[i]);
      i++;
    }
  }

  return result.join('\n');
}

function convertTabs(text) {
  // Convert === "Tab Name" syntax to HTML-based tabs
  const lines = text.split('\n');
  const result = [];
  let i = 0;
  let inTabGroup = false;
  let tabs = [];
  let currentTab = null;

  while (i < lines.length) {
    const tabMatch = lines[i].match(/^===\s+"([^"]+)"/);

    if (tabMatch) {
      if (!inTabGroup) {
        inTabGroup = true;
        tabs = [];
      }

      if (currentTab) {
        currentTab.body = currentTab.bodyLines.join('\n').trim();
        tabs.push(currentTab);
      }

      currentTab = { label: tabMatch[1], bodyLines: [] };
      i++;

      // Collect indented content
      while (i < lines.length) {
        if (lines[i].startsWith('    ') || lines[i].startsWith('\t')) {
          currentTab.bodyLines.push(lines[i].replace(/^    |\t/, ''));
          i++;
        } else if (lines[i].trim() === '' && i + 1 < lines.length &&
                   (lines[i + 1].startsWith('    ') || lines[i + 1].startsWith('\t') || lines[i + 1].match(/^===\s+"([^"]+)"/))) {
          currentTab.bodyLines.push('');
          i++;
        } else {
          break;
        }
      }
    } else {
      if (inTabGroup) {
        // End of tab group
        if (currentTab) {
          currentTab.body = currentTab.bodyLines.join('\n').trim();
          tabs.push(currentTab);
          currentTab = null;
        }
        inTabGroup = false;

        // Output tabs as simple sections
        for (const tab of tabs) {
          result.push(`**${tab.label}:**`);
          result.push('');
          result.push(tab.body);
          result.push('');
        }
        tabs = [];
      }
      result.push(lines[i]);
      i++;
    }
  }

  // Handle tab group at end of file
  if (inTabGroup && currentTab) {
    currentTab.body = currentTab.bodyLines.join('\n').trim();
    tabs.push(currentTab);
    for (const tab of tabs) {
      result.push(`**${tab.label}:**`);
      result.push('');
      result.push(tab.body);
      result.push('');
    }
  }

  return result.join('\n');
}

function fixInternalLinks(text) {
  // Remove trailing slashes from internal links
  text = text.replace(/\]\(\/([^)]+)\/\)/g, '](/$1/)');

  // Fix /product-guide/... links - keep them as-is since Starlight uses same structure
  // But remove .md extensions if present
  text = text.replace(/\]\(([^)]+)\.md\)/g, ']($1)');

  return text;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
