import { useEffect, useState } from "react";

export function useDates(){
  const [year, setYear] = useState(null)
  const [nextYear, setNextYear] = useState(null)

  useEffect(() => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    today =  yyyy + '-' + mm + '-' + dd;
    setYear(today)
    let nyyy = new Date().getFullYear() +1
    let nextyearToday = String(nyyy) + "-" + mm + "-" + dd;
    setNextYear(nextyearToday)
  }, [])
  return {year, nextYear}
}