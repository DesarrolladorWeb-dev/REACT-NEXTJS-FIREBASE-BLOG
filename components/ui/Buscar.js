import React , {useState}from 'react'
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { useRouter } from 'next/router';


const InputText = styled.input`
    border: 1px solid var(--gris3);
    padding:  1rem;
    min-width: 300px;
`
const InputSubmit = styled.button`
    height: 3rem;
    width: 3rem;
    display: block;
    background-size: 4rem;
    background-image: url('/static/img/buscar.png');
    background-repeat: no-repeat;
    position: absolute;
    right: 1rem;
    top: 1px;
    background-color: white;
    border: none;
    text-indent: -9999px;

    &:hover{
        cursor: pointer;
    }

`


const Buscar = () => {
    const [busqueda, guardarBusqueda] = useState('')
    const router = useRouter();

const buscarProducto = e => {
    e.preventDefault();
    if(busqueda.trim() == '') return ;
    // redireccionar a /buscar
    router.push({
        pathname: '/buscar',
        query:{ q: busqueda}
    })

}

    return ( 
        <form 
        className={css`
            position: relative; 
        `}
        onSubmit={buscarProducto}
        > 
            <InputText  
                type="text"
                placeholder='Buscar Productos'
                onChange={e => guardarBusqueda(e.target.value)}
                />
                <InputSubmit type="submit">Buscar</InputSubmit>
                
        </form>
     );
}
 
export default Buscar;