<template>
    <div class="fillcontain">
        <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <el-button type="primary" round @click="editAll" style="margin-top:20px;margin-left: 10px">批量编辑</el-button>
        <el-button type="primary" round @click="updateall" style="margin-top:20px">批量更新</el-button>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                    property="SID"
                    label="学号SID"
                >
                </el-table-column>
                <el-table-column
                    property="NAME"
                    label="姓名"
                >
                    <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.NAME"></el-input>
                    </span>
                        <span v-else>{{scope.row.NAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    property="SEX"
                    label="性别">
                    <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.SEX"></el-input>
                    </span>
                        <span v-else>{{scope.row.SEX}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    property="AGE"
                    label="年龄">
                    <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.AGE"></el-input>
                    </span>
                        <span v-else>{{scope.row.AGE}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    property="BIRTHDAY"
                    label="生日">
                    <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.BIRTHDAY"></el-input>
                    </span>
                        <span v-else>{{scope.row.BIRTHDAY}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    property="DNAME"
                    label="学院">
                    <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.DNAME"></el-input>
                    </span>
                        <span v-else>{{scope.row.DNAME}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    property="CLASS"
                    label="CLASS">
                    <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.CLASS"></el-input>
                    </span>
                        <span v-else>{{scope.row.CLASS}}</span>
                    </template>
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
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>
            <el-dialog title="修改教师信息" :visible.sync="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="姓名" label-width="100px">
                        <el-input v-model="selectTable.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" label-width="100px">
                        <el-input v-model="selectTable.sex"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" label-width="100px">
                        <el-input v-model="selectTable.age"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期" label-width="100px">
                        <el-input v-model="selectTable.birthday"></el-input>
                    </el-form-item>
                    <el-form-item label="所在学院" label-width="100px">
                        <el-input v-model="selectTable.dname"></el-input>
                    </el-form-item>
                    <el-form-item label="CLASS" label-width="100px">
                        <el-input v-model="selectTable.class"></el-input>
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
    import headTop from '../components/headTop';
    import {getAllstudent, updateStudent} from '@/api/getData';
    import Vue from 'vue';
    export default {
        data() {
            return {

                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 10,
                count: 0,
                currentPage: 1,
                dialogFormVisible: false,
                selectTable: {
                    name: '',
                    age: '',
                    sex: '',
                    dname: '',
                    birthday: '',
                    class: '',
                    SID: ''
                },
                multipleSelection: [],//多选的数据

            }
        },
        created() {
            this.initData();
        },
        components: {
            headTop,
        },
        methods: {
            async initData() {
                var version = new Date().getTime();
                const res = await getAllstudent({version: version})
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
                this.getLists();
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
            }, handleEdit(index, row) {

                this.selectTable.sid = row.SID;
                this.selectTable.name = row.NAME;
                this.selectTable.sex = row.SEX;
                this.selectTable.age = row.AGE;
                this.selectTable.dname = row.DNAME;
                this.selectTable.birthday = row.BIRTHDAY;
                this.selectTable.class = row.CLASS;
                console.log(this.selectTable)
                this.dialogFormVisible = true;
            },
            async update() {
                var version = new Date().getTime();
                const res = await updateStudent({
                    SID: this.selectTable.sid,
                    NAME: this.selectTable.name,
                    SEX: this.selectTable.sex,
                    AGE: this.selectTable.age,
                    DNAME: this.selectTable.dname,
                    BIRTHDAY: this.selectTable.birthday,
                    CLASS: this.selectTable.class,
                    version: version
                })
                if (res == 1) {
                    this.$message({
                        type: 'success',
                        message: '数据更新成功'
                    });
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            async updateall() {
                console.log(this.multipleSelection)
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    var version = new Date().getTime();
                    const res = await updateStudent({
                        SID:  this.multipleSelection[i].SID,
                        NAME: this.multipleSelection[i].NAME,
                        SEX:this.multipleSelection[i].SEX,
                        AGE: this.multipleSelection[i].AGE,
                        DNAME: this.multipleSelection[i].DNAME,
                        BIRTHDAY: this.multipleSelection[i].BIRTHDAY,
                        CLASS: this.multipleSelection[i].CLASS,
                        version: version
                    })
                }
                this.$message({
                    type: 'success',
                    message: '数据更新成功'
                });

            },
            editAll() {
                this.tableData.map((i, index) => {
                    if (i.show == true) {
                        i.show = false;
                    }
                    else {
                        i.show = true;
                    }

                    Vue.set(this.tableData, index, i)
                })
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
