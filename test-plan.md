# Test Plan

**Application under test:** Shared todo list management web app (`swt-todo-list-app`)
**Author:** Aleksi Kantonen
**Date:** 01-07-2026

---

## 1. Introduction

This document explains and describes the testing of shared todo list application. Our goal is to use manual and automated tests for the most important user flows, such as authentication, and creating, viewing, editing, and sharing todo lists and items.

## 2. Objectives

- Confirm the primary user stories work on the happy path
- Find and report functional/usability issues through manual testing
- Provide CI via Github Actions that executes E2E and API tests
- Fast feedback on every push (smoke tests) and deeper coverage nightly

## 3. Test items & environment

| Item | Detail |
|------|--------|
| Frontend | Astro + SolidJS + Tailwind - `http://localhost` |
| Backend API | FastAPI - `http://localhost:4322` |
| Database | PostgreSQL 16 + Flyway migration |
| Run command | `docker compose up` |
| Manual testing target | Unmodified **production** instance |

## 4. Scope

### 4.1 In scope

**Manual testing**
- UI exploration of authentication, list management, item management and sharing
- Reporting functional/usability issues as structured bug reports

**Automated E2E testing (Playwright)**

Happy-path coverage of all user stories, and at least one negative path where applicable:

1. Register a new account
2. Log in
3. Log out
4. Create and delete a todo list
5. Modify a todo list's name and description
6. Create and delete todo items in a list
7. Edit a todo item's description
8. Share a todo list with another user
9. View a todo list shared with me, including its items

A subset of these is tagged as **smoke** tests for fast feedback.

**Automated API testing**

Direct testing of ten backend endpoints across the users, todo-lists and todo-items controllers, covering both happy paths and negative paths.

**CI via GitHub Actions**
- Smoke E2E and API tests on every push
- Full E2E suite on a nightly schedule
- At least one non-functional check (static analysis / dependency vulnerability scan)

### 4.2 Out of scope

The following are **not** covered by this project but would be important for production:

- **Security testing** - checking for issues like broken authentication, authorization, injection attacks, or missing protections
- **Real-time features** - testing live updates and handling of multiple users editing or sharing at the same time
- **Browser and device testing** - making sure the app works well on all browsers and devices, including mobile devices and tablets
- **Accessibility testing** - ensuring the app can be used with assistive technologies
- **Performance testing** - checking how the app handles many users or large amounts of data

### 4.3 Improving the created E2E and API tests

The following improvements are noted as future work, while out of scope for this iteration:

- **Test data** - make test data setup and cleanup simpler and more reliable
- **Maintainability** - make test code easier to read and update
- **Coverage** - add more tests for possible errors and unusual situations
- **Reliability** - make tests independent from previous runs and consistent across environments
- **Broader negative path coverage** — the current negative paths focus on role-permission rejections. Additional coverage could include malformed request bodies, missing required fields, etc.

## 5. Test approach

- **Manual testing** - explores the main features of the web app, with any issues found written up as simple bug reports
- **E2E tests** - use a browser to check that the app works from the user’s point of view
- **API tests** - send requests to the backend and check the responses for both valid and invalid cases
- **Failing tests** - should only happen when there are real problems in the app

## 6. Schedule

| Phase | Activity | Approx. effort |
|-------|----------|----------------|
| 1 | Set up AUT locally, familiarisation, write test plan | Day 1 |
| 2 | Manual testing and bug reports | Day 2 |
| 3 | E2E test design and implementation (Playwright) | Days 3-4 |
| 4 | API test design and implementation (pytest) | Day 5 |
| 5 | CI pipeline | Day 6 |
| 6 | Review, cleanup, documentation, submission | Day 7 |