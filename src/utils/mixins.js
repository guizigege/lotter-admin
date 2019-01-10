// 混合
let page = {
  data(){
    return{
      pagesize:10,//每页的数据条数
      currentPage:1,//默认开始页面
      tableData: [

      ],
      sumData:{}
    }
  },
  methods:{
    //页组件设置页码大小
    handleSizeChange(size) {
      this.pagesize = size;
    },
  }
};

let superUser = {
  data(){
    return{
      showHc:false,
    }
  },
  mounted(){
    if(sessionStorage.getItem("isSuperuser")){
      this.showHc = true;
    }
  },
};
export {page,superUser}
