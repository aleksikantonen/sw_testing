# "Share" action is offered to non-owners

**Severity:** Low
**Component:** Navbar / share todo list / role permissions

## Summary

Only a todo list's owner is allowed to share it, but the **Share** action in the navbar is shown to every user who can open the list, including recipients who were granted **viewer** or **editor** access. When such a non-owner opens the share dialog and tries to share the list, the operation fails, so the user is offered an action that can never succeed.

## Preconditions

- Two registered users, e.g. `owner_user` and `member_user`.
- `owner_user` has shared a list with `member_user` (any role).

## Steps for findings

1. Log in as `member_user`.
2. Under **Shared with me**, open the shared list.
3. In the navbar, click **Share**.
4. In the dialog, search for any user, pick a role, and click **share**.

## Expected result

The **Share** action is unavailable to non-owners, since only the owner is permitted to share a list.

## Actual result

The **Share** button is available to the non-owner and opens the share dialog. Submitting the share does not work, the backend rejects it with HTTP 403. The user is thus presented with a control that always fails.
