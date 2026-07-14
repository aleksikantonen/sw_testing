// Helpers for generating unique test data

function unique(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`
}

export const uniqueUsername = (prefix = 'test_user') => unique(prefix)
export const uniqueListName = () => unique('list')
export const uniqueItemText = () => unique('task')

export const DEFAULT_PASSWORD = 'secret12345'
