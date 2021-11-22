<template>
  <div class="index">
    <Header />
    <StartDisplay v-if="!isStarted" @initialGenerate="initialGenerate" />
    <Container v-if="isStarted" :ind-list="indList" />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Container from '@/components/Container.vue'
import initialGenerate from '@/initialGenerate/initialGeneration'
import StartDisplay from '@/components/StartDisplay.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export type RepeatingTime = 0 | 1 | 2

export default Vue.extend({
  components: {
    Container,
    StartDisplay,
    Footer,
    Header
  },
  data () {
    return {
      indList: [] as Object[],
      isStarted: false
    }
  },
  methods: {
    async initialGenerate (repeatingTime: RepeatingTime) {
      this.indList = await initialGenerate.main(repeatingTime)
      this.isStarted = true
    }
  }
})
</script>
<style scoped lang="scss">
.index {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
