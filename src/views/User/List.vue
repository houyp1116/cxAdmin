<template>
  <div class="pages-container">

    <!-- 搜索框 Or 工具框 -->
    <a-form class="pages-tools-box" :form="form" @submit="getSearch">
      <a-row :gutter="[15, 10]">
        <a-col :span="4">
          <a-form-item>
            <a-input placeholder="手机号" v-decorator="['mobile']"/>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item>
            <a-input placeholder="姓名" v-decorator="['name']"/>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item>
            <a-input placeholder="公司名称" v-decorator="['company_name']"/>
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item>
            <a-select allowClear placeholder="选择状态" v-decorator="['state']">
              <a-select-option :value="v.id" v-for="(v, i) in Config.User" :key="i">{{v.title}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit">搜索</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">清空</a-button>
        </a-col>
      </a-row>
    </a-form>

    <!-- 表格 -->
    <div class="pages-content">
      <a-table :columns="columns" :data-source="data" :pagination="false" :loading="tableLoading">
        <a slot="action" slot-scope="row">{{row}}</a>
      </a-table>
    </div>

    <!-- 分页 -->
    <a-pagination class="pagination" show-quick-jumper :default-current="current_page" :total="total"
                  @change="changePages"/>
  </div>
</template>

<script>
  const columns = [
    {title: '表头名字1', dataIndex: 'name'},
    {title: '表头名字2', scopedSlots: {customRender: 'action'}},
  ];

  import config from "../../tools/config";

  export default {
    name: "List.vue",
    data() {
      return {
        // 公用配置
        Config: {},
        // 分页数据
        current_page: 1,
        total: 100,
        // table数据
        tableLoading: false,
        columns,
        data: [],
        // 搜索表单
        form: this.$form.createForm(this),
        // other
        UserStateList: [],
      };
    },
    created() {
      this.Config = config
    },
    methods: {

      /**
       * 进行搜索
       * @param e
       */
      getSearch(e) {
        e.preventDefault();
        this.form.validateFields((error) => {
          if (!error) {
            this.getData(1)
          }
        });
      },

      /**
       * 请求Table数据
       * @param pages
       */
      getData(pages = 1) {
        this.tableLoading = true
        this.Http.get('', {
          page: pages,
          ...this.form.getFieldsValue()
        }).then(res => {
          if (res.code === 1) {
            this.data = res.data.data
            this.current_page = res.data.current_page
            this.total = res.data.total
          } else {
            this.$message.error(res.msg)
          }
        }).catch(() => {
          this.tableLoading = false
        })
      },

      /**
       * 切换分页时
       * @param event
       */
      changePages(event) {
        this.getData(event)
      },

      /**
       * 清空搜索项
       */
      handleReset() {
        this.form.resetFields();
        this.getData()
      },

    },
  }
</script>

<style scoped>

</style>
