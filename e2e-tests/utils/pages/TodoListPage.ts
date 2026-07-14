import type { Page, Locator } from '@playwright/test'

const ICON = {
  edit: 'iconify-icon[icon="fluent:edit-20-regular"]',
  delete: 'iconify-icon[icon="fluent:delete-20-regular"]',
  save: 'iconify-icon[icon="fluent:save-20-regular"]',
}

export class TodoListPage {
  readonly shareDialog: Locator

  constructor(private readonly page: Page) {
    this.shareDialog = page.locator('#share-modal')
  }

  itemText(text: string): Locator {
    return this.page.getByText(text, { exact: true })
  }

  private itemButton(text: string, iconSelector: string): Locator {
    return this.itemText(text).locator('xpath=..').locator(`button:has(${iconSelector})`)
  }

  async addItem(description: string) {
    await this.page.getByRole('button', { name: 'New task' }).click()
    await this.page.getByLabel('Description').fill(description)
    await this.page.getByRole('button', { name: 'Create' }).click()
  }

  async editItem(currentText: string, newText: string) {
    await this.itemButton(currentText, ICON.edit).click()
    const form = this.page.locator(`form:has(${ICON.save})`)
    await form.locator('textarea').fill(newText)
    await form.locator(`button:has(${ICON.save})`).click()
  }

  async deleteItem(text: string) {
    await this.itemButton(text, ICON.delete).click()
  }

  async openShareDialog() {
    await this.page.getByRole('button', { name: 'Share', exact: true }).click()
    await this.shareDialog.waitFor({ state: 'visible' })
  }

  async shareWith(username: string, role: 'owner' | 'editor' | 'viewer' = 'editor') {
    const userInput = this.shareDialog.getByLabel('Add users')
    await userInput.click()
    await userInput.pressSequentially(username, { delay: 40 })
    await this.shareDialog.locator('.solid-select-option', { hasText: username }).first().click()

    if (role !== 'editor') {
      await this.shareDialog.locator('#role').click()
      await this.shareDialog.locator('.solid-select-option', { hasText: role }).first().click()
    }

    await this.shareDialog.getByRole('button', { name: 'share', exact: true }).click()
  }

  get shareSuccessMessage(): Locator {
    return this.shareDialog.getByText('Todo list shared successfully')
  }
}
