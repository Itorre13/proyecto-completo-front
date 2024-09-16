import { useState } from 'react'

function Tarea({id,tarea,terminada,eliminarTarea,actualizarEstado,actualizarTexto}){

    let [editando,setEditando] = useState(false)
    let [textoTemporal,setTextoTemporal] = useState(tarea)

    return (<div className="tarea">
                    <h3 className={ !editando ? "visible" : "" }>{ tarea }</h3>
                    <input className={ editando ? "visible" : "" } type="text" 
                        value={textoTemporal}
                        onChange={ evento => setTextoTemporal(evento.target.value) }
                        />
                    <button className="boton"
                        onClick={ () => {
                           if(editando){
                                if(textoTemporal.trim() != "" && textoTemporal.trim() != tarea){
                                        return fetch("http://localhost:3000/tareas/actualizar/texto/" + id, {
                                                method : "PUT",
                                                body : JSON.stringify({ tarea : textoTemporal.trim() }),
                                                headers : {
                                                        "Content-type" : "application/json"
                                                }
                                        })
                                        .then(respuesta => respuesta.json())
                                        .then(({error,resultado}) => {
                                                if(!error && resultado == "ok"){
                                                        actualizarTexto(id,textoTemporal.trim())
                                                        setTextoTemporal(textoTemporal.trim())
                                                        return setEditando(false)
                                                }
                                                console.log("...error a usuario")
                                        })
                                }
                                setTextoTemporal(tarea)
                                setEditando(false)


                           }else{
                                setEditando(true)
                           }     
                        } }
                    >{ editando ? "guardar" : "editar" }</button>
                    <button className="boton"
                            onClick={ () => {
                                fetch("http://localhost:3000/tareas/borrar/" + id, {
                                        method : "DELETE"
                                })
                                .then(respuesta => respuesta.json())
                                .then(({error,resultado}) => {
                                        if(!error && resultado == "ok"){
                                                return eliminarTarea(id)
                                        }
                                        console.log("...error a usuario")
                                })
                            } }
                    >borrar</button>
                    <button className={ `estado ${terminada ? "terminada" : "" }` }
                            onClick={ () => {
                                fetch("http://localhost:3000/tareas/actualizar/estado/" + id, {
                                        method : "PUT"
                                })
                                .then(respuesta => respuesta.json())
                                .then(({error,resultado}) => {
                                        if(!error && resultado == "ok"){
                                                return actualizarEstado(id)
                                        }
                                        console.log("...error a usuario")
                                })
                            } }    
                    ><span></span></button>
            </div>)
}

export default Tarea
