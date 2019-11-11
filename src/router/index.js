import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const SearchStudentInfo = r => require.ensure([], () => r(require('@/page/SearchStudentInfo')), 'SearchStudentInfo');
const SearchTeacherInfo = r => require.ensure([], () => r(require('@/page/SearchTeacherInfo')), 'SearchTeacherInfo');
const InsertStudentInfo = r => require.ensure([], () => r(require('@/page/InsertStudentInfo')), 'InsertStudentInfo');
const InsertTeacherInfo = r => require.ensure([], () => r(require('@/page/InsertTeacherInfo')), 'InsertTeacherInfo');
const InsertCourseInfo = r => require.ensure([], () => r(require('@/page/InsertCourseInfo')), 'InsertCourseInfo');
const SearchCourseInfo = r => require.ensure([], () => r(require('@/page/SearchCourseInfo')), 'SearchCourseInfo');
const uploadExcel = r => require.ensure([], () => r(require('@/page/upload-excel')), 'uploadExcel');
const StudentCourseInfo = r => require.ensure([], () => r(require('@/page/StudentCourseInfo')), 'StudentCourseInfo');
const SearchStudentCourseInfo = r => require.ensure([], () => r(require('@/page/SearchStudentCourseInfo')), 'SearchStudentCourseInfo');
const SelectCourse= r => require.ensure([], () => r(require('@/page/SelectCourse')), 'SelectCourse');
const UpdateStudentInfo = r => require.ensure([], () => r(require('@/page/UpdateStudentInfo')), 'UpdateStudentInfo');

const UpdateCourseInfo = r => require.ensure([], () => r(require('@/page/UpdateCourseInfo')), 'UpdateCourseInfo');

const UpdateTeacherInfo = r => require.ensure([], () => r(require('@/page/UpdateTeacherInfo')), 'UpdateTeacherInfo');

const BeSelectedCourseInfo = r => require.ensure([], () => r(require('@/page/BeSelectedCourseInfo')), 'BeSelectedCourseInfo');

const StudentSelectCourseNum = r => require.ensure([], () => r(require('@/page/StudentSelectCourseNum')), 'StudentSelectCourseNum');

const MaxScore   = r => require.ensure([], () => r(require('@/page/MaxScore')), 'MaxScore');

const ScoreDistribution   = r => require.ensure([], () => r(require('@/page/ScoreDistribution')), 'ScoreDistribution');

const CourseMaxScoreStudent   = r => require.ensure([], () => r(require('@/page/CourseMaxScoreStudent')), 'CourseMaxScoreStudent');

const SelectCourseNum   = r => require.ensure([], () => r(require('@/page/SelectCourseNum')), 'SelectCourseNum');

const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        children: [{
            path: '',
            component: home,
            meta: [],
        }, {
            path: '/SearchStudentInfo',
            component: SearchStudentInfo,
            meta: ['实验三-简单查询', '学生信息查询'],
        }, {
            path: '/SearchTeacherInfo',
            component: SearchTeacherInfo,
            meta: ['实验三-简单查询', '教师信息查询'],
        }, {
            path: '/InsertStudentInfo',
            component: InsertStudentInfo,
            meta: ['实验四-数据插入', '学生信息插入'],
        }, {
            path: '/InsertTeacherInfo',
            component: InsertTeacherInfo,
            meta: ['实验四-数据插入', '教师信息插入'],
        }, {
            path: '/InsertCourseInfo',
            component: InsertCourseInfo,
            meta: ['实验四-数据插入', '课程信息插入'],
        },
            {
                path: '/uploadExcel',
                component: uploadExcel,
                meta: ['实验四-数据插入', 'excel上传'],
            }, {
                path: '/SearchCourseInfo',
                component: SearchCourseInfo,
                meta: ['实验三-简单查询', '课程信息查询'],
            },


            {
                path: '/UpdateStudentInfo',
                component: UpdateStudentInfo,
                meta: ['实验五-数据更新', '学生信息更新'],
            }, {
                path: '/UpdateCourseInfo',
                component: UpdateCourseInfo,
                meta: ['实验五-数据更新', '课程信息更新'],
            }, {
                path: '/UpdateTeacherInfo',
                component: UpdateTeacherInfo,
                meta: ['实验五-数据更新', '教师信息更新'],
            },
            {
                path: '/StudentCourseInfo',
                component: StudentCourseInfo,
                meta: ['实验六-实现选课功能', '学生选课信息'],
            },{
                path: '/SearchStudentCourseInfo',
                component: SearchStudentCourseInfo,
                meta: ['实验六-实现选课功能', '查询学生选课信息'],
            },{
                path: '/SelectCourse',
                component: SelectCourse,
                meta: ['实验六-实现选课功能', '学生选课'],
            },{
                path: '/BeSelectedCourseInfo',
                component: BeSelectedCourseInfo,
                meta: ['实验七-数据统计分析', '有学生选修的所有课程名称'],
            },
            {
                path: '/StudentSelectCourseNum',
                component: StudentSelectCourseNum,
                meta: ['实验七-数据统计分析', '选课数目排名前10的学生'],
            },{
                path: '/MaxScore',
                component: MaxScore,
                meta: ['实验七-数据统计分析', '最高成绩以及最高成绩对应的课程名'],
            },
            {
                path: '/ScoreDistribution',
                component: ScoreDistribution,
                meta: ['实验七-数据统计分析', '每位同学的成绩分布'],
            },
            {
                path: '/CourseMaxScoreStudent',
                component: CourseMaxScoreStudent,
                meta: ['实验七-数据统计分析', '课程最高成绩以及对应的学生姓名'],
            },
            {
                path: '/SelectCourseNum',
                component: SelectCourseNum,
                meta: ['实验七-数据统计分析', '选课人数排名前10的课程'],
            }
            ]

    }
]

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})
