<template>
  <NavBar />
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavBar from '@/components/NavBar.vue'

export default defineComponent({
  name: 'DefaultLayout',
  components: { NavBar },
})
</script>

<style scoped lang="stylus">
div
  min-height 100vh
  display flex
  justify-content center
  align-items center
</style>
