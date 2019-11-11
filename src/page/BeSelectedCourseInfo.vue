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

                <!--<el-table-column-->
                    <!--label="课程号"-->
                    <!--prop="cid">-->
                <!--</el-table-column>-->
                <el-table-column
                    label="课程名称"
                    prop="name">
                </el-table-column>
                <!--<el-table-column-->
                    <!--label="先行课号"-->
                    <!--prop="fcid">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                    <!--label="学分"-->
                    <!--prop="credit">-->
                <!--</el-table-column>-->
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
    import {findSelectionCourse} from '@/api/getData'
    import {TickerOrder} from "../router/index"

    export default {
        data() {
            return {
                value1: false,
                tableData: [
                    {
                        name:'1',
                    }
                ],
                selectTable: {},
                searchForm:
                    {
                        fcid: ''

                    },
                currentRow: null,
                offset: 0,
                limit: 10,
                count: 0,
                currentPage: 1,
                test1:true,
                test2:false,
                cache:[]
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

                const res = await findSelectionCourse()
                if (res.status == 1) {

                    this.tableData = [];
                    for(let i = 0 ; i < res.courseNames.length ; i++)
                    {
                        const temp = {}
                        temp.name = res.courseNames[i];
                        this.tableData.push(temp)

                    }
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    this.count = res.courseNames.length;
                    this.cache = res.courseNames;
                    this.getLists();
                }


            },
            async getLists() {


                // var version = new Date().getTime();
                // const res = await findSelectionCourse({version:version})
                if (res.status == 1) {

                    this.tableData = [];
                    for (let i = this.offset; i < this.offset + this.limit; i++) {
                        if (i < this.offset +  this.cache.length) {
                            const temp = {}
                            temp.name =  this.cache[i];
                            this.tableData.push(temp)

                        }

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
