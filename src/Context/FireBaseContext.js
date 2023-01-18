import { useContext, createContext } from "react";

export const FirebaseContext = createContext()

export const useFirebase = () => {
  const firebaseContext = useContext(FirebaseContext)
  if( firebaseContext === undefined){
    throw new Error(
      "useFirebase must be used within a FirebaseCotnext.Provider"
    )
  }
  return firebaseContext
}