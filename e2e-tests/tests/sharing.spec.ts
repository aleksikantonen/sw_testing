import { test, expect } from '@playwright/test'
import { ApiClient } from '../utils/api'
import { seedLogin } from '../utils/auth'
import { DEFAULT_PASSWORD, uniqueItemText, uniqueListName, uniqueUsername } from '../utils/data'
import { HomePage } from '../utils/pages/HomePage'
import { TodoListPage } from '../utils/pages/TodoListPage'

test.describe('Sharing flows', () => {
  test('owner shares a list with another user @smoke', async ({ page, request }) => {
    const api = new ApiClient(request)
    const user = await api.register(uniqueUsername(), DEFAULT_PASSWORD)
    const recipient = await api.register(uniqueUsername('recipient'), DEFAULT_PASSWORD)
    await seedLogin(page, user)
    const home = new HomePage(page)
    const todoListPage = new TodoListPage(page)
    const listName = uniqueListName()

    await home.goto()
    await home.createList(listName)
    await home.openList(listName)

    await todoListPage.openShareDialog()
    await todoListPage.shareWith(recipient.username, 'editor')

    await expect(todoListPage.shareSuccessMessage).toBeVisible()
  })

  test('recipient views a shared list including its items @smoke', async ({ page, request }) => {
    const api = new ApiClient(request)
    const owner = await api.register(uniqueUsername(), DEFAULT_PASSWORD)
    const recipient = await api.register(uniqueUsername('recipient'), DEFAULT_PASSWORD)
    const listName = uniqueListName()
    const itemText = uniqueItemText()

    const list = await api.createList(owner.accessToken, listName)
    await api.createItem(owner.accessToken, list.id, itemText)
    const editorRoleId = await api.roleId('editor')
    await api.shareList(owner.accessToken, list.id, [recipient.userId], editorRoleId)

    await seedLogin(page, recipient)
    await page.goto('/')
    await page.locator('a[href="/todos"]', { hasText: listName }).click()
    await page.waitForURL('**/todos')

    await expect(page.getByRole('heading', { name: listName })).toBeVisible()
    await expect(page.getByText(itemText)).toBeVisible()
  })

  // negative path
  test('viewer cannot add a new item to a shared list', async ({ page, request }) => {
    const api = new ApiClient(request)
    const owner = await api.register(uniqueUsername(), DEFAULT_PASSWORD)
    const viewer = await api.register(uniqueUsername('viewer'), DEFAULT_PASSWORD)
    const listName = uniqueListName()
    const itemText = uniqueItemText()

    const list = await api.createList(owner.accessToken, listName)
    await api.createItem(owner.accessToken, list.id, itemText)
    const viewerRoleId = await api.roleId('viewer')
    await api.shareList(owner.accessToken, list.id, [viewer.userId], viewerRoleId)

    await seedLogin(page, viewer)
    await page.goto('/')
    await page.locator('a[href="/todos"]', { hasText: listName }).click()
    await page.waitForURL('**/todos')

    const newItemText = uniqueItemText()
    await page.getByRole('button', { name: 'New task' }).click()
    await page.getByLabel('Description').fill(newItemText)
    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page.getByText(newItemText)).toHaveCount(0)
    await expect(page.getByText(itemText)).toBeVisible()
  })
})
