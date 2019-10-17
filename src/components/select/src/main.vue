<template>
  <div class="dui-select">
    <input
      style="width: 100%"
      type="text"
      :name="id"
      :id="id"
      :value="value"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    <ul
      v-show="focusd"
      @mouseover="handleMouseover"
      @mouseleave="handleMouseleave"
    >
      <li
        v-for="item in items"
        :key="item.value"
      >
        <label>
          <input
            class="dui-select-li-label"
            type="checkbox"
            :name="item.value"
            :id="item.value"
            :checked="value.includes(item.value)"
            @change="handleSelectChange($event, item.value)"
          >
          <span class="dui-select-label">{{item.label}}</span><span class="dui-select-value">{{item.value}}s</span>
        </label>
      </li>
      <li style="border-bottom: 0">
        <label>
          <input
            type="checkbox"
            name="all"
            id="all"
            @change="handleSelectAllChange"
          >
          <span class="dui-select-label">全选</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "dui-select",
  props: {
    id: {
      type: String,
      default: "duiSelect"
    },
    value: {
      type: String,
      default: ""
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    focusd: false,
    mouseover: false
  }),
  methods: {
    handleInput(e) {
      console.log(e.target.value);
      this.$emit("change", e);
    },
    handleFocus(e) {
      this.focusd = true;
    },
    handleBlur(e) {
      if (!this.mouseover) this.focusd = false;
    },
    handleMouseover(e) {
      if (!this.mouseover) this.mouseover = true;
    },
    handleMouseleave(e) {
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
    handleSelectChange(e, v) {
      let tmp = this.value;

      if (e.target.checked) {
        // 选中
        if (!this.value.includes(v)) {
          if (this.value === "") {
            tmp = v;
          } else if (this.value[this.value.length - 1] === ",") {
            tmp = `${this.value}${v}`;
          } else {
            tmp = `${this.value},${v}`;
          }
        } else {
          tmp = this.value;
        }
      } else {
        // 取消选中
        if (this.value.includes(`,${v},`)) {
          tmp = this.value.replace(`,${v},`, ",");
        } else if (this.value.includes(`,${v}`)) {
          tmp = this.value.replace(`,${v}`, "");
        } else if (this.value.includes(`${v},`)) {
          tmp = this.value.replace(`${v},`, "");
        } else {
          tmp = this.value;
        }
      }
      this.$emit("change", tmp);
    },
    handleSelectAllChange(e) {
      let v = "";
      if (e.target.checked) {
        v = this.items.map(v => v.value).join(",");
      }
      this.$emit("onSelectAllChange", { checked: e.target.checked, value: v });
    }
  }
};
</script>

<style>
.dui-select {
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.dui-select ul {
  position: absolute;
  box-sizing: border-box;
  z-index: 99;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  background-color: #fff;
  border-radius: 1px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 3px #ddd;
}
.dui-select ul li {
  position: relative;
  cursor: pointer;
  border-bottom: 1px dashed #ddd;
  text-align: left;
}
.dui-select ul li:hover {
  background-color: rgb(167, 155, 221);
}
.dui-select-li-label {
  display: inline-block;
  box-sizing: border-box;
}
.dui-select-label {
  display: inline-block;
  padding-left: 15px;
  box-sizing: border-box;
  width: calc(80% - 50px);
  text-align: left;
}
.dui-select-value {
  display: inline-block;
  padding-right: 15px;
  box-sizing: border-box;
  width: 20%;
  text-align: right;
}
</style>