import React from 'react'
import Layout from '@/components/layout/Layout';
import { Inter } from "next/font/google";
import useProductos from '@/hooks/useProductos';

const inter = Inter({ subsets: ["latin"] });
import DetallesProducto from '@/components/layout/DetallesProducto';

const Popular = () => {
  const {data} = useProductos('votos')
  

  return  (
    <div>
      <Layout>
      <div className='listado-productos'>
          <div className='contenedor'>
            <ul className='bg-white'>
                {data.map(producto => (
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
export default Popular;