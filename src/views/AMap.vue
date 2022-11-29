<template>
  <div class="container">
    <el-button type="primary" @click="mapInstance.setFitView()">setFitView</el-button>
    <div class="map-wrapper">
      <el-amap ref="amapRef" :center="center" :zoom="zoom" @init="init" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center: [121.59996, 31.197646],
      zoom: 12,
      mapInstance: null,
    }
  },

  methods: {
    init(map) {
      const marker = new AMap.Marker({
        position: [121.59996, 31.197646],
      });
      map.add(marker);
      this.mapInstance = map;
      this.mapInstance.setFitView();
    }
  }
}
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  height: calc(100vh - 200px);
  margin-right: 10px;
}
.el-button {
  margin-bottom: 10px;
}
</style>
