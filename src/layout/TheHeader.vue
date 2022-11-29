<template>
  <el-header height="50px">
    <div class="account-info">
      <el-avatar :size="35">
        <img class="user-avatar" src="@/assets/images/user-avatar.png" alt="user-avatar" />
      </el-avatar>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          admin
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出</el-dropdown-item>
          <el-dropdown-item>
            <el-link href="https://github.com/w2xi/vue-admin-template" target="_blank">Github</el-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
export default {
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.$store.dispatch('logout').then(() => {
            this.$router.replace('/login')
          })
          break;
        default:
          // ...
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: #fff;
  border-bottom: 1px solid #d9d9d9;
  box-sizing: border-box;
  .account-info {
    display: flex;
    align-items: center;
  }
}
.el-avatar {
  margin-right: 10px;
}
.el-dropdown {
  color: #fff;
}
.el-dropdown-link {
  color: #000;
  cursor: pointer;
}
</style>
