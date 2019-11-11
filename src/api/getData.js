import fetch from '@/config/fetch'

/**
 * 登陆注册
 */

export const login = data => fetch('/user/login', data, 'POST');

export const register = data => fetch('/user/register', data, 'POST');

export const getAllstudent = data => fetch('/student/findAllStudent', data, 'GET');

export const findStudentLessThan = data => fetch('/student/findStudentLessThan', data, 'GET');

export const findStudentLessThanAndDNAME = data => fetch('/student/findStudentLessThanAndDNAME', data, 'GET');
export const findAllNameAndAge = data => fetch('/student/findAllNameAndAge', data, 'GET');
export const findNameSex = data => fetch('/student/findNameSex', data, 'GET');
export const insertStudent = data => fetch('/student/insertStudent', data, 'POST');
export const updateTeacher = data => fetch('/teacher/updateTeacher', data, 'POST');




export const findAllCourse = data => fetch('/course/findAllCourse', data, 'GET');

export const findCourseByFcid = data => fetch('/course/findCourseByFcid', data, 'GET');

export const findAllTeacher = data => fetch('/teacher/findAllTeacher', data, 'GET')

export const findTeacherAgeThan = data => fetch('/teacher/findTeacherAgeThan', data, 'GET')

export const findTeacherSexIs = data => fetch('/teacher/findTeacherSexIs', data, 'GET')

export const findDnameIs = data => fetch('/teacher/findDnameIs', data, 'GET')


export const insertTeacher= data => fetch('/teacher/insertTeacher', data, 'POST');

export const insertCourse= data => fetch('/course/insertCourse', data, 'POST');


export const updateStudent = data => fetch('/student/updateStudent', data, 'POST');

export const updateCourse = data => fetch('/course/updateCourse', data, 'POST');


export const findStudentCourse = data => fetch('/StudentCourse/findStudentCourse', data, 'GET');


export const findAllCourseTeacher = data => fetch('/StudentCourse/findAllCourseTeacher', data, 'GET');
export const insertStudentCourse = data => fetch('/StudentCourse/insertStudentCourse', data, 'GET');


export const UpdateStudentCourse = data => fetch('/StudentCourse/UpdateStudentCourse', data, 'GET');



export const findSelectionCourse = data => fetch('/StudentCourse/findSelectionCourse', data, 'GET');
export const countSelectCourseNum = data => fetch('/StudentCourse/countSelectCourseNum', data, 'GET');


export const findMaxScore = data => fetch('/StudentCourse/findMaxScore', data, 'GET');


export const getScoreDistribution = data => fetch('/StudentCourse/getScoredistribution', data, 'GET');

export const getCourseMaxScoreStudent = data => fetch('/StudentCourse/getCourseMaxScoreStudent', data, 'GET');

export const findSelectCourseNum = data => fetch('/StudentCourse/findSelectCourseNum', data, 'GET');
