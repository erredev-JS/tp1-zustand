import { useEffect, useState } from 'react'
import styles from './ListTareas.module.css'
import { tareaStore } from '../../../store/tareaStore'
import { CardList } from '../CardList/CardList'
import { Modal } from '../Modal/Modal'
import { ITarea } from '../../../types/ITareas'
import { useTareas } from '../../../hooks/useTareas'

export const ListTareas = () => {

    
  
    const setTareaActiva = tareaStore((state) => state.setTareaActiva)
    
    const {getTareas, tareas} = useTareas()
    useEffect(() => {
        getTareas()
    }, [])


    const [openModalTarea, setOpenModalTarea] = useState(false)

    const handleOpenModalEdit = (tarea: ITarea) => {
        setTareaActiva(tarea)
        setOpenModalTarea(true)
    }

    const handleCloseModal = () => {
        setOpenModalTarea(false)
        setTareaActiva(null)
    }
   
  return (
    <>
    <div className={styles.containerPrincipal}>
        
    <div className={styles.containerTitleAndButton}>
        <h2>Lista de tareas</h2>
        <button onClick={() => setOpenModalTarea(true)}>Agregar tarea</button>
    </div>

    <div className={`${styles.containerTasks} ${styles.contenedorScroll}`}>
        {
        tareas.length > 0
        ?
        tareas.map((tarea) => <CardList key={tarea.id} tarea={tarea}  handleOpenModalEdit = {handleOpenModalEdit} />)
        : 
        <div className = {styles.noTasksDiv}>
        <h3>No hay tareas para mostrar</h3>
        </div>
        }
    </div>


    </div>


    {openModalTarea && <Modal handleCloseModal={handleCloseModal}/>}
    
        </>
  )
}
