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

