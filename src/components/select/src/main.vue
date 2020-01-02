<template>
  <div class="dui---select">
    <input class="dui---select---input"
           type="text"
           :id="id"
           :value="value"
           @input="handleInput"
           @focus="handleFocus"
           @blur="handleBlur">
    <ul v-show="focusd"
        @mouseover="handleMouseover"
        @mouseleave="handleMouseleave">
      <li v-for="item in filtedList"
          :key="item.id||item[code]">
        <label>
          <input class="dui---select-li-label"
                 v-show="mode==='multiple'"
                 type="checkbox"
                 :checked="value.includes(item[label])"
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
    // 模式: single>单选, multiple>多选
    mode: {
      type: String,
      default: 'single' // or multiple
    },
    // 选择的值
    value: {
      type: String,
      default: ''
    },
    // 数据集
    items: {
      type: Array,
      default: () => []
    },
    // 显示的文本对应数据集的哪个字段, 默认为 label
    content: {
      type: String,
      default: 'label' // or value
    },
    // 下拉框显示的文本
    label: {
      type: String,
      default: 'label'
    },
    // 下拉框显示的文本对应值
    code: {
      type: String,
      default: 'code'
    }
  },
  computed: {
    // 关键字
    queryString () {
      let idx = this.value.lastIndexOf(' ');
      if (idx === -1) {
        return '';
      }
      return this.value.slice(idx + 1);
    },
    // 过滤结果
    filtedList () {
      if (this.queryString === '') return this.items.slice(0, 30);
      return this.items.filter(i => i[this.label] === this.queryString ||
        i[this.code] === this.queryString ||
        i[this.label].includes(this.queryString) ||
        i[this.code].includes(this.queryString));
    }
  },
  data: () => ({
    focusd: false,
    mouseover: false
  }),
  methods: {
    // #region DOMEvent
    // 输入事件
    handleInput (e) {
      if (e.inputType === 'deleteContentBackward') {
        this.$emit('input', e.target.value);
        return;
      }
      let newV = '';
      if (this.value === '') {// 直接搜索
        newV = ` ${e.target.value}`;
      } else { // 有内容的搜索
        if (e.data === ' ' || this.value.includes(' ')) {
          newV = `${e.target.value}`;
        } else {
          newV = `${this.value} ${e.data}`;
        }
      }
      this.$emit('input', newV);
    },
    // 光标命中
    handleFocus () {
      this.focusd = true;
    },
    // 光标离开
    handleBlur () {
      if (!this.mouseover) this.focusd = false;
    },
    // 鼠标悬浮
    handleMouseover () {
      if (!this.mouseover) this.mouseover = true;
    },
    // 鼠标离开
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
    // #endregion
    // 点选
    handleSelectChange (e, v) {
      if (this.mode === 'single') {
        this.$emit('input', v[this.label]);
        this.focusd = false;
      } else { // 多选
        let tmp = this.value;
        if (e.target.checked) { // 选择
          let newV = '';
          if (!this.value.includes(v[this.label])) { // 没选过
            let idx = this.value.lastIndexOf(' ');
            let selected = this.value.slice(0, idx);
            let keywords = this.value.slice(idx);

            if (tmp === '' || tmp.slice(0, 1) === ' ') { // 第一个
              if (idx !== -1) { // 有条件点选
                newV = `${v[this.label]}${keywords}`;
              } else { // 无条件点选
                newV = v[this.label];
              }
            } else { // 已经有选过的项了
              if (idx !== -1) { // 有条件
                newV = `${selected},${v[this.label]}${keywords}`;
              } else {
                newV = `${tmp},${v[this.label]}`;
              }
            }
            this.$emit('input', newV);
          }

        } else { // 取消选择
          if (this.value.includes(v[this.label])) { // 有
            let arr = tmp.split(',');
            let idx = arr.findIndex(a => a === v[this.label]);
            if (idx !== -1) {
              arr.splice(idx, 1);
            }
            this.$emit('input', arr.join(','));
          }
        }
      }
    },
    // 全选
    handleSelectAllChange (e) {
      let newV = '';
      if (e.target.checked) {
        // arr = JSON.parse(JSON.stringify(this.items));
        newV = this.filtedList.map(v => v[this.label]).join(',');
      }
      this.$emit('input', newV);
      this.$emit('onSelectAllChange', { checked: e.target.checked, value: newV });
    },
    // 过滤结果
    getFiltedList () {
      this.filtedList = this.items.filter(i => i[this.label] === this.queryString ||
        i[this.value] === this.queryString ||
        i[this.piny] === this.queryString);
    },
    // 检查查询字符串
    checkQueryString (arr) {
      // 空
      if (arr.length === 0) return [];

      let arrCopy = JSON.parse(JSON.stringify(arr));
      console.log(arrCopy[arrCopy.length - 1][this.content]);
      if (arrCopy[arrCopy.length - 1][this.content]) {
        console.log('if ???');
        arrCopy.push('');
      }
      return arrCopy;
    }
  }
};
</script>

<style lang="scss" scoped>
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

  .dui---select---input {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 5px;
  }

  ul {
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

    li {
      position: relative;
      box-sizing: border-box;
      line-height: 30px;
      text-align: left;

      label {
        display: flex;
        box-sizing: border-box;
        padding-left: 10px;
        width: 100%;

        span {
          flex: 1 2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        input[type="checkbox"] {
          flex-basis: 24px;
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
      }

      &:nth-child(2n + 1) {
        background-color: #f1f1f1;
      }

      &:nth-child(2n) {
        background-color: #fff;
      }

      &:hover {
        background-color: #0078d7;
        color: #fff;
      }
    }
  }
}
</style>