import { getDatabase, increment, ref, set } from "firebase/database";

const sendStudentEditToFb = (
  courses,
  newEmail,
  studentID,
  newName,
  newPassword,
  referenceURL
) => {
  
    const db = getDatabase()
    const itemToDb = {
      courses : courses,
      studentEmail : newEmail,
      studentID: studentID,
      studentName : newName, 
      studentPassword : newPassword
    }

    const refDb = ref(db, referenceURL)
    set(refDb, itemToDb)
  }
 
export default sendStudentEditToFb;


export const sendCourseToStudentAndUpdate = (courseID, 
  published,
  lengthWeeks,
  courseDescription,
  courseName,
  startDate,
  teacherAssigned,
  referenceURLCourse) => {
  const db = getDatabase()
  const refDb = ref(db, referenceURLCourse)
  set(refDb, {
    courseID: courseID,
    published: published,
    lengthWeeks: lengthWeeks,
    courseDescription : courseDescription,
    courseName: courseName,
    startDate: startDate,
    studentsAssigned: increment(1),
    teacherAssigned: teacherAssigned,
  })

}

export const decrementCoursesByStudent = (     courseID1, 
  published1,
  lengthWeeks1,
  courseDescription1,
  courseName1,
  startDate1,
  teacherAssigned1,
  referenceURLCourseOLD,) => {
  const db = getDatabase()
  const refDb = ref(db, referenceURLCourseOLD)
  set(refDb, {
    courseID: courseID1,
    published: published1,
    lengthWeeks: lengthWeeks1,
    courseDescription : courseDescription1,
    courseName: courseName1,
    startDate: startDate1,
    studentsAssigned: increment(-1),
    teacherAssigned: teacherAssigned1,
  })

}

export const incrementCoursesByStudent =    (     
  referenceURLCourseNEW,
      courseID2, 
      published2,
      lengthWeeks2,
      courseDescription2,
      courseName2,
      startDate2,
      teacherAssigned2,) => {
  const db = getDatabase()
  console.log(
    referenceURLCourseNEW,
    courseID2, 
    published2,
    lengthWeeks2,
    courseDescription2,
    courseName2,
    startDate2,
    teacherAssigned2,
  )
  // set(ref(db,"/courses/" + courseID2) , {
  //   courseID: courseID2,
  //   published: published2,
  //   lengthWeeks: lengthWeeks2,
  //   courseDescription : courseDescription2,
  //   courseName: courseName2,
  //   startDate: startDate2,
  //   studentsAssigned: increment(1),
  //   teacherAssigned: teacherAssigned2,
  // })
  

}