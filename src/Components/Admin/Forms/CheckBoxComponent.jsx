import styled from "styled-components";
const Checkbox= styled.div`
display:flex;
flex-direction:row;
align-items:flex-end;
justify-content:flex-end;
`

const CheckBoxComponent = ({key, id, item, isChecked}) => {
  return ( 
  <Checkbox key={key}>
    <label htmlFor={id}>
      {item}</label>
      <input 
      type="checkbox"
      id={id}
      name={id}
      checked = {isChecked}
      />
  </Checkbox>  );
}
 
export default CheckBoxComponent;