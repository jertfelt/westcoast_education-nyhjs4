import styled from "styled-components";
const Checkbox= styled.div`
display:flex;
flex-direction:row;
align-items:flex-end;
justify-content:flex-end;
`

const CheckBoxComponent = ({ id, item, isChecked, onChange}) => {
  return ( 
  <Checkbox key={id}>
    <label htmlFor={id}>
      {item}</label>
      <input 
      type="checkbox"
      id={id}
      
      name={id}
      checked = {isChecked}
      onChange={onChange}
      />
  </Checkbox>  );
}
 
export default CheckBoxComponent;