const useDateconverter = (date) => {
  
  let trim = date.slice(5).replace("-", "/")
  let newDate = ""
  if(trim.substring(0,1) === "0"){
    trim = trim.slice(1);
    let splitString = trim.split("")
    let splitted = ""
    if(splitString[2] === "0"){
      splitted = splitString[3]+splitString[1]+splitString[0]
    }
    else{
      splitted = splitString[2]+splitString[3]+splitString[1]+splitString[0]
    }
    newDate = splitted;
  }
  else{
    let splitString = trim.split("")
    let splitted =""
    if(splitString[1] === "0"){
      splitted = splitString[3]+splitString[4]+splitString[2]+splitString[0]
    }
    else{
      splitted = splitString[3]+splitString[4]+splitString[2]+splitString[1]+splitString[0]
    }
    newDate = splitted;
  }
  // const check = newDate.at(-1)
  
  // const replace = (string, index, replacement) => {
  //   return string.substring(0, index) + replacement + string.substring(index +replacement.length)
  // }
 
  // console.log(newDate, replace(newDate, 2, "hej"))
  // let newestDate = ""
  // switch(Number(check)){
  //   case 1:
  //     return newestDate = replace(newDate, 2, "JAN")
      
  //   case 2:
  //     return newestDate = replace(newDate, 2, "FEB")
      
  //   case 3:
  //     return newestDate = replace(newDate, 2, "MAR")
      
  //   case 4:
  //    return newestDate = replace(newDate, 2, "APR")
  
  //   case 5:
  //    return newestDate = replace(newDate, 2, "MAJ")
  
  //   case 6:
  //     return newestDate = replace(newDate, 2, "JUN")
  //     ;
  //   case 7:
  //     return newestDate = replace(newDate, 2, "JUL")
  //     ;
  //   case 8:
  //     return newestDate = replace(newDate, 2, "AUG")
  //     ;
  //   case 9:
  //     return newestDate = replace(newDate, 2, "SEP")
  //     ;
  //   case 10:
  //     return  newestDate = replace(newDate, 3, "OKT")
  //     ; 
  //   case 11:
  //     return newestDate = replace(newDate, 3, "NOV")
  //     ;
  //   case 12:
  //     return newestDate = replace(newDate, 3, "DEC")
  //     ;
  //   default:
  //     console.log("no date!")
  // }
  
 
    return newDate
  
}
 
export default useDateconverter;