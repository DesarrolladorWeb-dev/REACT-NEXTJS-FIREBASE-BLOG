import React , {useState, useEffect}from 'react'


// sera usado para crear cuenta , para login es por eso que se llama fm
const useValidacion = (stateInicial, validar,fn) => {
    // lo que se estara escribiendo 
    const [valores , guardarValores] = useState(stateInicial)
    // va obteniendo los errores de lo que arriba se escriba
    const [errores, guardarErrores] = useState({})
    // cuando se envia el formulario y todo es correcto pasara a true
    const [submitForm, guardarSubmitForm] = useState(false)

    
    useEffect(() => {
        if(submitForm){
            // Significa que el objeto esta vacio
            const noErrores = Object.keys(errores).length === 0;
            if(noErrores){//ejecutamos la funcion que el usuario me pasara, puede ser crear producto , inciar session o crear una cuenta
                // si no hay erroers
                fn() //Fn = Funcion que se ejecuta en el componente
            }
            // Y reinicia el formulario
            guardarSubmitForm(false )
        }
    },[errores])

    // Funcion que se ejecuta conforme el usuario escribe algo 
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    // Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e =>{
        e.preventDefault();

        // validar tendra las reglas de validacion
        // le pasaremos los valores que el usuario esta escribiendo
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion)
        // pasa a true por el useEffect - estru por eso  cuando submit cambie va a validar el formulario 
        guardarSubmitForm(true)

    }

    //cuando se realiza el evento de blur
    // ES PARA QUE LAS VALIDACIONES SEAN EN TIEMPO REAL
    const handlerBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion)

    }


    // es entre llaves porque vamos a retornar muchas secciones
    // paso el state y las funciones creadas - y no las funciones del state
    return{
        valores,
        errores,
        
        handleSubmit,
        handleChange,
        handlerBlur,
    } ;

}
export default useValidacion;