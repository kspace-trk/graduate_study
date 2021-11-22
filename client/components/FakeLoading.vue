<template>
  <div class="fake-loading bg" :style="{top: scrollY + 'px'}">
    <div class="dialog">
      <div class="message">
        {{ message }}
      </div>
      <i class="fa fa-cog fa-spin fa-3x fa-fw" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    message: {
      type: String,
      default: '生成しています...'
    }
  },
  data () {
    return {
      scrollY: 0 as number
    }
  },
  mounted () {
    this.scrollY = window.scrollY
    this.noScroll()
  },
  destroyed () {
    this.returnScroll()
  },
  methods: {
    noScrollEvent (event: any) {
      event.preventDefault()
    },
    noScroll () {
      // SP
      document.addEventListener('touchmove', this.noScrollEvent, { passive: false })
      // PC
      document.addEventListener('mousewheel', this.noScrollEvent, { passive: false })
    },
    returnScroll () {
      // SP
      document.removeEventListener('touchmove', this.noScrollEvent)
      // PC
      document.removeEventListener('mousewheel', this.noScrollEvent)
    }
  }
})
</script>

<style scoped lang="scss">
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

.fake-loading {
  width: 100%;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.bg {
  background-color: #00000016;
}
.dialog {
  max-width: 800px;
  width: 90%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-color: #ffffff;
  position: relative;
  i {
    position: absolute;
    top: 250px;
    color: #666666;
  }
}
.message {
  color: #666666;
}
</style>
