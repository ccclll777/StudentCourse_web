<template>
    <div class="app-container">
        <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>

        <el-row :gutter="18" style="margin-left: 300px;margin-top: 10px;width: 800px">
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-button type="primary" round @click="uploadStudentInfo">上传学生信息</el-button>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple" style="margin-left: 20px">
                    <el-button type="primary" round @click="uploadCourseInfo">上传课程信息</el-button>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-button type="primary" round @click="uploadTeacherInfo">上传教师信息</el-button>
                </div>
            </el-col>
        </el-row>


        <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
            <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item"/>
        </el-table>
    </div>
</template>

<script>
    import UploadExcelComponent from '../components/UploadExcel/index'
    import {insertStudent, insertTeacher, insertCourse} from '@/api/getData'

    export default {
        name: 'UploadExcel',
        components: {UploadExcelComponent},
        data() {
            return {
                tableData: [],
                tableHeader: []
            }
        },
        methods: {
            beforeUpload(file) {
                const isLt1M = file.size / 1024 / 1024 < 1

                if (isLt1M) {
                    return true
                }

                this.$message({
                    message: 'Please do not upload files larger than 1m in size.',
                    type: 'warning'
                })
                return false
            },
            handleSuccess({results, header}) {
                this.tableData = results
                console.log(this.tableData)
                this.tableHeader = header
                console.log(this.tableHeader)
            },
            async uploadStudentInfo() {
                for (let i = 0; i < this.tableData.length; i++) {

                    const res = await insertStudent({
                        SID: this.tableData[i].SID.toString(),
                        NAME: this.tableData[i].NAME.toString(), SEX: this.tableData[i].SEX.toString(),
                        AGE: this.tableData[i].AGE.toString(), BIRTHDAY: this.tableData[i].BIRTHDAY.toString(),
                        DNAME: this.tableData[i].DNAME.toString(), CLASS: this.tableData[i].CLASS.toString()
                    })
                }
                this.$message({
                    type: 'success',
                    message: '插入数据成功'
                });


            },
            async uploadCourseInfo() {
                for (let i = 0; i < this.tableData.length; i++) {
                    const res = await insertCourse({
                        CID: this.tableData[i].CID.toString(),
                        NAME: this.tableData[i].NAME.toString(), FCID: this.tableData[i].FCID.toString(),
                        CREDIT: this.tableData[i].CREDIT.toString()
                    })
                }
                this.$message({
                    type: 'success',
                    message: '插入数据成功'
                });

            },
            async uploadTeacherInfo() {
                for (let i = 0; i < this.tableData.length; i++) {
                    const res = await insertTeacher({
                        TID: this.tableData[i].TID.toString(),
                        NAME: this.tableData[i].NAME.toString(), SEX: this.tableData[i].SEX.toString(),
                        AGE: this.tableData[i].AGE.toString(), DNAME: this.tableData[i].DNAME.toString(),
                    })
                }

                this.$message({
                    type: 'success',
                    message: '插入数据成功'
                });
            },
        }
    }
</script>
