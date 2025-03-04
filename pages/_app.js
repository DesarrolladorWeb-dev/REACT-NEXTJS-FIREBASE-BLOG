// Este seria el archivo principal
import App from "./_app";
import firebase, {FirebaseContext} from '../firebase'
// import useAutenticacion from "@/hooks/useAutenticacion";
import useAutentica from "@/hooks/useAutentica";


const MyApp = props => {
    const usuario = useAutentica();
    console.log(usuario);

    const {Component, pageProps} = props;

    return(
        <FirebaseContext.Provider
            value={{
                firebase,
                usuario
            }}
        >
            <Component {...pageProps}/>
        </FirebaseContext.Provider>
    )
}

export default MyApp