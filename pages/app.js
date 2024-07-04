// Este seria el archivo principal
import App from "./_app";
import firebase, {FirebaseContext} from '../firebase'

const MyApp = props => {

    const {Component, pageProps} = props;

    return(
        <FirebaseContext.Provider
            value={{
                firebase
            }}
        >
            <Component {...pageProps}/>
        </FirebaseContext.Provider>
    )
}

export default MyApp