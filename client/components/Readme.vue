<template>
  <div class="readme">
    <div class="expansion-toggle" @click="toggleExpansion()">
      <div class="title">
        本システムの使い方・説明
      </div>
      <div class="arrow" :style="{transform: `rotate(${rotateNum}deg)`}" />
    </div>
    <transition name="slide-in">
      <div v-if="isOpened" class="contents">
        <h2>はじめに</h2>
        <p>この度は、ご協力いただきありがとうございます。</p>
        <p>本システムは、Progressive Houseのメロディを生成するシステムです。</p>
        <h2>お願いしたいこと</h2>
        <p>本システムを使用していただき、<a href="https://forms.gle/xL4MCHcHEN8A52G98" target="_blank">こちらのフォーム</a>に感想を入力していだたきたいです。</p>
        <h2>実験概要</h2>
        <p>本システムは、はじめにランダムなメロディが生成されます。</p>
        <p>ランダムに生成されたメロディが、作曲者の好みのメロディに変化していくかどうかという実験です。</p>
        <h2>使い方</h2>
        <p>ページ下部にございます、「4小節あたりの繰り返し回数」の入力と、出力するメロディのキーを選択してください。</p>
        <p>※キーはC majしか選べません（開発が間に合いませんでした&gt;&lt;）</p>
        <p>選択できましたら、「はじめる」ボタンを押して、初期生成をおこなってください。</p>
        <div class="line" />
        <p>以降は、生成されたメロディに対して5段階の評価を入力し、次の個体を生成してください。</p>
        <p>ダウンロードアイコンをクリックしていただくことで、メロディデータをMIDIファイルとしてダウンロードすることができます。</p>
        <p>終了する際は、ページをリロードもしくはブラウザのタブを閉じて終了してください。</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      isOpened: true as boolean,
      rotateNum: -45 as number
    }
  },
  methods: {
    toggleExpansion () {
      this.isOpened = !this.isOpened
      if (this.isOpened) {
        this.rotateNum = this.rotateNum + 180
      } else {
        this.rotateNum = this.rotateNum - 180
      }
    }
  }
})
</script>

<style scoped lang="scss">
.readme {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  filter: drop-shadow(0 3px 6px #00000016);
  margin-bottom: 1.5rem;
}

.expansion-toggle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
}

.arrow {
  width: 8px;
  height: 8px;
  border-top: 2px solid #343434;
  border-right: 2px solid #343434;
  transition-duration: .2s;
}

.slide-in-enter-active, .slide-in-leave-active {
  transition: opacity .2s;
}

.slide-in-enter, .slide-in-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.contents {
  width: 100%;
  padding: 1.5rem 3rem;
  p {
    line-height: 2rem;
    & + h2 {
      margin-top: 1rem;
    }
  }
}

h2 {
  font-size: 1.2rem;
  line-height: 1.2rem;
  font-weight: 500;
  border-left: 4px solid #6a8791;
  padding-left: 0.8rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1rem;
  font-weight: 500;
  margin: 0.8rem 0;
}

a {
  color: #77a5e0;
  cursor: pointer;
}

.line {
  width: 100%;
  height: 2px;
  border-radius: 1px;
  background-color: #e7e7e7;
  margin: 1rem 0;
}
</style>
