<template>
    <div class="fillcontain">
        <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>

        <el-row :gutter="20" style="margin-top: 10px">

            <el-col :span="4">
                <div class="grid-content bg-purple">

                    <el-tag type="success" style="margin-left: 300px">  正在给{{sid}}选课</el-tag>
                </div>
            </el-col>
        </el-row>
        <el-table
            :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column
                label="课程号"
                prop="cid">
            </el-table-column>
            <el-table-column
                label="课程名称"
                prop="cname">
            </el-table-column>
            <el-table-column
                label="先行课号"
                prop="fcid">
            </el-table-column>
            <el-table-column
                label="学分"
                prop="credit">
            </el-table-column>
            <el-table-column
                label="教师编号"
                prop="tid">
            </el-table-column>
            <el-table-column
                label="教师名称"
                prop="tname">
            </el-table-column>
            <el-table-column
                label="所在学院"
                prop="dname">
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">选课
                    </el-button>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="limit"
            layout="total, prev, pager, next, jumper"
            :total="count">
        </el-pagination>
        <div >

        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {findAllCourse,insertStudentCourse,findAllCourseTeacher} from '@/api/getData'

    export default {
        data() {
            return {
                tableData: [],
                searchForm:
                    {
                        cid:'',
                        name:'',
                        fcid:'',
                        credit:''

                    },
                currentRow: null,
                offset: 0,
                limit: 10,
                count: 0,
                currentPage: 1,
                sid:'',
                name:'',
                multipleSelection:[],
                dialogFormVisible:false
            }
        },
        async created() {
            if(this.$route.query.sid == null )

            {
                this.$message({
                    message: '请先选择学生',
                    type: 'warning'
                });
            }else

            {
                this.sid = this.$route.query.sid;

            }
            this.initData();
        },
        components: {
            headTop,
        },
        methods: {
            async initData() {
                var version = new Date().getTime();
                const res = await findAllCourseTeacher({version:version})
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    this.tableData = [];
                    this.tableData = res.courses;
                    this.count = res.courseTeachers.length;
                    this.getLists();
                }


            },

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getLists()
            },
            async getLists() {
                var version = new Date().getTime();
                const res = await findAllCourseTeacher({version:version})
                if (res.status == 1) {

                    this.tableData = [];
                    for (let i = this.offset; i < this.offset + this.limit; i++) {
                        if (i < this.offset + res.courseTeachers.length) {

                            this.tableData.push(res.courseTeachers[i]);

                        }

                    }


                }
            },
            async handleEdit(index, row) {
                // let flag = false;
                // this.$alert('你确定选择'+row.cname+"吗", '选课信息', {
                //     confirmButtonText: '确定',
                //     callback: action => {
                //         flag  = true;
                //         console.log("1111"+flag)
                //
                //     }
                // });
                // console.log(flag)
                // if(flag == true)
                // {

                        const res = await insertStudentCourse({sid:this.sid,cid:row.cid,tid:row.tid})
                    if(res == 1)
                    {
                        this.$message({
                            type: 'success',
                            message: '选课成功'
                        });
                    }
                    else
                    {
                        this.$message({
                            type: 'danger',
                            message: '选课失败'
                        });
                    }

                // }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
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
