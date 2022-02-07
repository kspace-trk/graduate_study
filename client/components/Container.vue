<template>
  <div class="container">
    <p>
      {{ generationCounter }}世代目
      <span v-if="generationCounter === 0">(ランダムなメロディー)</span>
    </p>
    <div class="grid">
      <div v-for="(elem, i) in currentInd" :key="i">
        <Contents :ind="elem" :index="i" :fitness="fitnessList[i]" :counter="generationCounter" @fitness="fitness" />
      </div>
    </div>
    <button @click="changeGeneration()">
      評価して次のメロディを生成
    </button>
    <button @click="reload()">
      はじめからやりなおす
    </button>
    <FakeLoading v-if="isLoading" message="生成しています..." />
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
      currentInd: [] as any[],
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
        this.fitnessList = [3, 3, 3, 3, 3, 3, 3, 3]
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
  position: relative;
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6A8791;
  color: #ffffff;
  margin-top: 50px;
  cursor: pointer;
}
a {
  max-width: 200px;
  width: 90%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6A8791;
  color: #ffffff;
  margin-top: 50px;
  cursor: pointer;
  position: absolute;
  right: 100px;
  bottom: 0px;
  @media screen and (max-width: 1000px) {
    position: unset;
  }
}
.announce {
  font-size: 0.8rem;
  position: absolute;
  right: 100px;
  bottom: -30px;
  @media screen and (max-width: 1000px) {
    position: unset;
    margin-top: 20px;
  }
}
p {
  color: #6A8791;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 2rem;
}
span {
  font-size: 0.8rem;
  color: #6A8791;
}
.message {
  font-size: 0.8rem;
  margin-top: 50px;
}
</style>
