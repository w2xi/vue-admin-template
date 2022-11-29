import Vue from 'vue'
import VueAMap from 'vue-amap'

Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: '5eaa15ae7fada053c6414c43fc869a2d',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4',
})