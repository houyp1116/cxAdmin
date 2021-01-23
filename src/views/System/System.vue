<template>
  <a-spin :spinning="pageLoading">
    <a-form-model class="detail-form" :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="Activity name">
        <a-input v-model="form.name"/>
      </a-form-model-item>
      <a-form-model-item label="Activity zone">
        <a-select v-model="form.region" placeholder="please select your zone">
          <a-select-option value="shanghai">Zone one</a-select-option>
          <a-select-option value="beijing">Zone two</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="Activity time">
        <a-date-picker v-model="form.date1" show-time type="date" placeholder="Pick a date"
                       style="width: 100%;"></a-date-picker>
      </a-form-model-item>
      <a-form-model-item label="Instant delivery">
        <a-switch v-model="form.delivery"/>
      </a-form-model-item>
      <a-form-model-item label="Activity type">
        <a-checkbox-group v-model="form.type">
          <a-checkbox value="1" name="type">
            Online
          </a-checkbox>
          <a-checkbox value="2" name="type">
            Promotion
          </a-checkbox>
          <a-checkbox value="3" name="type">
            Offline
          </a-checkbox>
        </a-checkbox-group>
      </a-form-model-item>
      <a-form-model-item label="Resources">
        <a-radio-group v-model="form.resource">
          <a-radio value="1">
            Sponsor
          </a-radio>
          <a-radio value="2">
            Venue
          </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="Activity form">
        <a-input v-model="form.desc" type="textarea"/>
      </a-form-model-item>
      <a-form-model-item label="Activity form">
        <a-upload
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :action="Util.getUploadImagePath()"
            :before-upload="beforeUpload"
            @change="handleChange"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" alt="avatar"/>
          <div v-else>
            <a-icon :type="uploadLoading ? 'loading' : 'plus'"/>
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 5 }">
        <a-button type="primary" @click="onSubmit"> 提交</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-spin>
</template>
<script>
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  export default {
    data() {
      return {
        pageLoading: false,
        uploadLoading: false,
        labelCol: {span: 5},
        wrapperCol: {span: 14},
        form: {
          name: '',
          region: undefined,
          date1: undefined,
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
      };
    },
    created() {
      // this.getData()
    },
    methods: {

      // 获取数据
      getData() {
        this.pageLoading = true
        this.Http.get("").then(res => {
          this.pageLoading = false
          if (res.code === 1) {
            this.form = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },

      // 提交更新
      onSubmit() {
        console.log('submit!', this.form);
      },

      // 上传
      handleChange(info) {
        console.log(info.event)
        if (info.file.status === 'uploading') {
          this.uploadLoading = true;
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => {
            this.imageUrl = imageUrl;
            this.uploadLoading = false;
          });
        }
      },

      // 上传前检测格式和大小
      beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          this.$message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      },
    },
  };
</script>
