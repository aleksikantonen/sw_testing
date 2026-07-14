# E2E Tests with Playwright

Browser-level tests for the shared todo app UI.

## Prerequisites

- Docker services running from repository root:
  - `docker compose up`
- Node.js installed

## Install

```bash
cd e2e-tests
npm install
npx playwright install
```

## Run

```bash
# full suite
npm test

# smoke only
npm run test:smoke

# open report
npm run report
```

## Coverage

| File | Scope |
|------|-------|
| `auth.smoke.spec.ts` | Register + logout, invalid login |
| `todo-core.spec.ts` | Create/delete list, create/delete item, edit item, edit list name |
| `sharing.spec.ts` | Owner shares a list, recipient views items, viewer add-item negative |

## Known AUT Faults

All 9 tests pass. No tests are expected to fail.

- The viewer add-item test (`sharing.spec.ts`) documents a bug (bug-report-1.md): the "New task" button is shown to viewers but item creation silently fails. The test asserts the correct backend behaviour. No item is created, therefore it passes.
- The non-owner share bug (bug-report-2.md) is covered at the API level only.