import React, {useState , useContext} from 'react'
import {Global, css } from '@emotion/css';
import { useRouter } from 'next/router';
import FileUploader from 'react-firebase-file-uploader'

import Layout from '@/components/layout/Layout';
import { Formulario , Campo , InputSubmit, Error} from '@/components/ui/Formulario';

import firebase from '@/firebase';
import {FirebaseContext} from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
// validaciones
import useValidacion from '@/hooks/useValidacion';
import validarCrearProducto from '@/validacion/validarCrearProducto';

import { useStorage } from 'react-firebase-hooks/storage';

import Error404 from '@/components/layout/404';

 
// Nuestro state inicia
const STATE_INICIAL = {
  nombre: '',
  empresa: '',
  // imagen: '',
  url: '',
  descripcion: '',
}
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const NuevoProducto = () =>  {
  // State de las imagenes 
  // const [nombreimagen, guardarNombre] = useState('');
  // const [subiendo, guardarSubiendo] = useState(false);
  // const [ progreso, guardarProgreso ] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState(null);


  const [error, guardarError] = useState(false);
  const router = useRouter();

  const{ valores,errores,handleSubmit,handleChange, handlerBlur}= useValidacion(
      STATE_INICIAL, 
      validarCrearProducto,
      crearProducto 
    )

    const {nombre , empresa, imagen, url, descripcion} = valores
    
    // Cntext con las operaciones crud de firebase
    const {usuario} = useContext(FirebaseContext);

    // console.log(usuario)

  async function crearProducto(){
    // si el usuario no esta auitenticado llevar al login
    if(!usuario){
      return  router.push('/login')
    }
    // crear el objeto de nuevo producto
    const result = await firebase.uploadFile(urlimagen)
    // const { } = imagenData 
    console.log(result)

    const producto = {
      nombre,
      empresa,
      url,
      imagen : result,
      descripcion,
      votos: 0,
      comentarios: [],
      creado:Date.now(),
      creador : {
        id: usuario.uid,
        nombre: usuario.email
      },
      haVotado:[]
    }

     try {
        console.log(producto)

        const docRef = await addDoc(collection(firebase.db, 'productos'), producto);
        console.log('Producto agregado con ID: ', docRef.id);
        router.push('/')

    } catch (error) {
        console.error('Error al agregar producto: ', error);
    }

  }



//   const handleUploadStart = () => {
//     guardarProgreso(0);
//     guardarSubiendo(true);
// }

// const handleProgress = progreso => guardarProgreso({ progreso });

// const handleUploadError = error => {
//     guardarSubiendo(error);
//     console.error(error);
// };

// const handleUploadSuccess = nombre => {
//     guardarProgreso(100);
//     guardarSubiendo(false);
//     guardarNombre(nombre)
//     firebase
//         .storage
//         .ref("productos")
//         .child(nombre)
//         .getDownloadURL()
//         .then(url => {
//           console.log(url);
//           guardarUrlImagen(url);
//         } );
// };

// console.log(firebase.storage)



  return (
  <div>
    <Layout> 
      {!usuario ? <Error404/> : (
          <>
          <h1
            className={css`
              text-align: center;
              margin-top: 5rem;
             
            `}
          >Nuevo Producto</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <fieldset>
                <legend>Informacion General</legend>
  
            <Campo>
              <label htmlFor='nombre'>Nombre</label>
              <input 
                type="text" 
                id='nombre' 
                placeholder='Nombre del Producto' 
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handlerBlur}
                />
                
            </Campo>
            {errores.nombre && <Error>{errores.nombre}</Error>}
            <Campo>
              <label htmlFor='empresa'>Empresa</label>
              <input 
                type="text" 
                id='empresa' 
                placeholder='Nombre Empresa o Compañia' 
                name="empresa"
                value={empresa}
                onChange={handleChange}
                onBlur={handlerBlur}
                />
                
            </Campo>
            {errores.empresa && <Error>{errores.empresa}</Error>}
            <Campo>
              <label htmlFor='imagen'>Imagen</label>
              <input 
                  // accept='image/*'
                  type='file'
                  id='imagen' 
                  name='imagen'
                  onChange={e => guardarUrlImagen(e.target.files[0])}
                  // randomizeFilename
                  // storageRef={firebase.storage.ref('productos')}
                  // storageRef = { useStorage(firebase.storage, 'productos')}
                  // onUploadStart={handleUploadStart}
                  // onUploadError={handleUploadError}
                  // onUploadSuccess={handleUploadSuccess}
                  // onProgress={handleProgress}
              />
  
  
          
                
            </Campo>
            <Campo>
              <label htmlFor='url'>URL</label>
              <input 
                type="url" 
                id='url' 
                name="url"
                placeholder = 'URL de tu Producto'
                value={url}
                onChange={handleChange}
                onBlur={handlerBlur}
                />
                
            </Campo>
            {errores.url && <Error>{errores.url}</Error>}
            </fieldset>
            <fieldset>
              <legend>Sobre tu Producto</legend>
              <Campo>
              <label htmlFor='descripcion'>Descripcion</label>
              <textarea 
                id='descripcion' 
                name="descripcion"
                value={descripcion}
                onChange={handleChange} 
                onBlur={handlerBlur}
                />
                
            </Campo>
            {errores.descripcion && <Error>{errores.descripcion}</Error>}
            </fieldset>
            {error && <Error>{error}</Error>}
            <InputSubmit 
              type="submit" 
              value="Crear Producto"/>
          </Formulario>
        </>

      ) }

    
    </Layout>
  </div>)
}

export default NuevoProducto;