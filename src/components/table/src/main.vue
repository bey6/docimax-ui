<template>
  <ul class="dui-table"
      :tableData="tableData">
    <li class="dui-table-head"
        v-for="item in tableHeadColumn[0]"
        :key="item">
      <span>
        {{item}}
        <i class="dui-sortable-up"></i>
        <i class="dui-sortable-down"></i>
      </span>
    </li>
    <li class="dui-table-content"
        v-for="item in tableData"
        :key="item.name">
      <span v-for="i in item"
            class="dui-tableContentColumn"
            :key="i">{{i}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'dui-table',
  data () {
    return {
      tableHeadColumn: []
    };
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    column: {
      type: Number,
      default: 5
    }
  },
  created () {
    this.handleHeadColumn();
  },
  methods: {
    handlePacket () {
      // for (let i = 0; i < this.tableData.length; i++) {
      //   let ai = this.tableData[i];
      //   console.log(map);
      //   if (!map[ai.id]) { //依赖分组字段可自行更改！
      //     dest.push({
      //       id: ai.id, //依赖分组字段可自行更改！
      //       data: [ai]
      //     });
      //     map[ai.id] = ai; //依赖分组字段可自行更改！
      //   } else {
      //     for (var j = 0; j < dest.length; j++) {
      //       var dj = dest[j];
      //       if (dj.id == ai.id) { //依赖分组字段可自行更改！
      //         dj.data.push(ai);
      //         break;
      //       }
      //     }
      //   }
      // }
    },
    handleHeadColumn () {
      const tableHead = [];
      tableHead.push(this.tableData.slice(0, 1));
      tableHead.map(v => { this.tableHeadColumn.push(Object.keys(v[0])); });
    },
    handlechangeColumn (e) {
      console.log(e);
      if (this.column !== 5) {
        this.$emit('change', this.column);
      }
    },
    // 获取数组的键值的方法
    getObjectKeys (object) {
      var keys = [];
      for (var property in object) {
        keys.push(property);
      }
      return keys;
    }
  }
};
</script>

<style>
.dui-table {
  width: 600px;
  height: 300px;
  border: 1px solid #999;
}
.dui-table-head,
.dui-table-content {
  border: 1px solid red;
}
.dui-table-head {
  height: 50px;
  line-height: 50px;
  width: 33%;
  float: left;
  position: relative;
}
.dui-table-content {
  height: 60px;
  line-height: 60px;
  float: left;
}
.dui-tableContentColumn {
  width: 33%;
  float: left;
  height: 100%;
  border: 1px solid green;
}
.dui-sortable-up,
.dui-sortable-down {
  display: inline-block;
  width: 0;
  padding: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  position: absolute;
}
.dui-sortable-up {
  border-bottom: 5px solid transparent;
  border-top: 5px solid red;
  top: 25px;
}
.dui-sortable-down {
  border-bottom: 5px solid red;
  border-top: 5px solid transparent;
  top: 12px;
}
ul {
  margin: 0;
  padding: 0;
  width: 200px;
}
li {
  list-style: none;
  width: 100%;
}
</style>