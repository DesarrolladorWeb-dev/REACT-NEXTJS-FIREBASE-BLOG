import React, {useEffect, useState} from 'react'
import Layout from '@/components/layout/Layout';
import { useRouter } from 'next/router';
import useProductos from '@/hooks/useProductos'
import DetallesProducto from '@/components/layout/DetallesProducto';

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const Buscar = () => {
  const router = useRouter();
 const {query : {q}} = router;
  // todos los productos
  const {data} = useProductos('creado') 
  const [resultado, guardarResultado]= useState([]);
  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filtro = data.filter(producto => {
      return(
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    })
    guardarResultado(filtro)
  }, [q,data]);

  

  return (
    <div>
      <Layout>
      <div className='listado-productos'>
          <div className='contenedor'>
            <ul className='bg-white'>
                {resultado.map(producto => (
                  <DetallesProducto
                    key={producto.id}
                    producto = {producto}

                  />

                ))}
              
            </ul>
            
          </div>
      </div>
      </Layout>
    </div>
  )
}
 
export default Buscar;