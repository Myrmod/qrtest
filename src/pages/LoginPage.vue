<template>
  <auth-layout>
    <h1>Login</h1>
    <form @submit="loginHandler">
      <input name="name" type="text" placeholder="Name" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Submit</button>
    </form>
  </auth-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/modules/auth'
import { LoginPayload } from '@/interfaces'
import AuthLayout from '@/layouts/AuthLayout.vue'

export default defineComponent({
  name: 'LoginPage',
  components: { AuthLayout },

  setup() {
    const { login } = useAuth()
    const router = useRouter()

    const loginHandler = (e: Event) => {
      e.preventDefault()
      const elements = (e.target as HTMLFormElement).elements
      if (!elements) return

      const obj = {} as { name: string, password: string }
      for (let i = 0; i < elements.length; i++) {
        const item = elements.item(i) as HTMLInputElement
        if (item?.name) {
          obj[(item.name as 'name' | 'password')] = item.value
        }
      }

      login(<LoginPayload>obj).then(() => {
        router.push({ name: 'home' })
      })
    }

    return { loginHandler }
  },
})
</script>

<style lang="stylus" scoped>
  form
    display flex
    align-items center
    flex-direction column

    & > *
      margin-bottom 1rem

    button
      width: 6rem
</style>