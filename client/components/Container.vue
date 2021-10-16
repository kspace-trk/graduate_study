<template>
  <div class="container">
    <Contents />
    <Contents />
    <Contents />
    <Contents />
    <Contents />
    <Contents />
    <Contents />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Contents from '@/components/Contents.vue'

export default Vue.extend({
  components: {
    Contents
  }
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  gap: 50px;
  justify-content: center;
}
</style>
