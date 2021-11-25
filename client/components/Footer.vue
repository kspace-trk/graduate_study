<template>
  <div class="footer">
    Copyright &copy; 2021 Keigo Nakao All Rights Reserved.
    <div class="icons">
      <a href="https://twitter.com/Kspace_trk" target="_blank">
        <SvgIcon type="Twitter" />
      </a>
      <a href="https://instagram.com/kspace_trk/" target="_blank">
        <SvgIcon type="Instagram" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SvgIcon from '@/components/svg/SvgIcon.vue'

export default Vue.extend({
  components: {
    SvgIcon
  }
})
</script>

<style lang="scss">
.footer {
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6a8791;
  margin-top: 80px;
  color: #ffffff;
  font-size: 0.7rem;
  position: relative;
}

.icons {
  display: flex;
  align-items: center;
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  a {
    display: inline-flex;
  }
  .svg-icon {
    margin-left: 1rem;
    cursor: pointer;
  }
}
</style>
