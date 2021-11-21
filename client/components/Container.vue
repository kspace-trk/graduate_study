<template>
  <div class="container">
    <p>{{ generationCounter }}世代目</p>
    <div class="grid">
      <div v-for="(elem, i) in currentInd" :key="i">
        <Contents :ind="elem" :index="i" :fitness="fitnessList[i]" @fitness="fitness" />
      </div>
    </div>
    <button @click="changeGeneration()">
      世代交代する
    </button>
    <button @click="reload()">
      初期生成からやりなおす
    </button>
    <FakeLoading v-if="isLoading" message="世代交代しています..." />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Contents from '@/components/Contents.vue'
import ChangeGeneration from '~/changeGeneration/changeGeneration.js'
import FakeLoading from '@/components/FakeLoading.vue'

export default Vue.extend({
  components: {
    Contents,
    FakeLoading
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
      generationCounter: 0,
      isLoading: false as Boolean
    }
  },
  created () {
    this.indList.forEach((elem) => {
      this.currentInd.push(elem)
    })
  },
  methods: {
    changeGeneration () {
      this.isLoading = true
      setTimeout(async () => {
        this.isLoading = false
        const res = await ChangeGeneration.main(this.currentInd, this.fitnessList)
        this.currentInd = []
        res.forEach((elem) => {
          this.currentInd.push(elem)
        })
        this.generationCounter++
        // this.fitnessList = [3, 3, 3, 3, 3, 3, 3, 3]
      }, 1500)
    },
    fitness (fitness: number, index: number) {
      this.fitnessList[index] = Number(fitness)
      console.log(this.fitnessList)
    },
    reload () {
      location.reload()
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
  grid-template-columns: repeat(auto-fit, 200px);
  gap: 100px;
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
p {
  color: #6A8791;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 2rem;
}
</style>
