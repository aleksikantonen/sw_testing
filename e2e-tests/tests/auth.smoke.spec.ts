import { expect, test } from '@playwright/test'
import { ApiClient } from '../utils/api'
import { DEFAULT_PASSWORD, uniqueUsername } from '../utils/data'

test.describe('Authentication @smoke', () => {
  test('register and logout flow', async ({ page }) => {
    const username = uniqueUsername()

    await page.goto('/register')
    await page.getByLabel('Username').fill(username)
    await page.getByLabel('Password').fill(DEFAULT_PASSWORD)
    await page.getByRole('button', { name: 'Register' }).click()

    // register redirects to home view
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { name: 'My todo lists' })).toBeVisible()

    await page.getByRole('link', { name: 'Logout' }).click()
    await expect(page).toHaveURL(/\/login$/)
  })

  test('login succeeds with valid credentials', async ({ page, request }) => {
    const username = uniqueUsername()

    // arrange the user via API so the test focuses on the login form itself
    await new ApiClient(request).register(username, DEFAULT_PASSWORD)

    await page.goto('/login')
    await page.getByLabel('Username').fill(username)
    await page.getByLabel('Password').fill(DEFAULT_PASSWORD)
    await page.getByRole('button', { name: 'Login' }).click()

    // successful login lands on the home view
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByRole('heading', { name: 'My todo lists' })).toBeVisible()
  })

  test('login fails with invalid password (negative path)', async ({ page, request }) => {
    const username = uniqueUsername()

    // arrange the user via API so the test focuses on login behavior
    await new ApiClient(request).register(username, DEFAULT_PASSWORD)

    await page.goto('/login')
    await page.getByLabel('Username').fill(username)
    await page.getByLabel('Password').fill('wrong-password-123')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.locator('#login-form-error')).toBeVisible()
  })
})
