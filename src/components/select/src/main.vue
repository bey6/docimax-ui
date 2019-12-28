<template>
  <div class="dui---select">
    <input class="dui---select---input"
           type="text"
           :id="id"
           :value="selectedValue"
           @input="handleInput"
           @focus="handleFocus"
           @blur="handleBlur">
    <ul v-show="focusd"
        @mouseover="handleMouseover"
        @mouseleave="handleMouseleave">
      <li v-for="item in items"
          :key="item.id||item[code]">
        <label>
          <input class="dui---select-li-label"
                 v-show="mode==='multiple'"
                 type="checkbox"
                 :checked="value.findIndex(v=>v[code]===item[code])!==-1"
                 @change="handleSelectChange($event, item)">
          <span class="dui---select-label">{{item[label]}}</span>
          <span class="dui---select-value">{{item[code]}}</span>
        </label>
      </li>
      <li style="border-bottom: 0"
          v-show="mode==='multiple'">
        <label style="width: 100%">
          <input type="checkbox"
                 name="all"
                 id="all"
                 @change="handleSelectAllChange">
          <span class="dui---select-label-all">全选</span>
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
        let idx = tmp.findIndex(t => t[this.code] == v[this.code]);
        if (idx !== -1) {
          // 数组里有这个项
          if (!e.target.checked) {
            tmp.splice(idx, 1); // 移除它
          }
        } else {
          // 数组里面没有本次选择的项
          if (e.target.checked) {
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
.dui---select {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-size: 1em;
  font-weight: 500;
  color: #333;
  font-family: "微软雅黑", sans-serif;
  user-select: none;
}

.dui---select---input {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 5px;
}

.dui---select ul {
  position: absolute;
  box-sizing: border-box;
  z-index: 99;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  max-height: 256px;
  overflow-y: auto;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px #ccc;
}

.dui---select ul li label {
  display: flex;
  box-sizing: border-box;
  padding-left: 10px;
  width: 100%;
}

.dui---select ul li label span {
  flex: 1 2;
}

.dui---select ul li label input[type="checkbox"] {
  flex-basis: 24px;
}

.dui---select ul li {
  position: relative;
  box-sizing: border-box;
  line-height: 30px;
  text-align: left;
}

.dui---select ul li:nth-child(2n + 1) {
  background-color: #f1f1f1;
}

.dui---select ul li:nth-child(2n) {
  background-color: #fff;
}

.dui---select ul li:hover {
  background-color: #0078d7;
  color: #fff;
}

.dui---select-li-label {
  display: inline-block;
  box-sizing: border-box;
}

.dui---select-label {
  padding-left: 15px;
  width: calc(80% - 20px);
  text-align: left;
}

.dui---select-value {
  padding-right: 15px;
  width: 20%;
  text-align: center;
}

.dui---select-label-all {
  padding-left: 15px;
  width: calc(100% - 20px);
  text-align: left;
}
</style>