import type { Page, Locator } from '@playwright/test'
import { expect } from '@playwright/test'

const ICON = {
  edit: 'iconify-icon[icon="fluent:edit-20-regular"]',
  delete: 'iconify-icon[icon="fluent:delete-20-regular"]',
  save: 'iconify-icon[icon="fluent:save-20-regular"]',
}

export class HomePage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/')
    await expect(this.page.getByRole('heading', { name: 'My todo lists' })).toBeVisible()
  }

  listLink(name: string): Locator {
    return this.page.locator('a[href="/todos"]', { hasText: name })
  }

  private rowButton(name: string, iconSelector: string): Locator {
    return this.listLink(name).locator('xpath=..').locator(`button:has(${iconSelector})`)
  }

  async createList(name: string, description = '') {
    await this.page.getByRole('button', { name: 'New todo list' }).click()
    const form = this.page.locator('form:has(input#name)')
    await form.getByLabel('Name').fill(name)
    await form.getByLabel('Description').fill(description)
    await form.getByRole('button', { name: 'Create' }).click()
  }

  async openList(name: string) {
    await this.listLink(name).click()
    await this.page.waitForURL('**/todos')
  }

  async startEditingList(name: string) {
    await this.rowButton(name, ICON.edit).click()
  }

  async saveListEdits(newName: string, newDescription: string) {
    const form = this.page.locator(`form:has(${ICON.save})`)
    await form.getByLabel('Name').fill(newName)
    await form.getByLabel('Description').fill(newDescription)
    await form.locator(`button:has(${ICON.save})`).click()
  }

  async deleteList(name: string) {
    await this.rowButton(name, ICON.delete).click()
  }
}
