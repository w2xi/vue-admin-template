<template>
  <el-submenu
    v-if="item.list && item.list.length"
    :index="item.menuId"
  >
    <template slot="title">
      <i :class="item.icon | convertIcon"></i>
      <span slot="title">{{ item.name }}</span>
    </template>
    <side-bar-item
      v-for="child of menus"
      :item="child"
      :key="child.url"
    />
  </el-submenu>
  <el-menu-item
    v-else
    :index="'/' + item.url"
  >
    <i :class="item.icon | convertIcon"></i>
    <span slot="title">{{ item.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'SideBarItem',
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  filters: {
    convertIcon(icon){
      icon = icon || ''
      return icon.startsWith('el-icon') ? icon : 'iconfont ' + icon
    },
  },
  computed: {
    menus() {
      return this.item?.list.filter(t => t._isShow)
    }
  },
}
</script>