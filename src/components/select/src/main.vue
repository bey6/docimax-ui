<template>
  <div class="dui-select">
    <input class="dui-select-input"
           type="text"
           :name="id"
           :id="id"
           :value="selectedValue"
           @input="handleInput"
           @focus="handleFocus"
           @blur="handleBlur">
    <ul v-show="focusd"
        @mouseover="handleMouseover"
        @mouseleave="handleMouseleave">
      <li v-for="item in items"
          :key="item[code]">
        <label style="width: 100%">
          <input class="dui-select-li-label"
                 v-show="mode==='multiple'"
                 type="checkbox"
                 :name="item[code]"
                 :id="item[code]"
                 :checked="value.findIndex(v=>v[code]===item[code])!==-1"
                 @change="handleSelectChange($event, item)">
          <span class="dui-select-label">{{item[label]}}</span>
          <span class="dui-select-value">{{item[code]}}</span>
        </label>
      </li>
      <li style="border-bottom: 0"
          v-show="mode==='multiple'">
        <label style="width: 100%">
          <input type="checkbox"
                 name="all"
                 id="all"
                 @change="handleSelectAllChange">
          <span class="dui-select-label-all">全选</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'dui-select',
  props: {
    id: {
      type: String,
      default: 'duiSelect'
    },
    value: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: 'single' // or multiple
    },
    content: {
      type: String,
      default: 'label' // or value
    },
    label: {
      type: String,
      default: 'label'
    },
    code: {
      type: String,
      default: 'code'
    }
  },
  computed: {
    selectedValue () {
      return this.value.map(v => v[this.content]).join(',');
    }
  },
  data: () => ({
    focusd: false,
    mouseover: false
  }),
  methods: {
    handleInput (e) {
      let selected = [];
      if (e.target.value !== '') {
        let contentArr = e.target.value.split(',');

        contentArr.forEach(v => {
          let idx = this.items.findIndex(i => i[this.content] === v);
          if (idx !== -1) {
            selected.push(JSON.parse(JSON.stringify(this.items[idx])));
          }
        });
      }
      this.$emit('change', selected);
    },
    handleFocus () {
      this.focusd = true;
    },
    handleBlur () {
      if (!this.mouseover) this.focusd = false;
    },
    handleMouseover () {
      if (!this.mouseover) this.mouseover = true;
    },
    handleMouseleave () {
      if (this.mouseover) {
        if (this.mouseover) {
          this.mouseover = false;
        }
        if (document.activeElement.id !== this.id) {
          if (!this.mouseover && this.focusd) {
            this.focusd = false;
          }
        }
      }
    },
    handleSelectChange (e, v) {
      let tmp = this.value;

      if (this.mode === 'single') {
        // 单选
        // 单选模式下，数组值存在一个选中值
        tmp = [v];
        this.focusd = false;
      } else {
        // 多选
        // nothing to say
        console.log(tmp);
        let idx = tmp.findIndex(t => t[this.code] == v[this.code]);
        console.log(idx);
        if (idx !== -1) {
          // 数组里有这个项
          if (!e.target.checked) {
            tmp.splice(idx, 1); // 移除它
          }
        } else {
          // 数组里面没有本次选择的项
          if (e.target.checked) {
            console.log(v);
            tmp.push(v); // push into
          }
        }
      }
      this.$emit('change', tmp);
    },
    handleSelectAllChange (e) {
      let v = [];

      if (e.target.checked) {
        v = JSON.parse(JSON.stringify(this.items));
        // v = this.items.map(v => v.value).join(',');
      }

      this.$emit('onSelectAllChange', { checked: e.target.checked, value: v });
    }
  }
};
</script>

<style>
.dui-select {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  user-select: none;
}
.dui-select-input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 5px;
}
.dui-select ul {
  position: absolute;
  box-sizing: border-box;
  z-index: 99;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  max-height: 256px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 0 0 3px 3px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 3px #ddd;
}
.dui-select ul li {
  position: relative;
  padding-left: 10px;
  border-bottom: 1px dashed #ddd;
  line-height: 30px;
  text-align: left;
}
.dui-select ul li:hover {
  background-color: #2cc185;
  color: #fff;
}
.dui-select-li-label {
  display: inline-block;
  box-sizing: border-box;
}
.dui-select-label {
  display: inline-block;
  padding-left: 15px;
  box-sizing: border-box;
  width: calc(80% - 20px);
  text-align: left;
}
.dui-select-value {
  display: inline-block;
  padding-right: 15px;
  box-sizing: border-box;
  width: 20%;
  text-align: center;
}
.dui-select-label-all {
  display: inline-block;
  padding-left: 15px;
  box-sizing: border-box;
  width: calc(100% - 20px);
  text-align: left;
}
</style>