import React, {useState} from 'react'
import {Global, css } from '@emotion/css';
import { useRouter } from 'next/router';

import Layout from '@/components/layout/Layout';
import { Formulario , Campo , InputSubmit, Error} from '@/components/ui/Formulario';

import firebase from '@/firebase';

// validaciones
import useValidacion from '@/hooks/useValidacion';
import validarIniciarSesion from '@/validacion/validarIniciarSesion';



const STATE_INICIAL = {
  
  email: '',
  password:''
}

const Login = () =>{
  const [error, guardarError] = useState(false);
  const router = useRouter();

  const{ valores,errores,handleSubmit,handleChange, handlerBlur}= useValidacion(
      STATE_INICIAL, 
      validarIniciarSesion,
      iniciarSesion 
    )

    const { email, password} = valores
 

   async  function iniciarSesion(){
        try {
          const usuario = await firebase.login(email,password);
          console.log('logeado ', usuario)
          router.push('/');
        } catch (error) {
          console.log('error al autenticar el usuario ', error.message)
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
        >Inicial Session</h1>
        <Formulario
          onSubmit={handleSubmit}
          noValidate
        >
      
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
            value="Iniciar Session"/>
        </Formulario>
      </>
    </Layout>
  </div>)
}

export default Login;