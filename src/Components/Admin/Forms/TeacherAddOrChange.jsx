import { ButtonContainerOutsideForm, FormInstructions} from "../../StylingElements/Form/Form";
import ValidationModal from "../../ui/Modal/ValidationModal";
import Modal from "../../ui/Modal/Modal";
import { useFirebase } from "../../utils/useFirebase";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState,} from "react";
import { getDatabase, ref, set,} from "firebase/database"
import styled from "styled-components";
import { Line } from "../../StylingElements/Line/Line";


const Competences = styled.div`
display:flex;
li{
  margin-top:-8px;
  list-style:none;
  display:flex;
  flex-direction:row;
  align-items:center;
  gap:1rem;
  justify-content: center;
  button{
    color: ${({ theme }) => theme.toggleBorder};
    background : transparent;
    margin-top:-1px;
  }
}
`

const TeacherAddOrChange = ({typeOfForm, item, title, teachersDB, coursesDB, competencesDB, onClick }) => {
  const navigate = useNavigate()
  const [data, setData] = useState("")

  useEffect(() => {
    if(typeOfForm === "registerNew"){
      setData(teachersDB)
    }
    if(typeOfForm === "changeTeacher"){
      setData(competencesDB)
    }
  },[typeOfForm, competencesDB, teachersDB])
  
  const [chosenCompetences, setCompetences] = useState([])
  const [teacherID, setTeacherID] = useState(null)
  const [allaKurser, setKurser] = useState([])
  const [selectedOption, setSelected] = useState([])
  const [defaultPersonalID, setDefaultPID] = useState("")
  const [defaultEmail, setDefaultEmail] = useState("")
  const [defaultLastName, setDefaultLastName] = useState("")
  const [defaultMobileNo, setDefaultMobileNo] = useState("")
  const [defaultFirstName, setDefaultFirstName] = useState("")
  
  useEffect(() => {
    if(typeOfForm === "registerNew"){
        if(data){
          setTeacherID(data.length)
          setKurser(item)
          setDefaultPID("8905169899")
          setDefaultEmail("email@westcoast.se")
          setDefaultFirstName("Tilltalsnamn")
          setDefaultLastName("Efternamn")
          setDefaultMobileNo("070000001")
        }      
    }
    if(typeOfForm === "changeTeacher"){
      if(data){
        setKurser(data.map(item => item))
        setSelected(item.competences)
        setTeacherID(item.id)
        setDefaultPID(item.personalID)
        setDefaultEmail(item.email)
        setDefaultFirstName(item.firstName)
        setDefaultLastName(item.lastName)
        setDefaultMobileNo(item.mobileNo)
      }
    }
  },[data,typeOfForm,item])

  //form behaviours
  const [instructions, setInstructions] = useState(false)
  const [infoMessage, setInfoMessage] = useState("")
  const [youDisobeyedInstruction, setYouDisobeyedInstruction] = useState(false)
  const [instructionsKompetens, setInstructionsKompetens] = useState(false)
  const [moreThanOneCompetence, setMoreThanOneCompetence] = useState(null)
  const [disabledPid, setDisabledPid] = useState(false)
  const [disabledButton, setDisabledButton] = useState(true)
 //modals
  const [showModal2, setShowModal2] = useState(false)
  const [showModal, setShowModal] = useState(false)
  
  //ref:
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const personalIDRef = useRef()
  const emailRef =  useRef()
  const mobileNoRef = useRef()

  //database functions:

  const sendEditToFirebase = (firstName, 
    lastName, 
    personalID, 
    email, 
    mobileNo, 
    competences, 
    ID) => {
    const db = getDatabase()
    
    set(ref(db, "/teachers/" + ID ),{
      competences: competences,
      id: ID,
      firstName : firstName,
      lastName: lastName,
      mobileNo: mobileNo,
      email: email,
      personalID: personalID,
    }).then(setShowModal(true))
  }


  
  const confirmSave =(e) =>{
    e.preventDefault()
    if(firstNameRef.current.value === "Tilltalsnamn" && lastNameRef.current.value === "Efternamn"){
      setShowModal2(true)
    }
    else if(selectedOption.length === 0){
      setShowModal2(true)
    }
    else{
      const firstName = firstNameRef.current.value 
      const lastName = lastNameRef.current.value
      const personalID = personalIDRef.current.value
      const email = emailRef.current.value
      const mobileNo = mobileNoRef.current.value
      const competences = selectedOption
      const ID = teacherID

      sendEditToFirebase(
        firstName,
        lastName, 
        personalID,
        email,
        mobileNo,
        competences,
        ID )
      }
  }


  const deleteTeacher = (e) =>{
    e.preventDefault()
    const db = getDatabase()

    set(ref(db, "/teachers/" + teacherID),{
      status: "DELETED",
      id: teacherID,})
     
      setShowModal(false)
     navigate("/")
  
  }

   
  
  //form functions
  const instructionsUnclear=(e) => {
    if(e.target.id === "pIDChangeInput"){
      setInfoMessage("Du får bara mata in siffror! 10- 12 stycken.")
      setInstructions(true)
    }
    if(e.target.id ==="mobileNoChangeInput"){
      setInfoMessage("Du behöver inte skriva landsnummer")
      setInstructions(true)
    }
  }

  const secondChanceInput = () => {
    personalIDRef.current.value = ""
    setInstructions(false)
    setYouDisobeyedInstruction(false)
    setDisabledPid(false)
  }

  const checkNumber = (e) =>{
    checkForChange()
    if(parseInt(e.target.value)){
      setDisabledPid(false)
    }
    else{
      setDisabledPid(true)
      setYouDisobeyedInstruction(true)
    }
  }

  const checkForChange = () => {
  
    const firstName = firstNameRef.current.value 
    const lastName = lastNameRef.current.value
    const personalID = personalIDRef.current.value
    const email = emailRef.current.value
    const mobileNo = mobileNoRef.current.value
    const competences = chosenCompetences
    const ID = teacherID
    
    if(competences !== null || firstName !== "" ||lastName !== "" || email !== "" || ID !== null || mobileNo !== "" || personalID !==  ""){
      if(firstName !== "Tilltalsnamn" || lastName !== "Efternamn"){
        setDisabledButton(false)
      }
    }
    else{
      setDisabledButton(true)
    }
  }

   //Competences select

  const handleSelectOption = (e) => {
    setSelected(prev => [...prev, e.target.value])
    setCompetences(prev => [...prev, e.target.value])   
    checkForChange()
  }
  const deleteSelectedCourse = (e) => {
    if(selectedOption.length > 1){
      let newList = selectedOption.filter(item => item !== e.target.value)
      setSelected(newList)
      setCompetences(newList)
    }
    else{
      setInfoMessage("Du måste ha minst en kompetens!")
      setInstructionsKompetens(true)
    }
  }

  useEffect(() => {
    if(selectedOption.length === 1){
      setMoreThanOneCompetence(false)
    }
    else if(selectedOption.length > 1){
      setMoreThanOneCompetence(true)
    }
    else {
      setMoreThanOneCompetence(true)
    }
  },[selectedOption])

  const confirmDelete = (e) => {
    e.preventDefault()
    setShowModal2(true)
  }

  return (
    <>
    
  <FormInstructions
  onSubmit={confirmSave}>

  {!teachersDB && !competencesDB ? 
      <h1>Laddar...</h1>: <>
      
      
      {showModal && <>
      {typeOfForm === "registerNew" ? ( 
      <Modal
        title="Välkommen!"
        message="Nu är läraren registrerad."
        onClick={() => navigate("/admin")}/>):(
      <Modal
        title="Nu är läraren borta ur systemet."
        message="Nu är läraren borta ur systemet."
        onClick={() => setShowModal(false)}/>
      ) }</>}

      {showModal2 && <>
      {typeOfForm === "registerNew" ? (
      <Modal 
        title="Fel!"
        message="Du har glömt att fylla i något av fälten."
        onClick={() => setShowModal2(false)}/>
      ):(
      <ValidationModal
        title="Är du säker?"
        message="Det går ej att ångra."
        onClickYes={() => deleteTeacher}
        onClick={() => setShowModal2(false)}
      />
      )}
      </>}

      <h1>{title}</h1>
    <div className="Row">
      <label 
            htmlFor="firstNameInput">
            Tilltalsnamn:
      </label>
      <input 
            id="firstNameInput"
            type="text"
            ref={firstNameRef}
            defaultValue={defaultFirstName}
            onChange={() => checkForChange()}
      />
      </div>
      <div className="Row">
      <label 
            htmlFor="lastNameInput">
            Efternamn:
      </label>
      <input 
            id="lastNameInput"
            type="text"
            ref={lastNameRef}
            defaultValue={defaultLastName}
            onChange={() => checkForChange()}
      />
      </div>
      <div className="Row">
      <label 
            htmlFor="emailInput">
            Email:
      </label>
      <input 
            id="emailInput"
            type="email"
            ref={emailRef}
            defaultValue={defaultEmail}
            onChange={() => checkForChange()}
      />
      </div>
      <div className="Row">
      <label 
            htmlFor="pIDInput">
            Personnummer:
      </label>
      <input 
            id="pIDInput"
            type="text"
            maxLength={12}
            onChange={(e) => checkNumber(e)}
            onFocus={(e) => instructionsUnclear(e)}
            onBlur={() => setInstructions(false)}
            ref={personalIDRef}
            defaultValue={defaultPersonalID}
            disabled={disabledPid ? true : false}
            
      />
      </div>

      {instructions && <>
      <p>{infoMessage}</p>
      {youDisobeyedInstruction && 
      <button onClick={secondChanceInput}>
        OK!</button>}
      </>}
      <div className="Row">
      <label 
            htmlFor="mobileNoInput">
            Mobilnummer:
      </label>
      <input 
            id="mobileNoInput"
            type="tel"
            onChange={() => checkForChange()}
            onFocus={(e) => instructionsUnclear(e)}
            onBlur={() => setInstructions(false)}
            ref={mobileNoRef}
            defaultValue={defaultMobileNo}
            disabled={disabledPid ? true : false}
      />
      </div>
      
      <div className="Row">
        <label htmlFor="kompetenser">
          Lägg till kompetenser:
        </label>
        <select 
        id="kompetenser"
        data-testid="kompetensSelect"
        defaultValue="Välj"
        onChange = {(e) => handleSelectOption(e)}
        >
          <option 
          value={"Välj:"} 
          data-testid="optionDefault"
          label={"Välj:"}/>
          {selectedOption !== undefined && allaKurser.map((kitem, i) =>{if (!selectedOption.includes(kitem)){
            return(
              <option key={`${kitem}-${i}`}
              value={kitem}>
              {kitem}
              </option>
            )
          }
          else{
            return(<></>)
          }
          })} 
        </select>
        </div>
        <div className="Kompetenser">
        <h3>Valda kompetenser:</h3>
        {instructionsKompetens && <p>{infoMessage}</p>}
        {selectedOption.length === 0 && <p>Du måste välja minst en kurs</p>}
        {selectedOption.map(item => (
            <Competences 
            key={`${item}--${item}`}>
            <li>
              <p>{item}</p>
            {moreThanOneCompetence && <>
            <button value={item}
            onClick={deleteSelectedCourse}>
              Ta bort</button>
            </>}
            </li>
          </Competences>
          ))}
        </div>
          
        <input 
            className="centered"
            type="submit"
            value="Spara"
            disabled={disabledButton ? true :false}
            />
        </>
  }
     
  </FormInstructions>
  
  <ButtonContainerOutsideForm>
    {typeOfForm === "registerNew" ? (
          <button onClick={() => navigate(-1)}>
            Gå tillbaka</button>):(
            <div className="Row">
            <button 
            onClick={onClick}>
            Stäng formulär 
          </button> 
          <button onClick={(e)=>confirmDelete(e)}>
            Avskeda lärare
          </button>
          </div> 
      )}
  </ButtonContainerOutsideForm>
  </>);
}
 
export default TeacherAddOrChange