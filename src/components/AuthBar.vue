<template>
  <div v-if="user">
    <span>Hi, {{ user.name }}. </span>
    <auth-logout></auth-logout>
  </div>
  <div v-else>
    <router-link :to="{ name: 'login' }">Login</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@/modules/auth'
import AuthLogout from '@/components/AuthLogout.vue'

export default defineComponent({
  name: 'AuthBar',
  components: { AuthLogout },

  setup() {
    const { user } = useAuth()

    return { user }
  },
})
</script>
