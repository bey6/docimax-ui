<template>
  <div>
    <div class="dui-dialog-modal"
         v-show="modal"
         :class="{'dui-dialog-modal-hidden': !value}"></div>
    <div class="dui-dialog-box"
         :class="{'dui-dialog-box-hidden': !value}"
         :style="{ 'width': width + 'px', 'height': this.height + 'px', 'left': `calc(50% - ${width / 2}px)`, 'top': `calc(50% - ${height / 2}px)` }">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'dui-dialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 512
    },
    height: {
      type: Number,
      default: 256
    }
  }
};
</script>

<style>
.dui-dialog-box {
  position: absolute;
  left: calc(50% - 256px);
  top: calc(50% - 128px);
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #fff;
  z-index: 1000;
  transition: transform 0.25s ease-in-out, opacity 0.25s ease-in-out,
    z-index 0.25s ease-in-out;
}

.dui-dialog-modal {
  position: absolute;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #333a;
  transition: opacity 0.25s ease-in-out, z-index 0.25s ease-in-out;
}

.dui-dialog-box-hidden {
  transform: scale(0.6);
  opacity: 0;
  z-index: -1;
  left: 0;
  top: 0;
}

.dui-dialog-modal-hidden {
  opacity: 0;
  z-index: -1;
}
</style>