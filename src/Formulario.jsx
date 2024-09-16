import { useState } from 'react'

function Formulario({nuevaTarea}){

    let [textoTemporal,setTextoTemporal] = useState("")

    return (<form onSubmit={ evento => {
                        evento.preventDefault()

                        if(textoTemporal.trim() != ""){
                            fetch("http://localhost:3000/tareas/nueva", {
                                method : "POST",
                                body : JSON.stringify({ tarea : textoTemporal }),
                                headers : {
                                    "Content-type" : "application/json"
                                }
                            })
                            .then(respuesta => respuesta.json())
                            .then(({error,id}) => {
                                if(!error){
                                    nuevaTarea({
                                        id,
                                        tarea : textoTemporal,
                                        terminada : false
                                    })
                                    return setTextoTemporal("")
                                }
                                console.log("error al usuario")
                            })
                        }
                    } }>
            <input type="text" placeholder="¿QUÉ HAY QUE HACER?" value={textoTemporal} onChange={ evento => setTextoTemporal(evento.target.value) } />
            <input type="submit" value="CREAR TAREA"/>
        </form>)
}

export default Formulario