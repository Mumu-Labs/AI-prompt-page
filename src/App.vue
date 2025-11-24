<!-- src/App.vue -->
<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from '@/views/Layout.vue'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style>
/* 全局样式可放这里 */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
