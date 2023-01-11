import styled from "styled-components";
import { Line } from "../../Components/styling/Line";
import AllaKurser from "../../Components/AllaKurser/AllaKurser";

const Intro = styled.div`
min-height:50vh;
color: ${({ theme }) => theme.text};
padding:2rem;
display:flex;
flex-direction:column;
align-items:center;
img{
  max-width:100%;
}
@media screen and (max-width: 700px) {
  padding:1rem;}
h1{
  font-size:2em;
  @media screen and (max-width: 992px) {
    line-height:2rem;
  }
}
h3{
  color: ${({ theme }) => theme.highlight};
}
`
const TwoColumns = styled.div`
display:flex;
flex-direction: row;
gap: 2rem;
margin-top:1rem;
@media screen and (max-width: 700px) {
flex-direction:column;
gap:0.3rem;}
`

const Column = styled.div`
max-width:50%;
p{
  line-height:1.3rem;
}
@media screen and (max-width: 700px) {
  max-width:80%;}
`


const About = styled.div`
padding:2rem;
@media screen and (max-width: 700px) {
  padding:1rem;}
`

const HomePage = () => {

  return ( 
  <section data-testid="homepage">
  <Intro>
    <h1>Välkommen till ditt studieliv!</h1>
    <img src="https://habitatbroward.org/wp-content/uploads/2020/01/10-Benefits-Showing-Why-Education-Is-Important-to-Our-Society.jpg"
    alt="Education @ Westcoast"
    ></img>
    <TwoColumns>
      <Column>
      <h3>Vi har varit i utbildningsbranschen i snart 40 år.</h3>
      <p>
      <strong>WestCoast Education </strong> är ett utbildningsföretag som har sin placering på västkusten strax norr om Göteborg. 
      Vårt affärsmål är och har varit att tillhandahålla tekniska utbildningar inom IT-området.
      Vi har varit väldigt framgångsrika i alla år. 
        </p>
      </Column>
      <Column>
      <p>
      Vi har specialiserat oss på framförallt
      systemutvecklingsutbildningar inom webb och mobila lösningar.
      Vårt koncept har och är fortfarande att tillhandahålla klassrums utbildningar där elever och
      lärare möts. Vi erbjuder även distansutbildning där elever kan närvara via länk till klassrum
      där en lärare genomför lektionen.
        </p>
      </Column>
    </TwoColumns>
   </Intro>
  <Line/>
  <About 
  id="kurser" data-testid="kurserSection">
  <h2>Våra kurser:</h2>
  <AllaKurser/>
  </About>
  
  </section> );
}
 
export default HomePage;