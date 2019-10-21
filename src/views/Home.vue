<template>
  <div class="home">
    <label for="cities"
           class="xxx">
      <span class="label-span">城市：</span>
      <div class="label-input">
        <dui-select id="cities"
                    style="height: 40px;font-size:16px"
                    :items="items"
                    v-model="selected"
                    mode="multiple"
                    @change="handleChange"
                    @onSelectAllChange="handleSelectAllChange"></dui-select>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: () => ({
    items: [
      { label: '北京', value: 'bj' },
      { label: '上海', value: 'sh' },
      { label: '广州', value: 'gz' },
      { label: '深圳', value: 'sz' }
    ],
    selected: []
  }),
  methods: {
    handleChange (v) {
      this.selected = v;
    },
    handleSelectAllChange ({ checked, value }) {
      this.selected = value;
    }
  }
};
</script>

<style>
.xxx {
  display: inline-block;
  width: 512px;
}

.label-span {
  display: inline-block;
  box-sizing: border-box;
  width: 80px;
}

.label-input {
  display: inline-block;
  box-sizing: border-box;
  width: calc(100% - 80px);
}

select,
input {
  font-size: 1em;
}
</style>