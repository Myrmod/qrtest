<template>
  <nav>
    <ul>
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'qrcode' }">QR-Code</router-link></li>
    </ul>
    <div>
      <auth-bar />
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthBar from '@/components/AuthBar.vue'

export default defineComponent({
  name: 'NavBar',
  components: { AuthBar },
})
</script>

<style scoped lang="stylus">
nav
  display flex
  justify-content space-between

  ul
    margin 0
    padding 0
    list-style-type none

    li
      margin-right 1rem
      display inline-block
</style>
