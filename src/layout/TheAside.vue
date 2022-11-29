<template>
  <el-aside class="sidebar-container" :class="{ '--collapse': isCollapse }">
    <div class="logo-wrapper">
      <img class="logo" src="@/assets/images/logo.png" alt="logo" />
      <span class="title">Admin</span>
    </div>
    <el-menu
      text-color="#bfcbd9"
      active-text-color="#fff"
      :default-active="$route.path"
      :collapse-transition="false"
      unique-opened
      router
    >
      <el-menu-item index="/dashboard">
        <i class="el-icon-data-board"></i>
        <span>Dashboard</span>
      </el-menu-item>
      <el-menu-item index="/icon">
        <i class="el-icon-watermelon"></i>
        <span>Icon</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    }
  },
}
</script>

<style lang="scss" scoped>
$sideBarWidth: 200px;
$sideBarBgColor: #001529;
$sideBarCollapseWidth: 64px;
$transitionTime: .28s;

.sidebar-container {
  position: relative;
  width: $sideBarWidth !important;
  transition: width $transitionTime;
  overflow: hidden;
  &.--collapse {
    width: $sideBarCollapseWidth !important;
    transition-duration: $transitionTime;
  }
  .logo-wrapper {
    display: flex;
    align-items: center;
    height: 48px;
    width: 100%;
    padding: 2px 10px;
    background: $sideBarBgColor;
    transition: all .2s ease;
    cursor: pointer;
    .logo {
      height: 38px;
    }
    .title {
      font-size: 22px;
      margin-left: 10px;
      color: #f5f5f5;
    }
  }
  .el-menu {
    height: 100%;
    width: 100%;
    border: none;
    background: $sideBarBgColor;
    .el-menu-item.is-active {
      background: #0960bd !important;
    }
  }
}
</style>
