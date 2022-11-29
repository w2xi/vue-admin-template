<template>
  <el-card>
    <el-row
      class="icon-wrapper row"
      v-for="(group, index) of groupIcons"
      :key="index"
    >
      <el-col 
        :span="4"
        class="icon-item"
        v-for="item of group"
        :key="item"
      >
        <i :class="item" class="icon"></i>
        <div class="icon-name">{{ item }}</div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import icons from '@/icons/element'

export default {
  data() {
    return {
      icons,
    }
  },

  computed: {
    groupIcons() {
      const result = []

      for (let i = 0; i < icons.length; i++) {
        const index = Math.floor(i / 7)

        if (!result[index]) {
          result[index] = []
        }
        result[index].push(icons[i])
      }

      console.log(result);

      return result;
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: flex;
  .icon-item {
    padding: 30px 20px;
    text-align: center;
    border: 1px solid rgba($color: #000000, $alpha: 0.1);
    &:hover {
      .icon, 
      .icon-name {
        color: #409EFF;
      }
    }
  }
  .icon {
    font-size: 35px;
  }
  .icon-name {
    margin-top: 10px;
    color: #aaa;
  }
}
</style>