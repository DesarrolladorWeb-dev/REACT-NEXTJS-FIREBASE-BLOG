import React, {useState} from 'react'
import {Global, css } from '@emotion/css';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/Layout';
import { Formulario , Campo , InputSubmit, Error} from '@/components/ui/Formulario';

import firebase from '@/firebase';

// validaciones
import useValidacion from '@/hooks/useValidacion';
import validarCrearCuenta from '@/validacion/validarCrearCuenta';

import { Inter } from "next/font/google";

// Nuestro state inicia
const STATE_INICIAL = {
  nombre: '',
  email: '',
  password:''
}
const inter = Inter({ subsets: ["latin"] });

const CrearCuenta = () => {
  const [error, guardarError] = useState(false);
  const router = useRouter();

  const{ valores,errores,handleSubmit,handleChange, handlerBlur}= useValidacion(
      STATE_INICIAL, 
      validarCrearCuenta,
      crearCuenta 
    )

    const {nombre , email, password} = valores
 

  async function crearCuenta(){

    try {

    const usuarioRes = await firebase.registrar(nombre, email, password);
    console.log('Cuenta creada:', usuarioRes.user);
    router.push('/');

    } catch (error) {
      console.log('error al crear el usuario ', error.message)
      guardarError(error.message)
    }

  }


  return (
  <div>
    <Layout> 
      <>
        <h1
          className={css`
            text-align: center;
            margin-top: 5rem;
           
          `}
        >Crear Cuenta</h1>
        <Formulario
          onSubmit={handleSubmit}
          noValidate
        >
          <Campo>
            <label htmlFor='nombre'>Nombre</label>
            <input 
              type="text" 
              id='nombre' 
              placeholder='Tu nombre' 
              name="nombre"
              value={nombre}
              onChange={handleChange}
              onBlur={handlerBlur}
              />
              
          </Campo>
          {errores.nombre && <Error>{errores.nombre}</Error>}
          <Campo>
            <label htmlFor='email'>Email</label>
            <input 
              type="email" 
              id='email' 
              placeholder='Tu Email' 
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handlerBlur}

              />
          </Campo>
          {errores.email && <Error>{errores.email}</Error>}
          <Campo>
            <label htmlFor='password'>Password</label>
            <input 
              type="password" 
              id='password' 
              placeholder='Tu Password' 
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handlerBlur}

              />
          </Campo>
          {errores.password && <Error>{errores.password}</Error>}
          {error && <Error>{error}</Error>}
          <InputSubmit 
            type="submit" 
            value="Crear Cuenta"/>
        </Formulario>
      </>
    </Layout>
  </div>)
}
export default CrearCuenta;