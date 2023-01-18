import styled from "styled-components";

const Button = styled.input`
border-radius: 30px;
width:100px;
margin-top:1rem;
padding:1rem;
border:none;
font-family: Sofia Sans;
align-self:center;
font-weight:bold;
font-size:14px;
opacity: 0.8;
.enabled{
  opacity: 1;
  cursor:pointer;
}
`

export default Button