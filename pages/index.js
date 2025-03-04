import React  from 'react'
import Layout from '@/components/layout/Layout';

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import useProductos from '@/hooks/useProductos'
import DetallesProducto from '@/components/layout/DetallesProducto';

const Home = () => {
  const {data} = useProductos('creado') 

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
export default Home;