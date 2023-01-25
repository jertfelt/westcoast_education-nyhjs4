import { getDatabase, increment, ref, set } from "firebase/database";

const sendStudentEditToFb = async (
  courses,
  studentEmail,
  studentID,
  studentName,
  studentPassword,
  referenceURL
) => {
  
    const db = getDatabase()
    const itemToDb = {
      courses : courses,
      studentEmail : studentEmail,
      studentID: studentID,
      studentName : studentName, 
      studentPassword : studentPassword
    }

    const refDb = ref(db, referenceURL)
    set(refDb, itemToDb)
  }
 
export default sendStudentEditToFb;

export const sendCourseToStudentAndUpdate = (courseID, referenceURLCourse) => {
  const db = getDatabase()
  const refDb = ref(db, referenceURLCourse)
  set(refDb, {
    courseID: courseID,
    studentsAssigned: increment(1)
  })

}

