<template>
<div class="app-container calendar-list-container">

    <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="ID" width="60">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="140px" align="center" label="提交时间">
        <template slot-scope="scope">
          <span>{{scope.row.updatedAt | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="账号">
        <template slot-scope="scope">
          <span>{{scope.row.userName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="客栈名">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column width="150px" align="center" label="客栈地址">
        <template slot-scope="scope">
          <span>{{scope.row.address}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="法人姓名">
        <template slot-scope="scope">
          <span>{{scope.row.idcardName}}</span>
        </template>
      </el-table-column>

      <el-table-column width="170px" align="center" label="身份证号">
        <template slot-scope="scope">
          <span>{{scope.row.idcardNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column width="80px" align="center" label="身份证照">
        <template slot-scope="scope">
          <span>
            <el-popover
              placement="top-start"
              width="400"
              trigger="click">
              <div class="idcard-popover">
                <img class="idcard-popover-img" :src="scope.row.idcardPic"/>
              </div >
              <img slot="reference" :src="scope.row.idcardPic" width="50" height="75"/>
            </el-popover>
          </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="状态" width="100">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.statusLabel}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="审核消息">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.errorMsg"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelFailEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.errorMsg }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="240" >
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmFailEdit(scope.row)" size="small" icon="el-icon-circle-check-outline" >确定</el-button>
          <el-button v-else type="warning"  @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit" :disabled="scope.row.status !== 0" >不通过</el-button>

          <el-button type="primary" @click="confirmPass(scope.row)" size="small" icon="el-icon-circle-check-outline" :disabled="scope.row.status !== 0">通过</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import { getCertList, submitCert } from '@/api/commun'

export default {
  name: 'inn',
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 20
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'info',
        1: 'warning',
        2: '',
        3: 'danger',
        4: 'success'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      this.listLoading = true
      getCertList(this.listQuery).then(response => {
        const items = response.list
        if (items) {
          this.list = items.map(v => {
            this.$set(v, 'edit', false)
            v.originalMsg = v.errorMsg
            return v
          })
        }
        this.total = response.map.count
        this.listLoading = false
      })
    },
    operateCert(row, pass) {
      const id = row.id
      const msg = row.errorMsg
      submitCert(id, pass, msg).then(response => {
        row.status = response.obj.status
        row.statusLabel = response.obj.statusLabel
        row.errorMsg = response.obj.errorMsg
        this.$message({ message: '审核通过成功！', type: 'success' })
      })
    },
    confirmPass(row) {
      this.operateCert(row, 1)
    },
    confirmFailEdit(row) {
      row.edit = false
      row.originalMsg = row.errorMsg
      this.operateCert(row, 0)
    },
    cancelFailEdit(row) {
      row.errorMsg = row.originalMsg
      row.edit = false
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.fetchList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.fetchList()
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
.idcard-popover {
  width: 400px;
  height: auto;
}
.idcard-popover-img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
}
</style>
