<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SwitchButton, UserFilled } from '@element-plus/icons-vue'
import axios from 'axios'

const props = defineProps({
  menuIndex: {
    type: String,
    required: true
  }
})

const profileImage = ref('');

onMounted(() => {
    axios
    .get('https://api.thecatapi.com/v1/images/search')
    .then((res: any) => {
      profileImage.value =res.data[0].url
    })
})

const handleLogout = () => {
  alert('logout')
}
</script>

<template>
    <el-sub-menu class="user-menu-item " :index="menuIndex">
      <template #title>
        <div class="container">
          <div class="center-vertical" :span="8">
            <el-avatar fit="cover" >
              <el-image fit="cover" style="width: 3rem; height: 3rem" :src="profileImage">
                <template #error>
                  <div class="icon">
                    <el-icon class="prevent-margin"><UserFilled /></el-icon>
                  </div>
                </template>
              </el-image>
            </el-avatar>
          </div>
          <div class="center-vertical" :span="16">
            <el-text class="small-line-height">Markus Bachmann</el-text>
            <el-text class="small-line-height" type="info" size="small">Test Department of serious Business</el-text>
          </div>
        </div>
      </template>
      <el-menu-item :index="`${menuIndex}-1`" @click="handleLogout">
        <template #title>
          <span class="center-horizontal">
            <el-icon class="icon-menu-item"><SwitchButton/></el-icon>
            <span class="gap-to-icon">Logout</span>
          </span>
        </template>
      </el-menu-item>
    </el-sub-menu>
</template>

<style scoped>
.user-menu-item {
  height: 3.6rem;
}

.container {
  display: flex;
  flex-direction: row;
  gap: 0.6rem; 
  align-items: center;
}

.center-vertical {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.center-horizontal {
  display: flex;
  align-items: center;
}

.small-line-height {
  line-height: 1.2rem;
}

.el-menu-item .el-icon {
  margin-right: 0rem !important;
}

.icon {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gap-to-icon {
  padding-left: 0.3rem;
}

.prevent-margin {
  margin: 0;
}

</style>
