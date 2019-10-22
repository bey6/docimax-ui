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
                    label="content"
                    content="content"
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
      { content: '北京', code: 'bj' },
      { content: '上海', code: 'sh' },
      { content: '广州', code: 'gz' },
      { content: '深圳', code: 'sz' }
    ],
    selected: []
  }),
  methods: {
    handleChange (v) {
      console.log(v);
      this.selected = v;
      console.log(this.selected);
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