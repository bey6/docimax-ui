<template>
  <div class="home">
    <d-wellcome></d-wellcome>
    <dui-select
      style="width: 100%"
      id="hduiSelect"
      :items="items"
      v-model="selected"
      @change="handleChange"
      @onSelectAllChange="handleSelectAllChange"
    ></dui-select>
    <div class="panel">
      <input
        type="text"
        name=""
        id=""
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data: () => ({
    items: [
      { id: 1, label: "北京", value: "bj" },
      { id: 2, label: "上海", value: "sh" },
      { id: 3, label: "广州", value: "gz" },
      { id: 4, label: "深圳", value: "sz" }
    ],
    selected: ""
  }),
  methods: {
    handleChange(v) {
      this.selected = v;
    },
    handleSelectAllChange({ checked, value }) {
      this.selected = value;
    }
  }
};
</script>

<style>
.panel {
  background-color: #ddd;
  height: 100px;
  width: 100%;
}
</style>