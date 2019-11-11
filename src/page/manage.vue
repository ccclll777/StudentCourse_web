<template>
    <div class="manage_page fillcontain" >
        <meta  http-equiv="Cache-Control" content="no-cache,no-store,must-revlidate">
        <meta  http-equiv="Expires" content="O">
        <meta http-equiv="Pragma" content="no-cache">

        <el-row style="height: 100%;">
            <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
                <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
                    <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i>实验三-简单查询</template>
                        <el-menu-item index="SearchStudentInfo">查询学生信息</el-menu-item>
                        <el-menu-item index="SearchCourseInfo">查询课程信息</el-menu-item>
                        <el-menu-item index="SearchTeacherInfo">查询老师信息</el-menu-item>
                        <!--<el-menu-item index="TrainTransfer">接续换乘</el-menu-item>-->
                        <!--<el-menu-item index="foodList">食品列表</el-menu-item>-->
                        <!--<el-menu-item index="orderList">订单列表</el-menu-item>-->

                        <!--<el-menu-item index="adminList">管理员列表</el-menu-item>-->
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-plus"></i>实验四-数据插入</template>
                        <el-menu-item index="InsertStudentInfo">学生信息插入</el-menu-item>
                        <el-menu-item index="InsertCourseInfo">课程信息插入</el-menu-item>
                        <el-menu-item index="InsertTeacherInfo">教师信息插入</el-menu-item>
                        <el-menu-item index="uploadExcel">excel上传</el-menu-item>

                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-star-on"></i>实验五-数据更新</template>
                        <el-menu-item index="UpdateStudentInfo">学生信息更新</el-menu-item>
                        <el-menu-item index="UpdateCourseInfo">课程信息更新</el-menu-item>
                        <el-menu-item index="UpdateTeacherInfo">教师信息更新</el-menu-item>

                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title"><i class="el-icon-setting"></i>实验六-实现选课功能</template>
                        <el-menu-item index="StudentCourseInfo">学生选课信息</el-menu-item>
                        <el-menu-item index="SearchStudentCourseInfo">查询学生选课信息</el-menu-item>
                        <el-menu-item index="SelectCourse">学生选课</el-menu-item>
                        <!--<el-menu-item index="PassengerInfo">乘客信息</el-menu-item>-->
                        <!--<el-menu-item index="AddPassenger">添加乘客信息</el-menu-item>-->
                        <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->

                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-menu"></i>实验七-数据统计分析</template>
                        <el-menu-item index="StudentCourseInfo">有学生选修的所有课程名称</el-menu-item>
                        <el-menu-item index="SearchStudentCourseInfo">平均成绩排名前10的学生</el-menu-item>
                        <el-menu-item index="SelectCourse">选课数目排名前10的学生</el-menu-item>
                      
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    export default {

		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';
	.manage_page{

	}
</style>
