import React, {useState, useEffect, useContext} from 'react'
import { FirebaseContext } from '@/firebase'
import {query, collection, addDoc, doc , getDocs, orderBy} from 'firebase/firestore';


const useProductos = orden => {
    const {firebase} = useContext(FirebaseContext)
const [data , setData] =  useState([])

useEffect(() => {
  const obtenerProductos = async () => {
    // console.log(firebase.db);
    const val = doc(firebase.db,'/' )  
    const collectionVal = collection(val, "productos")
    const getValue = await getDocs(query(collectionVal, orderBy(orden, "desc"))) 
    setData(getValue.docs.map((doc) => ({...doc.data(),id:doc.id})))
    
  }
  obtenerProductos()

  },[]);
  return {
    data
  }
}
export default useProductos