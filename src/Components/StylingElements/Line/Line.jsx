import styled from "styled-components";

export const Line = styled.hr`
color: ${({ theme }) => theme.accent};
width:100%;`

export const LineMain = styled(Line)`
color: ${({ theme }) => theme.accent};
width:100%;
@media (max-width:600px){
  position: absolute;
	position: absolute ;
	width: 1px ;
	height: 1px ;
	padding: 0 ;
	margin: -1px ;
	overflow: hidden ;
	clip: rect(0,0,0,0) ;
	white-space: nowrap ;
	border: 0 ;
}
`