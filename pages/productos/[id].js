import React , { useEffect, useContext , useState}from 'react'
import { useRouter } from 'next/router'
import { doc, getDoc ,updateDoc ,deleteDoc } from 'firebase/firestore';

import Layout from '@/components/layout/Layout';
import { FirebaseContext } from '@/firebase';

import { formatDistanceToNow } from 'date-fns';

import Error404 from '@/components/layout/404';
import { css } from '@emotion/css';
import styled from '@emotion/styled';

import { Campo , InputSubmit } from '@/components/ui/Formulario';
import Boton from '@/components/ui/Boton';

const ContenedorProducto = styled.div`
@media (min-width: 768px) {
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 2rem;
  
}`
const CreadorProducto = styled.p`
  padding: .5rem 2rem;
  background-color: #DA552F;
  color: #fff;
  text-transform: uppercase;
  font-weight:bold;
  display:inline-block;
  text-align:center;
  
`
const Producto = () => {
    // state del componente 
    const [producto, guardarProducto] = useState({})
    const [error, guardarError] = useState(false)
    const [comentario , guardarComentario] = useState({})
    const [consultarDB, guardarConsultarDB] = useState(true)


    //Routing para obtener el id actual
    const router = useRouter();
    const {query: {id}} = router;

    // context de firebase - que viene desde el app
    const {firebase, usuario} = useContext(FirebaseContext)

    useEffect(() => {
      if(id && consultarDB){
        const obtenerProducto = async () => {
            
            const productoRef = doc(firebase.db, 'productos', id);
            const productoSnapshot = await getDoc(productoRef);
          
            if (productoSnapshot.exists()) {
              const producto = productoSnapshot.data();
              guardarProducto(producto);
              guardarConsultarDB(false);
            } else {
              guardarError(true)
              guardarConsultarDB(true);

            }
        }
        obtenerProducto()
      }
    }, [id])
    if(Object.keys(producto).length === 0 && !error) return 'Cargando...'; //nos dara un pequeño Spinner

    const {creador, comentarios ,creado, descripcion, empresa,nombre,url,imagen,votos,haVotado } =producto
    // Administrar y validar los votos 
    const  votarProducto =  async () => {
        if(!usuario){
          return router.push('/login')
        }
        //obtener y sumar un nuevo voto
        const nuevoTotal = votos + 1
        // Verificar si el usuario actual ha votado
        if(haVotado.includes(usuario.uid)) return ;

        // guardar el id del usuario que ha votado 
        const nuevoHaVotado = [...haVotado, usuario.uid]

        // Actualizar en la base de datos
        // const ActId = doc(firebase.db, 'productos', id).update({votos: nuevoTotal});
        try {
          await updateDoc(doc(firebase.db, 'productos', id), {
            votos: nuevoTotal,
            haVotado: nuevoHaVotado
          });
          console.log("Documento actualizado con éxito");
        } catch (error) { 
          console.error("Error al actualizar el documento:", error);
        }
        // Actualizar en el state
        guardarProducto({
          ...producto,
          votos: nuevoTotal
        })
        guardarConsultarDB(true) // hay un boto entonces por lo tanto consultar a la BD
      }

    // Identifca si el comentario es del creador del producto
    const esCreador = id => {
      if(creador.id == id){
        return true;

      }
    }


// Funciones para crear Comentraios 
const comentarioChange = e => {
  guardarComentario({
    ...comentario, 
    [e.target.name] : e.target.value
  })
}
const agregarComentario  = async e => {
  e.preventDefault();
  if(!usuario){
    return router.push('/login')
  }
  // informacion extra el comentraio 


  comentario.usuarioId = usuario.uid;
  comentario.usuarioNombre = usuario.email;
  // Tomar copia de comentario y agregarlos al arreglo 
  const nuevosComentarios = [...comentarios, comentario]
  // Actualizar la DB
  try {
    await updateDoc(doc(firebase.db, 'productos', id), {
      comentarios: nuevosComentarios,
    });
    console.log("Documento actualizado con éxito");
  } catch (error) { 
    console.error("Error al actualizar el documento:", error);
  }
  // actualizar el state 
  guardarProducto({
    ...producto,
    comentarios: nuevosComentarios
  })
  guardarConsultarDB(true) // hay un COMENTARIO entonces por lo tanto consultar a la BD

}

// funcuion que revisa que el creador del producto sea el mismo que esta autenticado
const puedeBorrar = () => {
  if(!usuario) return false;
  if(creador.id === usuario.uid){
    return true
  }
}

// eliminar Porducto de la bd
const eliminarProducto = async () => {
  if(!usuario){
    return router.push('/login')
  }

  if(creador.id !== usuario.uid){
    return router.push('/')
  }
  try{
    deleteDoc
    await deleteDoc(doc(firebase.db, 'productos', id))
    console.log("Documento actualizado con éxito");
    router.push('/')
  }catch(error){
    console.log(error)
  }
 

}

    return (

        <Layout>
            <>
            {error ? <Error404/> : (
              <div className='contenedor '> 
              <h1 
                className={css`
                text-align: center;
                margin-top: 5rem;
                `
                }
              >{nombre}</h1>
                <ContenedorProducto>
                  <div>
                  <p>Publicado hace: {formatDistanceToNow(new Date(creado))}</p>
                  <p>Publicado por:{creador.nombre} de {empresa} </p>

                  <img src={imagen}/>
                  <p>{descripcion}</p>
                {
                  usuario &&(
                    <>
                        <h2>Agrega tu comentario</h2>
                        <form
                        onSubmit={agregarComentario}
                        >
                          <Campo>
                            <input 
                              type="text"  
                              name="mensaje" 
                              onChange={comentarioChange}
                            />
                          </Campo>
                          <InputSubmit
                            type='submit'
                            value='Agregar Comentario'
                          />
                          
                        </form>
                      </>
                  )

                }
                  <h2 
                  className={css`
                    margin: 2rem 0;
                  `}
                  >Comentario</h2>

                  {comentarios.length === 0 ? 'Aun no hay comentarios ' : (
                     <ul>
                      {comentarios.map((comentario, i) => (
                    <li
                          key={`${comentario.usuarioId} - ${i} `}
                          className={css`
                            border: 1px solid #e1e1e1;
                            padding: 2rem;
                            `
                          }
                    >
                      <p>{comentario.mensaje}</p>
                      <p>Escrito por :
                        <span className={css`
                          font-weight: bold;
                        `}> {''}{comentario.usuarioNombre}</span>
                      </p>
                      {esCreador(comentario.usuarioId) &&
                      <CreadorProducto>Es Creador </CreadorProducto> }

                    </li>
                  ))}
                  </ul>
                  )}
                 
                
                  </div>
                  <aside>
                    <Boton
                      target='_blank'
                      bgColor="true"
                      href={url}
                    >
                    Visitar Url</Boton>

                  <div
                    className={css`
                      margin-top: 5rem;
                    `}
                  >
                      <p className={css`
                        text-align: center;
                        ` }
                        >{votos} Votos</p>
                      {
                       usuario && (
                          <Boton
                          onClick={votarProducto}
                          >
                          Votar
                        </Boton>
                       ) 
                      }
                  </div>

                  </aside> 
                </ContenedorProducto>
                  {puedeBorrar() && 
                    <Boton
                      onClick={eliminarProducto}
                    >Eliminar Producto</Boton>
                  }

              </div>

            ) }
            

            </>

        </Layout>
        
         
         );
}

export default Producto;