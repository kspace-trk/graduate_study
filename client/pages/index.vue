<template>
  <div class="index">
    <Container />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Container from '@/components/Container.vue'

export default Vue.extend({
  components: {
    Container
  }
})
</script>
<style scoped lang="scss">
.index {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
