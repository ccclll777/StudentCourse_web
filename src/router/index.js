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



const UpdateStudentInfo = r => require.ensure([], () => r(require('@/page/UpdateStudentInfo')), 'UpdateStudentInfo');

const UpdateCourseInfo = r => require.ensure([], () => r(require('@/page/UpdateCourseInfo')), 'UpdateCourseInfo');

const UpdateTeacherInfo = r => require.ensure([], () => r(require('@/page/UpdateTeacherInfo')), 'UpdateTeacherInfo');

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
            }]
    }
]

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})
