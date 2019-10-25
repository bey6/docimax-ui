<template>
  <button class="dui-button"
          :class="{'dui-button-disabled': disabled}"
          :disabled="disabled"
          @click="handleClick">{{text}}</button>
</template>

<script>
export default {
  name: 'dui-button',
  props: {
    text: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick () {
      this.$emit('click');
    }
  }
};
</script>

<style>
.dui-button {
  box-sizing: border-box;
  padding: 4px 8px;
  border-radius: 3px;
  border: 1px solid #ddd;
  background-color: #fafafa;
}

.dui-button:hover {
  background-color: #f1f1f1;
}

.dui-button:active {
  background-color: #ddd;
}

.dui-button-disabled {
  cursor: not-allowed;
  background-color: #f1f1f1;
}

.dui-button-disabled:hover {
  background-color: #f1f1f1;
}

.dui-button-disabled:active {
  background-color: #f1f1f1;
}
</style>