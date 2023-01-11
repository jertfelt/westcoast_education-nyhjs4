import { useEffect, useState } from "react";
import styled from "styled-components";

const AllaKurser = () => {
  const [courses, setCourses] = useState([])
  
  return ( 
  <div data-testid="allCourses">
    <h2>Kurser 2023</h2>
    <p>Här följer kurser vi erbjuder under 2023. Denna lista kan komma att uppdateras under början på året.</p>
    <div>
      <ul>
        
      </ul>
    </div>
  </div> );
}

export default AllaKurser;