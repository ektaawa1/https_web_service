import express from 'express';
import studentData from '../database/2024-spring-students-info.json' assert { type: "json" };
//const express = require('express')
//const studentData = require('../database/2024-spring-students-info.json')

const studentInfo = express.Router()

console.log(studentData, "This is the data of 2024 Spring Students")

/*
1. GET  / to retrieve all the student-info
2. POST /to retrieve your information based on 'student-id'
3. POST /to retrieve student's info who has taken CS548 -> the result should be all students ( return student-id only)
4. POST /to retrieve who has taken the courses you have taken except CS548. 
(Hint: Pass your student-id  for example for Rahel its CS522, find out who has taken this course) one of the logic could be this- 
students.filter(student => student.courses.some(course => course.course_id === course_id)

*/

//1st- To retrieve all the student-info
//POSTMAN https://localhost:8080/https-web-service/v1/student-info 
studentInfo.get('/student-info', (req, res) => {
    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userDevice = req.header('User-Agent')
    
    res.json({studentData, userIp: userIp, userDevice: userDevice})
})

//2nd- To retrieve your info based on 'student-id'
//POSTMAN https://localhost:8080/https-web-service/v1/student-details
studentInfo.post('/student-details', (req, res) => {
    const {student_id} = req.body //the name of the variable here must match the json key

    if(!student_id){
        return res.status(400).json({message: "studentId was not provided by the client in the request"})
    }

    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userDevice = req.header('User-Agent')

    const studentDetails = studentData.find(c => c.student_id === student_id)
    res.json({studentDetails, userIp: userIp, userDevice: userDevice})
})

//3rd- To retrieve student-ids of those who enrolled in CS548
//POSTMAN https://localhost:8080/https-web-service/v1/enrolled-student-ids
studentInfo.post('/enrolled-student-ids', (req, res) => {
    const {course_id} = req.body

    if(!course_id){
        return res.status(400).json({message: "check the request body, it might be incorrect.."})
    }

    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userDevice = req.header('User-Agent')

    //const studentObject = studentData.filter(stu => stu.courses.filter(c => c.course_id === course_id))
    //const studentObject = studentData.filter(c => c.courses.find(s=>s.course_id === course_id))
    const studentObject = studentData.filter(stu => stu.courses.some(c => c.course_id === course_id))

    if(studentObject){
        const studentIds =studentObject.map(s => s.student_id)
        res.json({student_ids: studentIds, userIp: userIp, userDevice: userDevice})
    }else {
        res.status(404).json({message: "There is no enrollment for this course_id in this trimester..."})
    }
})

//4th- To retrieve student-ids of those who has taken the courses you have taken except CS548
//POSTMAN https://localhost:8080/https-web-service/v1//enrolled-in-same-courses
studentInfo.post('/enrolled-in-same-courses', (req, res) => {
    const {student_id} =req.body

    if(!student_id){
        return res.status(400).json({message: "check the request body, it might be incorrect.."})
    }

    const userIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const userDevice = req.header('User-Agent')

    const myDetails = studentData.find(c => c.student_id === student_id) //fetching my details from the list of students
    const myCourses = myDetails.courses.map(myCourse => myCourse.course_id) //fetching the list of my course Ids
    //res.json(myCourses) //for testing purpose

    const similarEnrollment = studentData.filter(stu => {
        if(stu.student_id === student_id) {
            return false; //since I have to exclude myself from the list
        }

        const otherStuCoIds = stu.courses.map(co => co.course_id)
        return otherStuCoIds.some(co => myCourses.includes(co) && co !== 'CS548')

    })
    //res.json(similarEnrollment) //for testing purpose
    const studentIds = similarEnrollment.map(st => st.student_id)

    res.json({student_ids: studentIds, userIp: userIp, userDevice: userDevice})

})

//module.exports = studentInfo

//ES Modules Format
export default studentInfo