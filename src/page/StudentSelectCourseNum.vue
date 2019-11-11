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
                    label="选课数"
                    prop="courseCount">
                </el-table-column>

            </el-table>
            <!-- Table -->

        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {countSelectCourseNum} from '@/api/getData'
    import {TickerOrder} from "../router/index"

    export default {
        data() {
            return {
                value1: false,
                tableData: [
                    {
                        sid:'1',
                        sname:'',
                        courseCount:''
                    }
                ],

            }
        },
        async created() {
            this.initData();
        },
        components: {
            headTop,
        },
        methods: {


            async initData() {

                const res = await countSelectCourseNum({i:10})
                if (res.status == 1) {

                    this.tableData = [];

                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    this.tableData = res.studentCourseCounts;

                }


            },







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
