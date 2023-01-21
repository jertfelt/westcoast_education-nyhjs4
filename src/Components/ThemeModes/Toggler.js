import styled from "styled-components"

const Button = styled.button`
  background:transparent;
  border:none;
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  min-width:40px;
  cursor: pointer;
  font-size:1rem;
  padding: 0.6rem;
  display: flex;
  flex-direction: row-reverse; 
  gap: 4px;
  align-items:center;
  [data-icon]:before {
    font-family: 'ussfont';
    content: attr(data-icon);
    speak: none;
    font-weight: normal;
    line-height: 1.2rem;
    -webkit-font-smoothing: antialiased;
  }
  &:hover,&:focus, &:active{
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.body};
}
`;

const Toggle = ({theme, toggleTheme }) => {
    return (
        <Button 
        onClick={toggleTheme} 
        data-testid="toggleDarkMode"
        aria-pressed="false">
          {theme === "light" ? (
            <>
          <span 
          aria-hidden="true" 
          data-icon="&#x263E;"/>
          <span>
            Mörkt tema</span>
          </>
          ):(
            <>
            <span 
            aria-hidden="true" 
            data-icon=" &#9788;"/>
            <span>
              Ljust tema</span>
            </>
          )}
        </Button>
    );
};

export default Toggle;