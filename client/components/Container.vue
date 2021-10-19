<template>
  <div class="container">
    <div class="grid">
      <Contents />
      <Contents />
      <Contents />
      <Contents />
      <Contents />
      <Contents />
      <Contents />
      <Contents />
    </div>
    <button>世代交代する</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Contents from '@/components/Contents.vue'
// import InitialGenerate from '~/initialGenerate/initialGeneration.js'

export default Vue.extend({
  components: {
    Contents
  },
  data () {
    return {
      // aa
    }
  },
  created () {
    // 初期生成
    // InitialGenerate.main()
  }
})
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.grid {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 250px);
  gap: 50px;
  justify-content: center;
}
button {
  max-width: 300px;
  width: 90%;
  height: 50px;
  display: grid;
  place-items: center;
  background-color: #6A8791;
  color: #ffffff;
  margin-top: 50px;
  cursor: pointer;
}
</style>
