<template>
    <div class="fillcontain">
        <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
            >

                <el-table-column
                    label="学号"
                    prop="sid">
                </el-table-column>
                <el-table-column
                    label="学生姓名"
                    prop="sname">
                </el-table-column>
                <el-table-column
                    label="优秀"
                    prop="a">
                </el-table-column>
                <el-table-column
                    label="良好"
                    prop="b">
                </el-table-column>
                <el-table-column
                    label="合格"
                    prop="c">
                </el-table-column>
                <el-table-column
                    label="不合格"
                    prop="f">
                </el-table-column>
                <el-table-column
                    label="总课数"
                    prop="sumCourse">
                </el-table-column>
            </el-table>
            <!-- Table -->
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="limit"
                    layout="total, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getScoreDistribution} from '@/api/getData'
    import {TickerOrder} from "../router/index"

    export default {
        data() {
            return {
                tableData: [
                    {
                        sid: '1',
                        sname: '',
                        maxScore: '',
                        cid: '',
                        cname: ''
                    }
                ],
                cache: [],
                currentRow: null,
                offset: 0,
                limit: 10,
                count: 0,
                currentPage: 1,

            }
        },
        async created() {
            this.initData();
        },
        components: {
            headTop,
        },
        methods: {

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getLists()
            },
            async initData() {

                const res = await getScoreDistribution()
                if (res.status == 1) {

                    this.tableData = [];

                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    this.tableData = res.scoreDistributions;
                    this.cache = res.scoreDistributions;
                }
                this.count = res.scoreDistributions.length;
                this.getLists();


            },
            async getLists() {

                this.tableData = [];
                for (let i = this.offset; i < this.offset + this.limit; i++) {
                    if (i < this.offset + this.cache.length) {
                        this.tableData.push(this.cache[i])
                        console.log(this.cache[i])
                    }

                }


            }


        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .table_container {
        padding: 20px;
    }

    .Pagination {
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
