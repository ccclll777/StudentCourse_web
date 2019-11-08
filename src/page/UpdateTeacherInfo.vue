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
                row-key="tid"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column
                    label="教师编号"
                    prop="tid">
                    <!--<template slot-scope="scope">-->
                    <!--<span v-if="scope.row.show">-->
                        <!--<el-input size="mini" placeholder="请输入内容" v-model="scope.row.tid"></el-input>-->
                    <!--</span>-->
                        <!--<span v-else>{{scope.row.tid}}</span>-->
                    <!--</template>-->

                </el-table-column>
                <el-table-column
                    label="教师名称"
                    prop="name">
                    <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.name"></el-input>
                    </span>
                        <span v-else>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="性别"
                    prop="sex">
                    <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.sex"></el-input>
                    </span>
                        <span v-else>{{scope.row.sex}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="年龄"
                    prop="age">
                    <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.age"></el-input>
                    </span>
                        <span v-else>{{scope.row.age}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="所属学院"
                    prop="dname">
                    <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="mini" placeholder="请输入内容" v-model="scope.row.dname"></el-input>
                    </span>
                        <span v-else>{{scope.row.dname}}</span>
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
                    <el-form-item label="所在学院" label-width="100px">
                        <el-input v-model="selectTable.dname"></el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="update">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="修改教师信息" :visible.sync="dialogFormVisibleall">
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
                    <el-form-item label="所在学院" label-width="100px">
                        <el-input v-model="selectTable.dname"></el-input>
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
    import {updateTeacher, findAllTeacher} from '@/api/getData';
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
                dialogFormVisibleall: false,
                selectTable: {
                    name: '',
                    sex: '',
                    age: '',
                    dname: '',
                    tid: '',
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
                const res = await findAllTeacher({})
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    this.tableData = []
                    this.tableData = [];
                    this.tableData = res.teachers;
                    this.count = res.teachers.length;
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
                var version = new Date().getTime();
                const res = await findAllTeacher({version: version})
                if (res.status == 1) {

                    this.tableData = [];
                    for (let i = this.offset; i < this.offset + this.limit; i++) {
                        if (i < this.offset + res.teachers.length) {

                            this.tableData.push(res.teachers[i]);

                        }

                    }


                }
            }, handleEdit(index, row) {

                this.selectTable.tid = row.tid;
                this.selectTable.dname = row.dname;
                this.selectTable.age = row.age;
                this.selectTable.name = row.name;
                this.selectTable.sex = row.sex;
                console.log(this.selectTable)
                this.dialogFormVisible = true;
            },
            async update() {
                var version = new Date().getTime();
                const res = await updateTeacher({
                    TID: this.selectTable.tid,
                    NAME: this.selectTable.name,
                    SEX: this.selectTable.sex,
                    AGE: this.selectTable.age,
                    DNAME: this.selectTable.dname,
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
                    const res = await updateTeacher({
                        TID: this.multipleSelection[i].tid,
                        NAME: this.multipleSelection[i].name,
                        SEX:this.multipleSelection[i].sex,
                        AGE: this.multipleSelection[i].age,
                        DNAME: this.multipleSelection[i].dname,
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
