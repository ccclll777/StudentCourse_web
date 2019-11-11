<template>
    <div class="fillcontain">
        <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100% ;margin-top: 20px">
                <el-table-column
                    property="SID"
                    label="学号SID"
                >
                </el-table-column>
                <el-table-column
                    property="NAME"
                    label="姓名"
                >
                </el-table-column>
                <el-table-column
                    property="SEX"
                    label="性别">
                </el-table-column>
                <el-table-column
                    property="AGE"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    property="BIRTHDAY"
                    label="生日">
                </el-table-column>
                <el-table-column
                    property="DNAME"
                    label="学院">
                </el-table-column>
                <el-table-column
                    property="CLASS"
                    label="CLASS">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">查看选课信息
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
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
            <el-dialog title="选课信息" :visible.sync="dialogFormVisible">
                <el-table
                    :data="tableData_Info"
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
                        property="tname"
                        label="授课教师">
                    </el-table-column>


                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <!--<el-button type="primary" @click="update">确 定</el-button>-->
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {
        getAllstudent,
        findStudentCourse
    } from '@/api/getData'

    export default {
        data() {
            return {
                tableData: [], searchForm:
                    {
                        age: '',
                        dname: '',
                        age2: '',
                        age3: ''
                    }
                ,
                currentRow: null,
                offset: 0,
                limit: 10,
                count: 0,
                currentPage: 1,
                dialogFormVisible: false,
                tableData_Info: [],
                selectTable: {
                    name: '',
                    age: '',
                    sex: '',
                    dname: '',
                    birthday: '',
                    class: '',
                    SID: ''
                },


            }
        },
        components: {
            headTop,
        },
        created() {
            this.initData();
        },
        methods: {
            async initData() {


                const res = await getAllstudent({})
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    console.log(res.students)
                    this.tableData = []
                    this.tableData = [];
                    this.tableData = res.students;
                    this.count = res.students.length;
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


                const res = await getAllstudent({})
                if (res.status == 1) {

                    this.tableData = [];
                    for (let i = this.offset; i < this.offset + this.limit; i++) {
                        if (i < this.offset + res.students.length) {
                            const temp = {};
                            temp.SID = res.students[i].sid;
                            temp.NAME = res.students[i].name;
                            temp.SEX = res.students[i].sex;
                            temp.AGE = res.students[i].age;
                            temp.BIRTHDAY = res.students[i].birthday;
                            temp.DNAME = res.students[i].dname;
                            temp.CLASS = res.students[i].class;
                            this.tableData.push(temp);

                        }

                    }


                }

            },
            async handleEdit(index, row) {

                this.selectTable.sid = row.SID;
                this.selectTable.name = row.NAME;
                this.selectTable.sex = row.SEX;
                this.selectTable.age = row.AGE;
                this.selectTable.dname = row.DNAME;
                this.selectTable.birthday = row.BIRTHDAY;
                this.selectTable.class = row.CLASS;
                this.dialogFormVisible = true;
                const res = await findStudentCourse({sid: row.SID})

                if (res.status == 1) {
                    this.tableData_Info = res.studentCourses;
                }
            },

        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }
</style>
