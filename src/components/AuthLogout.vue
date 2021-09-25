<template>
  <button type="button" @click="logoutHandler">Logout</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@/modules/auth'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'AuthLogout',

  setup() {
    const { logout } = useAuth()
    const router = useRouter()

    const logoutHandler = () => {
      logout().then(() => router.push({ name: 'login' }))
    }

    return { logoutHandler }
  },
})
</script>
