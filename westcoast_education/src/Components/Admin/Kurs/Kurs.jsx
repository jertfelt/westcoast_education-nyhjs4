import { useParams } from "react-router-dom";

const Kurs = () => {
  const {id} = useParams()
  return ( 
  <section>
    <h1>{id}</h1>
  </section> );
}
 
export default Kurs;