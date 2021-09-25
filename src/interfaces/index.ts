export interface ConfigDictionary {
  [key: string]: string | number | boolean
}

export interface User {
  authenticated: boolean
  name: string
  password: string
  id: string
}

export interface AuthState {
  user?: User
}

export interface LoginPayload {
  name: string
  password: string
}
