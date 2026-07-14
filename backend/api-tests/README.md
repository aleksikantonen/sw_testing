# API Tests

HTTP tests for the todo list backend API.

## Prerequisites

- Docker services running from repository root:
  - `docker compose up`
- [uv](https://docs.astral.sh/uv/) installed

## Install & Run

```bash
cd backend/api-tests
uv sync
uv run pytest -v
```

## Coverage

| File | Scope |
|------|-------|
| `test_auth.py` | Register, duplicate registration, login, wrong password, unknown user |
| `test_todo_core.py` | Roles, create/list/get/update/delete lists, unauthenticated access, unknown id |
| `test_todo_items.py` | Create item, list items, unauthenticated access |
