<template>
    <div class="fillcontain">
        <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <head-top></head-top>
        <el-form :model="searchForm" ref="searchForm">
            <el-row :gutter="24" style="margin-left: 30px;margin-top: 10px;width: 800px">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.tid" placeholder="教师编号">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="margin-left: 20px">
                        <el-input v-model="searchForm.name" placeholder="姓名">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.sex" placeholder="性别">
                        </el-input>
                        <!--<el-button type="primary" round @click="submitForm('searchForm')">搜索</el-button>-->
                    </div>
                </el-col>

            </el-row>
            <el-row :gutter="24" style="margin-left: 30px;margin-top: 10px;width: 800px">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="searchForm.age" placeholder="年龄">
                        </el-input>
                        <!--<el-button type="primary" round @click="submitForm('searchForm')">搜索</el-button>-->
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple" style="margin-left: 20px">
                        <el-input v-model="searchForm.dname" placeholder="所在学院">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">

                        <el-button type="primary" round @click="insertTeacherInfo">插入</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form>

        <el-table
            :data="tableData"
            style="width: 100%"
            row-key="tid"
        >

            <el-table-column
                label="教师编号"
                prop="tid">
            </el-table-column>
            <el-table-column
                label="教师名称"
                prop="name">
            </el-table-column>
            <el-table-column
                label="性别"
                prop="sex">
            </el-table-column>
            <el-table-column
                label="年龄"
                prop="age">
            </el-table-column>
            <el-table-column
                label="所属学院"
                prop="dname">
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
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {findAllTeacher,insertTeacher} from '@/api/getData'

    export default {
        data() {
            return {

                tableData: [],
                searchForm:
                    {
                        tid: '',
                        name: '',
                        sex: '',
                        age: '',
                        dname: '',

                    },
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
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
            async initData() {

                const res = await findAllTeacher({})
                if (res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '获取数据成功'
                    });
                    console.log(res.teachers)
                    this.tableData = []
                    this.tableData = [];
                    this.tableData = res.teachers;
                    this.count = res.teachers.length;
                    this.cache = res.teachers;
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
                // const res = await findAllTeacher({})
                // if (res.status == 1) {

                    this.tableData = [];
                    for (let i = this.offset; i < this.offset + this.limit; i++) {
                        if (i < this.offset + this.cache.length) {
                            const temp = {};
                            temp.tid = this.cache[i].tid;
                            temp.name = this.cache[i].name;
                            temp.sex = this.cache[i].sex;
                            temp.age = this.cache[i].age;
                            temp.dname = this.cache[i].dname;
                            this.tableData.push(temp);

                        }

                    }


                // }
            },
            async insertTeacherInfo()
            {
                const res = await insertTeacher({TID:this.searchForm.tid,
                    NAME:this.searchForm.name,SEX:this.searchForm.sex,
                    AGE:this.searchForm.age, DNAME:this.searchForm.dname,})
                if(res == 1)
                {
                    this.$message({
                        type: 'success',
                        message: '插入数据成功'
                    });

                }
                this.initData();
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
