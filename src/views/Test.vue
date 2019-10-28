<template>
  <div>
    <p>这是一个测试表格</p>
    <dui-table :tableData="tableData" />
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      tableData: [
        { date: '2019-01-01', name: '张艳如', address: '北京' },
        { date: '2019-01-02', name: '张艳芳', address: '北京' },
        { date: '2019-01-03', name: '张艳丽', address: '北京' },
      ],
      coloum: ''
    };
  },
  methods: {
    handleChange (e) {
      console.log(e);
    }
  }
};
</script>

<style>
</style>