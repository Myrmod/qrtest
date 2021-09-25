<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthLayout',
})
</script>

<style scoped lang="stylus">
.wrapper
  display flex
  justify-content center
  align-items center
  height 100vh
  flex-direction column
</style>
