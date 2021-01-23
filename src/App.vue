<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    async created() {
      await this.Util.getCityList()
    },
  }
</script>

<style lang="less">
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
  }

  .flex {
    display: flex;
  }

  .align_center {
    align-items: center;
  }

  .justify_between {
    align-items: center;
    justify-content: space-between;
  }

  .justify_center {
    align-items: center;
    justify-content: center;
  }

  .main-container {
    height: 100%;
  }

  .pages-container {
    min-height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .pages-tools-box {
    width: 100%;
    overflow: hidden;
    flex-shrink: 0;
  }

  .pagination {
    text-align: right;
    flex-shrink: 0;
  }

  .pages-content{
    margin: 10px 0;
    flex: 1;
  }

  .detail-form{
    margin-top: 60px !important;
  }
</style>
