import React, {useContext} from 'react'
import Link from 'next/link';
import styled from '@emotion/styled';
import {Global, css } from '@emotion/css';

import Buscar from '../ui/Buscar';
import Navegacion from './Navegacion';
import Boton from '../ui/Boton';

import { FirebaseContext } from '@/firebase';

const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    @media (min-width:768px){
        display: flex;
        justify-content: space-between;
    }
`
const Logo = styled.p`
    color: var(--naranja);
    font-size: 4rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab' , serif;
    margin: 0rem 2rem 0rem 0rem;
`;
const HeaderContainer =styled.div`
    border-bottom: 2px solid var(--gris3);
    padding: 2rem 0 ;
    `
const Header = () => {

    const {usuario, firebase} = useContext(FirebaseContext);
    

    return ( 
        <HeaderContainer>
            <ContenedorHeader>
            <div
                className={css`
                    display: flex;
                    align-items: center;

                `}
            
            >
                    <Link href="/">
                        <Logo>P</Logo>
                    </Link>
                    <Buscar/>

                    <Navegacion/>
                </div>
                <div
                    className={css`
                        display: flex ;
                        align-items: center;
                    
                `}
                >
                    {
                        usuario ? (
                            // usar el FRAGMENT porque esta retornando dos elementos
                            <>  
                                <p className={css`
                                    margin-right :2rem ;
                                `}>Hola : {usuario.email}</p>
                                
                                <Boton
                                    href='/'
                                    bgColor="true"
                                    onClick={()=> firebase.cerrarSesion()}
                                > Cerrar Sesion</Boton>
        
                            </>
                        ) : (
                            <>
                            <Boton
                            href='/login'
                            bgColor="true"
                            >Login</Boton>

                            <Boton
                                href='/crear-cuenta'
                            >Crear Cuenta</Boton>
                        </>
                        )
                    }
                </div>
                    
            </ContenedorHeader>
        </HeaderContainer>
     );
}
 
export default Header;