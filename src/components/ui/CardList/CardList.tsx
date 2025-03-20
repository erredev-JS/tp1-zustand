import { FC } from 'react'
import { ITarea } from '../../../types/ITareas'
import styles from './CardList.module.css'
import { useTareas } from '../../../hooks/useTareas'

type ICardList = {
    tarea : ITarea
    handleOpenModalEdit:  (tarea: ITarea ) => void
}


export const CardList: FC<ICardList> = ({tarea, handleOpenModalEdit}) => {

    const {eliminarTarea} = useTareas()


    const eliminarTareaById =  () => {
         eliminarTarea(tarea.id!)
    }
    const editarTarea = () => {
        handleOpenModalEdit(tarea)
        console.log('editar: ', tarea)
    }
  return (
    <div className={styles.card}>
        <div className={styles.cardTxt}>

        <h3 className={styles.cardTitle}>Titulo: {tarea.titulo}</h3>
        <p className={styles.cardDescription}>Descripción: {tarea.descripcion}</p>
        <b>Fecha limite: {tarea.fechaLimite}</b>
        </div>
        <div className={styles.cardActions}>
            <button onClick={eliminarTareaById}>Eliminar</button>
            <button onClick={editarTarea}>Editar</button>
        </div>
    </div>
  )
}
