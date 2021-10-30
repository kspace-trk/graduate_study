<template>
  <div class="fake-loading bg">
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
  }
})
</script>

<style scoped lang="scss">
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

.fake-loading {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
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
