import type { Page } from '@playwright/test'
import type { AuthUser } from './api'

/*
 * Tests that are not specifically about authentication start from a logged-in
 * state without repeating the login flow.
 */
export async function seedLogin(page: Page, user: AuthUser): Promise<void> {
  await page.addInitScript((u) => {
    window.localStorage.setItem('userData', JSON.stringify(u))
  }, user)
}
