<template>
  <div class="dashboard-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" :userCount="userCount" :orderCount="orderCount" :communCount="communCount" :priceCount="priceCount"></panel-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './components/PanelGroup'
import { getStatistics } from '@/api/statistics'

export default {
  name: 'dashboard',
  data() {
    return {
      userCount: 0,
      orderCount: 0,
      communCount: 0,
      priceCount: 0
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    this.GetStatistics()
  },
  components: {
    PanelGroup
  },
  methods: {
    GetStatistics() {
      getStatistics().then(response => {
        this.userCount = response.obj.userCount
        this.orderCount = response.obj.orderCount
        this.communCount = response.obj.communCount
        this.priceCount = response.obj.priceCount
      })
    },
    handleSetLineChartData(type) {
      console.log(type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
