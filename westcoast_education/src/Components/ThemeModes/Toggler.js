import React from 'react'

import styled from "styled-components"

const Button = styled.button`
  background: ${({ theme }) => theme.buttonBackground};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.buttonText};
  font-family: Sofia Sans;
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
  &:hover,focus{
    background: ${({ theme }) => theme.accent};
  
}
`;

const Toggle = ({theme, toggleTheme }) => {
    return (
        <Button onClick={toggleTheme} 
        data-testid="toggleDarkMode"
        aria-pressed="false"
        >
          {theme === "light" ? (
            <>
          <span 
          className="button-icon" aria-hidden="true" 
          data-icon="&#9788;"></span>
          <span 
          className="button-text">Mörkt tema</span>
          </>
          ) :(
            <>
            <span 
            className="button-icon" aria-hidden="true" 
            data-icon="&#x263E;"></span>
            <span 
            className="button-text">Ljust tema</span>
            </>
          )}
        </Button>
    );
};

export default Toggle;