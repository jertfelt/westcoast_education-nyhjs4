import { getDatabase, increment, ref, set, update } from "firebase/database";

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
) => {
  const db = getDatabase()
  update(ref(db, "/courses/" + courseID1), {
    studentsAssigned: increment(-1)
  })
}



export const incrementCoursesByStudent =    (     
  courseID2) => {
  const db = getDatabase()
 
  update(ref(db, "/courses/" + courseID2), {
    studentsAssigned: increment(1)
  })

}