import { App } from 'Vue'
import { ConfigDictionary } from '@/interfaces/index'

const config: ConfigDictionary = {
  apiBaseUrl: import.meta.env.APP_API_URL || 'http://localhost:4000/v1/',
  authKey: import.meta.env.APP_AUTH_KEY || 'currentUser',
  withCredentials: import.meta.env.APP_WITH_CREDENTIALS || false,
}

export default {
  install: (app: App) => {
    app.config.globalProperties.$cfg = (
      key: string,
      fallbackValue: string | number | boolean,
    ): string | number | boolean => {
      return config[key] || fallbackValue
    }
  },
}

export { config }
