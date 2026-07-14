import { test, expect } from '@playwright/test'
import type { Page, APIRequestContext } from '@playwright/test'
import { ApiClient } from '../utils/api'
import { seedLogin } from '../utils/auth'
import { DEFAULT_PASSWORD, uniqueItemText, uniqueListName, uniqueUsername } from '../utils/data'
import { HomePage } from '../utils/pages/HomePage'
import { TodoListPage } from '../utils/pages/TodoListPage'

async function setup(page: Page, request: APIRequestContext) {
  const user = await new ApiClient(request).register(uniqueUsername(), DEFAULT_PASSWORD)
  await seedLogin(page, user)
  return { home: new HomePage(page), todoListPage: new TodoListPage(page) }
}

test.describe('Todo list and item core flows', () => {
  test('owner creates and deletes a todo list @smoke', async ({ page, request }) => {
    const { home } = await setup(page, request)
    const name = uniqueListName()

    await home.goto()
    await home.createList(name, 'created by e2e test')
    await expect(home.listLink(name)).toBeVisible()

    await home.deleteList(name)
    await expect(home.listLink(name)).toHaveCount(0)
  })

  test('owner creates and deletes a todo item @smoke', async ({ page, request }) => {
    const { home, todoListPage } = await setup(page, request)
    const listName = uniqueListName()
    const itemText = uniqueItemText()

    await home.goto()
    await home.createList(listName)
    await home.openList(listName)

    await todoListPage.addItem(itemText)
    await expect(todoListPage.itemText(itemText)).toBeVisible()

    await todoListPage.deleteItem(itemText)
    await expect(todoListPage.itemText(itemText)).toHaveCount(0)
  })

  test('owner edits a todo item description', async ({ page, request }) => {
    const { home, todoListPage } = await setup(page, request)
    const listName = uniqueListName()
    const original = uniqueItemText()
    const edited = uniqueItemText()

    await home.goto()
    await home.createList(listName)
    await home.openList(listName)
    await todoListPage.addItem(original)

    await todoListPage.editItem(original, edited)
    await expect(todoListPage.itemText(edited)).toBeVisible()
    await expect(todoListPage.itemText(original)).toHaveCount(0)
  })

  test('owner modifies a todo list name and description', async ({ page, request }) => {
    const { home } = await setup(page, request)
    const name = uniqueListName()
    const newName = `${name}_edited`

    await home.goto()
    await home.createList(name, 'original description')
    await expect(home.listLink(name)).toBeVisible()

    await home.startEditingList(name)
    await home.saveListEdits(newName, 'updated description')

    await expect(home.listLink(newName)).toBeVisible()
  })
})
