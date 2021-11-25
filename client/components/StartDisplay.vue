<template>
  <div class="start-display">
    <Readme />
    <div class="card">
      <p class="card-in-title">
        4小節あたりの繰り返し回数
      </p>
      <div class="image-text">
        ※イメージ画像です
      </div>
      <img v-if="repeatingTime == 2" src="@/assets/img/1time.png" alt="イメージ画像">
      <img v-else-if="repeatingTime == 1" src="@/assets/img/2time.png" alt="イメージ画像">
      <img v-else-if="repeatingTime == 0" src="@/assets/img/4time.png" alt="イメージ画像">
      <div class="input-range">
        <p>4回</p>
        <input v-model="repeatingTime" type="range" min="0" max="2">
        <p>1回</p>
      </div>
    </div>
    <div class="card">
      <div class="card-in-title">
        キーを選択してください
      </div>
      <div class="cp_ipselect cp_sl01">
        <select v-model="keyOfMelody">
          <option value="C">
            C maj
          </option>
        </select>
      </div>
    </div>
    <button @click="initialGenerate()">
      はじめる
    </button>
    <p v-if="isError" class="error">
      キーを選択してください
    </p>
    <FakeLoading v-if="isLoading" message="初期生成しています..." />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FakeLoading from '@/components/FakeLoading.vue'
import Readme from '@/components/Readme.vue'

export type RepeatingTime = 0 | 1 | 2

export default Vue.extend({
  components: {
    FakeLoading,
    Readme
  },
  data () {
    return {
      keyOfMelody: 'C' as String,
      isError: false as Boolean,
      repeatingTime: 1 as RepeatingTime,
      isLoading: false as Boolean
    }
  },
  methods: {
    initialGenerate () {
      if (!this.keyOfMelody) {
        this.isError = true
      } else {
        this.isLoading = true
        setTimeout(() => {
          this.isLoading = false
          this.$emit('initialGenerate', this.repeatingTime)
        }, 1500)
      }
    }
  }
})
</script>

<style scoped lang="scss">
.start-display {
  max-width: 800px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  width: 100%;
  font-size: 1.8rem;
  font-weight: 500;
  color: #6A8791;
  margin-bottom: 2rem;
}
p {
  color: #666666;
}
.input-range {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin: 0 1rem;
    color: #666666;
  }
}
input[type="range"] {
  max-width: 300px;
  width: 50%;
  -webkit-appearance: none;
  appearance: none;
  background-color: #e7e7e7;
  height: 5px;
  border-radius: 6px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #6A8791;
    cursor: pointer;
  }
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
.cp_ipselect {
  max-width: 300px;
  overflow: hidden;
  width: 90%;
  margin: 2em auto;
  text-align: center;
}
.cp_ipselect select {
  max-width: 300px;
  width: 100%;
  padding-right: 1em;
  cursor: pointer;
  text-indent: 0.01px;
  text-overflow: ellipsis;
  border: none;
  outline: none;
  background: transparent;
  background-image: none;
  box-shadow: none;
  -webkit-appearance: none;
  appearance: none;
}
.cp_ipselect select::-ms-expand {
  display: none;
}
.cp_ipselect.cp_sl01 {
  position: relative;
  border: 1px solid #bbbbbb;
  border-radius: 2px;
  background: #ffffff;
}
.cp_ipselect.cp_sl01::before {
    position: absolute;
    top: 0.8em;
    right: 0.9em;
    width: 0;
    height: 0;
    padding: 0;
    content: '';
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #666666;
    pointer-events: none;
}
.cp_ipselect.cp_sl01 select {
    padding: 8px 38px 8px 8px;
    color: #666666;
}
.error {
  color: #f06d6d;
  font-size: 0.8rem;
  margin-top: 1rem;
}

.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 3rem;
  background-color: #ffffff;
  filter: drop-shadow(0 3px 6px #00000016);
  position: relative;
  & + .card {
    margin-top: 1.5rem;
  }
  img {
    width: 90%;
    height: 350px;
    object-fit: cover;
    margin-bottom: 1.5rem;
  }
  .card-in-title {
    width: 100%;
    margin-bottom: 1.5rem;
    color: #666666;
  }
}

.image-text {
  position: absolute;
  top: 90px;
  right: 100px;
  color: #ffffff;
  font-weight: 700;
}
</style>
