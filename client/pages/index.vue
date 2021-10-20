<template>
  <div class="index">
    <Container />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Container from '@/components/Container.vue'
import initialGenerate from '@/initialGenerate/initialGeneration'

export default Vue.extend({
  components: {
    Container
  },
  created () {
    initialGenerate.main()
  }
})
</script>
<style scoped lang="scss">
.index {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
