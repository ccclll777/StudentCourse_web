<template>
    <div class="fillcontain">
        <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">
        <head-top></head-top>
        <el-form :model="searchForm" ref="searchForm" style="margin-left: 20px">
            <el-row :gutter="20" style="margin-top: 10px">
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.sid" placeholder="学号">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" round @click="searchStudentCourseInfo">查询学生选课信息</el-button>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-button type="primary" round @click="selectcourse">新增选课</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>

        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100% ;margin-top: 20px">
                <el-table-column
                    property="sid"
                    label="学号"
                >
                </el-table-column>
                <el-table-column
                    property="sname"
                    label="姓名"
                >
                </el-table-column>
                <el-table-column
                    property="cid"
                    label="课程号">
                </el-table-column>
                <el-table-column
                    property="cname"
                    label="课程名">
                </el-table-column>
                <el-table-column
                    property="credit"
                    label="学分">
                </el-table-column>
                <el-table-column
                    property="score"
                    label="得分">
                </el-table-column>
                <el-table-column
                    property="tid"
                    label="授课教师编号">
                </el-table-column>
                <el-table-column
                    property="tname"
                    label="授课教师">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">更新
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改课程信息" :visible.sync="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="得分" label-width="100px">
                        <el-input v-model="selectTable.score"></el-input>
                    </el-form-item>
                    <el-form-item label="授课教师编号" label-width="100px">
                        <el-input v-model="selectTable.tid"></el-input>
                    </el-form-item>
                    <el-form-item label="授课教师" label-width="100px">
                        <el-input v-model="selectTable.tname"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {
        findStudentCourse,
        UpdateStudentCourse
    } from '@/api/getData'

    export default {
        data() {
            return {
                tableData: [],
                dialogFormVisible:false,
                searchForm:
                    {
                       sid:''
                    },
                selectTable:{
                    sid:'',
                    sname:'',
                    cid:'',
                    cname:'',
                    credit:'',
                    tid:'',
                    tname:'',
                    score:''
                }




            }
        },
        components: {
            headTop,
        },
        created() {

        },
        methods: {
         async  searchStudentCourseInfo()
            {
                var version = new Date().getTime();
                const res = await findStudentCourse({sid: this.searchForm.sid,version:version})

                if (res.status == 1) {
                    this.tableData = res.studentCourses;
                }
            },
            selectcourse()
            {
                this.$router.push({
                    path: '/SelectCourse',
                    query: {
                       sid:this.searchForm.sid,

                    }
                    /*query: {
                        key: 'key',
                        msgKey: this.msg
                    }*/
                })
            },
            handleEdit(index, row) {

                this.selectTable.sid = row.sid;
                this.selectTable.sname = row.sname;
                this.selectTable.cid = row.cid;
                this.selectTable.cname = row.cname;
                this.selectTable.credit = row.credit;
                this.selectTable.score = row.score;
                this.selectTable.tid = row.tid;
                this.selectTable.tname = row.tname;
                this.dialogFormVisible = true;
            },
           async update()
            {
                var version = new Date().getTime();
                const res = await UpdateStudentCourse({
                sid: this.selectTable.sid, cid: this.selectTable.cid,
                score: this.selectTable.score, tid: this.selectTable.tid, version: version
            })
                if (res == 1) {
                    this.$message({
                        type: 'success',
                        message: '数据更新成功'
                    });
                }
            }

        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>
