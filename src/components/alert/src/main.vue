<template>
  <div class="dui-alert"
       :class="{'dui-alert-hidden': !value}">
    <span>{{message}}</span><button @click="handleClose">close</button>
  </div>
</template>

<script>
export default {
  name: 'dui-alert',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    }
  },
  updated () {
    if (this.value) {
      setTimeout(() => {
        this.$emit('input', !this.value);
      }, 3000);
    }

  },
  methods: {
    handleClose () {
      this.$emit('input', !this.value);
    }
  }
};
</script>

<style>
.dui-alert {
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 15%;
  text-align: left;
  height: 30px;
  width: 70%;
  color: #3d3d3d;
  background-color: #f1f1f1;
  border-radius: 0 0 3px 3px;
  border: 1px solid #ddd;
  box-shadow: 0 0 3px #ddd;
  transition: top 0.15s ease-in-out;
}

.dui-alert-hidden {
  top: -35px;
}

.dui-alert span {
  display: inline-block;
  box-sizing: border-box;
  padding-left: 8px;
  max-width: calc(100% - 45px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 30px;
}

.dui-alert button {
  float: right;
  display: block;
  box-sizing: border-box;
  width: 45px;
  height: 100%;
  background-color: #fff0;
  color: crimson;
  border: 0;
  cursor: pointer;
}
</style>