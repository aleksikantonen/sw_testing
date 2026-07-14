import type { APIRequestContext } from '@playwright/test'

const API_URL = process.env.E2E_API_URL ?? 'http://localhost:4322'

export type AuthUser = {
  userId: number
  username: string
  accessToken: string
  refreshToken: string
}

export type TodoListRole = { id: number; name: string }

/**
 * Wrapper around the backend REST API, used to arrange test preconditions.
 */
export class ApiClient {
  constructor(private readonly request: APIRequestContext) {}

  private authHeaders(token: string) {
    return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  }

  async register(username: string, password: string): Promise<AuthUser> {
    const res = await this.request.post(`${API_URL}/api/users/`, {
      data: { username, password },
    })
    if (!res.ok()) throw new Error(`register failed (${res.status()}): ${await res.text()}`)
    return res.json()
  }

  async getRoles(): Promise<TodoListRole[]> {
    const res = await this.request.get(`${API_URL}/api/todo-lists/roles`)
    return res.json()
  }

  async roleId(name: 'owner' | 'editor' | 'viewer'): Promise<number> {
    const roles = await this.getRoles()
    const role = roles.find((r) => r.name === name)
    if (!role) throw new Error(`role ${name} not found`)
    return role.id
  }

  async createList(
    token: string,
    name: string,
    description = '',
  ): Promise<{ id: number; name: string; description: string }> {
    const res = await this.request.post(`${API_URL}/api/todo-lists/`, {
      headers: this.authHeaders(token),
      data: { name, description },
    })
    if (!res.ok()) throw new Error(`createList failed (${res.status()}): ${await res.text()}`)
    return res.json()
  }

  async createItem(
    token: string,
    listId: number,
    description: string,
  ): Promise<{ id: number; description: string }> {
    const res = await this.request.post(`${API_URL}/api/todo-lists/${listId}/todos`, {
      headers: this.authHeaders(token),
      data: { description },
    })
    if (!res.ok()) throw new Error(`createItem failed (${res.status()}): ${await res.text()}`)
    return res.json()
  }

  async shareList(
    token: string,
    listId: number,
    userIds: number[],
    roleId: number,
  ): Promise<void> {
    const res = await this.request.post(`${API_URL}/api/todo-lists/${listId}/share`, {
      headers: this.authHeaders(token),
      data: { user_ids: userIds, role_id: roleId },
    })
    if (!res.ok()) throw new Error(`shareList failed (${res.status()}): ${await res.text()}`)
  }
}
