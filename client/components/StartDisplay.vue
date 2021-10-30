<template>
  <div class="start-display">
    <h1>IGAを用いたProgressive Houseメロディー生成システム</h1>
    <div class="input-range">
      <p>キャッチー</p>
      <input v-model="repeatingTime" type="range" min="0" max="2">
      <p>メロディック</p>
    </div>
    <div class="cp_ipselect cp_sl01">
      <select v-model="keyOfMelody">
        <option value="" hidden>
          キーを選択してください
        </option>
        <option value="C">
          C maj
        </option>
      </select>
    </div>
    <button @click="initialGenerate()">
      初期生成する
    </button>
    <p v-if="isError" class="error">
      キーを選択してください
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export type RepeatingTime = 0 | 1 | 2

export default Vue.extend({
  data () {
    return {
      keyOfMelody: '' as String,
      isError: false as Boolean,
      repeatingTime: 1 as RepeatingTime
    }
  },
  methods: {
    initialGenerate () {
      if (!this.keyOfMelody) {
        this.isError = true
      } else {
        this.$emit('initialGenerate', this.repeatingTime)
      }
    }
  }
})
</script>

<style scoped lang="scss">
.start-display {
  max-width: 1200px;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  font-size: 1.8rem;
  font-weight: 500;
  color: #6A8791;
  margin-bottom: 2rem;
}
.input-range {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin: 0 1rem;
  }
}
input[type="range"] {
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
</style>
