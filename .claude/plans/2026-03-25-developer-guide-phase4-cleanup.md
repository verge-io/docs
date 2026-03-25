# Phase 4: Clean Up Old Files

Depends on: Phase 3 (nav updated, all references point to new locations)

## Overview
Delete migrated source files that are no longer referenced. The Prometheus Exporter is NOT deleted (stays in both places). Product Guide SDK/IaC files are deleted since they've been moved.

## Tasks

### Task 1: Delete migrated KB API articles
Remove the 9 KB posts that were migrated to the Developer Guide:

```bash
rm docs/knowledge-base/posts/api-guide.md
rm docs/knowledge-base/posts/API-Tables.md
rm docs/knowledge-base/posts/api-helper-script.md
rm docs/knowledge-base/posts/api-vm-creation.md
rm docs/knowledge-base/posts/api-vm-configuration.md
rm docs/knowledge-base/posts/api-vm-power-management.md
rm docs/knowledge-base/posts/api-vm-lifecycle-management.md
rm docs/knowledge-base/posts/api-vm-advanced-operations.md
rm docs/knowledge-base/posts/api-nas-volume-browser.md
```

### Task 2: Delete migrated Product Guide SDK/IaC files
Remove the 4 Product Guide files that were moved (NOT copied) to the Developer Guide:

```bash
rm docs/product-guide/tools-integrations/powershell-module.md
rm docs/product-guide/tools-integrations/python-sdk.md
rm docs/product-guide/tools-integrations/go-sdk.md
rm docs/product-guide/tools-integrations/terraform-provider.md
```

**DO NOT delete `prometheus-exporter.md`** — it stays in Product Guide.

### Task 3: Delete migrated Kubernetes/Rancher files (if they exist in Product Guide)
If PR 412 was merged and the files exist in Product Guide:

```bash
rm docs/product-guide/tools-integrations/kubernetes-integration.md
rm docs/product-guide/tools-integrations/rancher-integration.md
```

### Task 4: Verify no broken references
Search the entire docs directory for any remaining references to the deleted files:

```bash
grep -r "tools-integrations/powershell-module" docs/
grep -r "tools-integrations/python-sdk" docs/
grep -r "tools-integrations/go-sdk" docs/
grep -r "tools-integrations/terraform-provider" docs/
grep -r "tools-integrations/kubernetes-integration" docs/
grep -r "tools-integrations/rancher-integration" docs/
grep -r "knowledge-base/posts/api-guide" docs/
grep -r "knowledge-base/posts/API-Tables" docs/
grep -r "knowledge-base/posts/api-helper" docs/
grep -r "knowledge-base/posts/api-vm" docs/
grep -r "knowledge-base/posts/api-nas" docs/
```

Fix any broken references found. Also check `mkdocs.yml` for any remaining references to deleted files.

### Task 5: Final build verification
Verify the site builds cleanly with no errors:

```bash
mkdocs build --site-dir ./_site
```

Or check the dev server terminal for errors if it's running.

## Task Checklist
- [x] Task 1: Delete migrated KB API articles
- [ ] Task 2: Delete migrated Product Guide SDK/IaC files
- [ ] Task 3: Delete migrated K8s/Rancher files (if present)
- [ ] Task 4: Verify no broken references
- [ ] Task 5: Final build verification
