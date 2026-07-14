# Users with viewer access are shown "New task" button

**Severity:** Low
**Component:** Shared todo list view permissions

## Summary

When a todo list is shared with another user using the **viewer** role, the **New task** button is displayed and interactive. Clicking it opens an input form where a description can be typed. However, the item is never created, the backend rejects the request because the viewer role does not have write access.

## Preconditions

- Two registered users, e.g. `owner_user` and `viewer_user`.

## Steps for findings

1. Log in as `owner_user`, create a todo list, and add at least one todo item to it.
2. Open the list, click **Share**, search for `viewer_user`, select the role **viewer**, and share the list.
3. Log out and log in as `viewer_user`.
4. Under **Shared with me**, open the shared list.
5. Click **New task** — an input form opens.
6. Type a description and click **Create**.
7. Observe that no new item appears in the list.

## Expected result

The **New task** button should either be hidden or dimmed for a viewer, consistent with how the per-item edit and delete icons are already handled.

## Actual result

The **New task** button is active and opens an input form.
