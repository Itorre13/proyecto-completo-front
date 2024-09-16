import { useState,useEffect } from 'react'
import Formulario from './Formulario'
import Tarea from './Tarea'

function App() {

  let [tareas,setTareas] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/tareas")
    .then(respuesta => respuesta.json())
    .then(tareas => setTareas(tareas))
  },[])

  function nuevaTarea(tarea){ // { id,tarea,terminada}
    setTareas([...tareas,tarea])
  }

  function eliminarTarea(id){
    setTareas(tareas.filter( tarea => tarea.id != id))
  }

  function actualizarEstado(id){
    setTareas(tareas.map( tarea => {
      if(tarea.id == id){
        tarea.terminada = !tarea.terminada
      }
      return tarea
    }))
  }

  function actualizarTexto(id,texto){ //UPDATE tareas SET tarea = texto WHERE id = id
    setTareas(tareas.map( tarea => {
      if(tarea.id == id){
        tarea.tarea = texto
      }
      return tarea
    }))
  }


  return (
    <>
      <Formulario nuevaTarea={nuevaTarea} />
      <section className="tareas">
        { tareas.map( ({id,tarea,terminada}) => <Tarea key={id}
                                                       id={id}
                                                       tarea={tarea}
                                                       terminada={terminada}
                                                       eliminarTarea={eliminarTarea}
                                                       actualizarEstado={actualizarEstado}
                                                       actualizarTexto={actualizarTexto}
                                                       /> ) }
      </section>
    </>
  )
}

export default App
