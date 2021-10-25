<template>
  <div class="container">
    {{ generationCounter }}世代目
    <div class="grid">
      <div v-for="(elem, i) in currentInd" :key="i">
        <Contents :ind="elem" :index="i" :fitness="fitnessList[i]" @fitness="fitness" />
      </div>
    </div>
    <button @click="changeGeneration()">
      世代交代する
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Contents from '@/components/Contents.vue'
import ChangeGeneration from '~/changeGeneration/changeGeneration.js'

export default Vue.extend({
  components: {
    Contents
  },
  props: {
    indList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentInd: [],
      fitnessList: [3, 3, 3, 3, 3, 3, 3, 3],
      generationCounter: 0
    }
  },
  created () {
    this.indList.forEach((elem) => {
      this.currentInd.push(elem)
    })
  },
  methods: {
    async changeGeneration () {
      const res = await ChangeGeneration.main(this.currentInd, this.fitnessList)
      this.currentInd = []
      console.log(res)
      res.forEach((elem) => {
        this.currentInd.push(elem)
      })
      this.generationCounter++
      // this.fitnessList = [3, 3, 3, 3, 3, 3, 3, 3]
    },
    fitness (fitness: number, index: number) {
      this.fitnessList[index] = Number(fitness)
      console.log(this.fitnessList)
    }
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
