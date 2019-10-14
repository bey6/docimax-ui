<template>
  <div class="d-wellcome">
    <h1>DOCIMAX UI BETA</h1>
    <P>这是一个测试组件，当你可以看到它的时候，就表明你已经成功引入了 DOCIMAX UI。</P>
  </div>
</template>

<script>
import pkg from '../../../package.json';
export default {
  name: 'd-wellcome',
  data: () => ({
    version: pkg.version
  })
}
</script>

<style>
.d-wellcome {
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>