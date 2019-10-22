# @docimax/ui

一些需要自己实现的公共基础组件库

## 安装

```bash
npm i @docimax/ui
```

## 引入

```js
import dui from '@docimax/ui';

Vue.use(dui);
```

## 测试

src/views/Home.vue

```js
<template>
  <div class="home">
    <d-wellcome></d-wellcome>
  </div>
</template>

<script>
export default {
  name: 'home',
}
</script>
```

一切顺利的话应该看到此页面
![wellcome.png](./assets/wellcome.png)

## 表单组件

### dui-select

![select](./assets/select.png)

```html
<dui-select
  :items="items"
  v-model="selected"
  mode="multiple"
  @change="handleChange"
  @onSelectAllChange="handleSelectAllChange"
></dui-select>
```

**Attribute**
| name | type | description|
|-|-|-|
|id|String|也许会用到吧|
|value|Array|默认为 `[]`，当前选中的值的数组|
|items|Array|默认为 `[]`，所有可选项的集合，类型应该是 `{ label: '', value: '' }` 这种结构的|
|mode|String|`single` or `multiple` 单选还是多选|
|content|String|`label` or `value` 显示值为 label 还是 value|
|label|string|默认值为 `label`，指定使用数据集中的哪个字段作为文案|
|code|string|默认值为 `code`，指定使用数据集中的哪个字段作为编码|
**Event**
| name | params | description|
|-|-|-|
|change|`[]`|当你选中/取消/修改输入框时会触发该事件|
|onSelectAllChange|`{ checked: Boolean, value: Array }`|点击全选按钮|
