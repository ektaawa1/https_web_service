//ES Modules Format- It is the official standard format to package JavaScript. ECMAScript modules.
import express from 'express';
import data from '../database/class-schedule.json' assert { type: "json" };

// CommonJS Format
// const express = require('express')
// const data = require('../database/class-schedule.json')

const classSchedule = express.Router() // or you can do export const classSchedule = express.Router()

console.log(data, "this is our data")

//crud operations or endpoints
/*
1. GET (fetch all data)
2. GET/POST with Query params of course
3. GET/POST with Query params of /online-courses
4. POST where the classroom is assigned
5. PUT to update the classroom / change the classroom
6. DELETE one of the courses.
*/

classSchedule.get('/courses', (req, res) => {
    //no request since there is no request from the client side
    //just sending all the courses data i.e. 'data' in our case
    res.json(data)
})


/*
== means it just checks the value, so 1 == '1' gives true
=== means it checks both the value and datatype, so 1 === '1' gives false
*/
classSchedule.get('/courses/:course', (req, res) => {
    const {course} = req.params
    //instead of using for loop, in JS we can use find function
    const foundCourse = data.find(c => c["Course"] === course)

    if(foundCourse){
        res.json(foundCourse)
    }else {
        res.status(404).json({message: "Course not found!! Please check the course as they are case sensitive"})
    }
    
})

classSchedule.get('/online-courses', (req, res) => {
    //instead of using for loop, in JS we can use filter function
    const onlineCourses = data.filter(c => c.Classroom.includes('Online'))

    if(onlineCourses){
        res.json(onlineCourses)
    }else {
        res.status(404).json({message: "There are no online courses at present"})
    }
    
})


classSchedule.post('/classroom', (req, res) => {
    const {course} = req.body

    if (!course){
        return res.status(400).json({message: "Course was not provided by the client in the request"})
    }

    const courseObject = data.find(c => c.Course === course)
    //res.json(courseObject)
    res.json({classroom: courseObject?.Classroom})
})

//CommonJS Format
//module.exports = classSchedule

//ES Modules Format
export default classSchedule