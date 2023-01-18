import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch(url){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    (
      async function(){
        try{
          setLoading(true)
          const res= await axios.get(url)
          setData(res.data)
        }catch(err){
          setError(err)
        }finally{
          setLoading(false)
        }
      }
    )()
  },[url])

  return {data, error, loading}
}