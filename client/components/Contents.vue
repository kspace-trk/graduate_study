<template>
  <div class="contents">
    <div class="btn-wrapper">
      <div v-if="!isPlaying" class="play-btn" @click="play()">
        <PlayBtn />
      </div>
      <div v-if="isPlaying" class="stop-btn" @click="stop()">
        <StopBtn />
      </div>
    </div>
    <div class="input-range">
      <input type="range" min="1" max="5">
    </div>
    <div class="range-num">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PlayBtn from '@/components/svg/PlayBtn.vue'
import StopBtn from '@/components/svg/StopBtn.vue'

export default Vue.extend({
  components: {
    PlayBtn,
    StopBtn
  },
  data () {
    return {
      isPlaying: false
    }
  },
  methods: {
    play () {
      this.isPlaying = true
    },
    stop () {
      this.isPlaying = false
    }
  }
})
</script>

<style scoped lang="scss">
.contents {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn-wrapper {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #707070;
  border-radius: 10px;
}
input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  background-color: #e7e7e7;
  height: 5px;
  width: 100%;
  border-radius: 6px;
  &:active::-webkit-slider-thumb {
    cursor: pointer;
  }
}
.input-range {
  width: 100%;
  height: 20px;
  display: grid;
  place-items: center;
}
.range-num {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
