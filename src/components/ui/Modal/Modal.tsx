import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { tareaStore } from '../../../store/tareaStore'
import styles from './Modal.module.css'
import { ITarea } from '../../../types/ITareas'
import { useTareas } from '../../../hooks/useTareas'



type IModal = {
  handleCloseModal: VoidFunction
 
}

const initialState: ITarea = {
  titulo: "",
  descripcion:"",
  fechaLimite: "",
}


export const Modal: FC<IModal> = ({handleCloseModal}) => {
  
  const tareaActiva = tareaStore((state) => state.tareaActiva)
  const setTareaActiva = tareaStore((state) => state.setTareaActiva)
  const [formValues, setFormValues] = useState<ITarea>(initialState)

    const {crearTarea, putTarea} = useTareas()
  
    useEffect(() => {
      if(tareaActiva){
        setFormValues(tareaActiva)
      }
    }, [tareaActiva])


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {name, value} = e.target

      setFormValues((prev) => ({... prev, [`${name}`] : value}))

    }



    const handleSubmit  = (e: FormEvent) => {
      e.preventDefault()
      if(tareaActiva){
        putTarea(formValues)
      }else{
        crearTarea({... formValues, id:  Date.now().toString()})
      }
      setTareaActiva(null)
      handleCloseModal()
    }
    
  return (
    <>

    <div className={styles.backdrop}>

    </div>
   <div className={styles.containerModal}>
     <div className={styles.modalTitle}>
        <h3>{tareaActiva ? "Editar tarea" : "Agregar una tarea"}</h3>
    </div>
    <form onSubmit={handleSubmit}>
        <div className={styles.containerForm}>
        <input type="text" required autoComplete='off' name='titulo' placeholder='Ordenar' value={formValues.titulo} onChange={handleChange}/>
        <textarea  required autoComplete='off' name='descripcion' placeholder='Ordenar habitación' value={formValues.descripcion} onChange={handleChange}/>
        <input type="date" required autoComplete='off' name='fechaLimite' value={formValues.fechaLimite} onChange={handleChange}/>
        </div>
            <div className={styles.containerBtnForm}>
            <button onClick={handleCloseModal}>Cancelar</button>
            <button type='submit'>{tareaActiva ? "Editar tarea" : "Agregar una tarea"}</button>
        </div>
    </form>
   </div>
    </>
  )
}
