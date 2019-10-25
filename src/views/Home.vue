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
    <dui-alert v-model="alert"
               message="天街小雨润如酥" />
    <dui-dialog v-model="dialog"
                :modal="true"
                :width="512"
                :height="256">
      <h1>hello world.</h1>
      <p>你好世界</p>
      <button @click="handleDialog">dialog</button>
    </dui-dialog>
    <div>
      <dui-button text="dialog"
                  class="text-btn"
                  :disabled="false"
                  @click="handleClick" />
      <button @click="handleSwtich">switch alert.</button>
      <button @click="handleDialog">dialog</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: () => ({
    alert: false,
    dialog: false,
    items: [
      { content: '北京', code: 'bj' },
      { content: '上海', code: 'sh' },
      { content: '广州', code: 'gz' },
      { content: '深圳', code: 'sz' }
    ],
    selected: []
  }),
  methods: {
    handleClick () {
      console.log('click');
    },
    handleChange (v) {
      this.selected = v;
    },
    // eslint-disable-next-line no-unused-vars
    handleSelectAllChange ({ checked, value }) {
      this.selected = value;
    },
    handleSwtich () {
      this.alert = !this.alert;
    },
    handleDialog () {
      this.dialog = !this.dialog;
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

.text-btn {
  width: 256px;
  height: 50px;
}
</style>