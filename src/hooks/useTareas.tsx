import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { editarTarea, eliminarTareaPorID, getAllTareas, postNuevaTarea } from "../http/tareas"
import { ITarea } from "../types/ITareas"
import Swal from "sweetalert2"


export const useTareas = () => {


    const {tareas, setArrayTareas, agregarNuevaTarea,  editarUnaTarea} = tareaStore(useShallow((state) => ({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        
        editarUnaTarea: state.editarUnaTarea,
    })))

    const getTareas = async  () => {
            const data = await getAllTareas()
            if(data) setArrayTareas(data)
            
        }

    const crearTarea = async (nuevaTarea: ITarea) => {
        agregarNuevaTarea(nuevaTarea)
        try {
            await postNuevaTarea(nuevaTarea);
            Swal.fire('Tarea agregada', 'Tarea agregada con exito!', 'success');
        } catch (error) {
            console.error(error)
            eliminarTarea(nuevaTarea.id!)
            Swal.fire('Error', 'Error al agregar la tarea', 'warning');
                }
    }
    const putTarea = async (tareaEditada: ITarea) => {
        const estadoPrevio = tareas.find((tarea) => tarea.id === tareaEditada.id)
        editarUnaTarea(tareaEditada)
        try {
            await editarTarea(tareaEditada);
            Swal.fire('Tarea editada', 'Tarea editada con exito!', 'success');
            
        } catch (error) {
            console.error(error)
           if(estadoPrevio )editarUnaTarea(estadoPrevio)
            console.log('Algo salio mal al editar')
           Swal.fire('Error', 'Error al editar la tarea', 'warning');
        }
    }
    const eliminarTarea = async (idTarea: string) => {
        const estadoPrevio = tareas.find((tarea) => tarea.id === idTarea);
    
        // Eliminar la tarea del estado de Zustand
        tareaStore.getState().eliminarUnaTarea(idTarea);
    
        try {
            await eliminarTareaPorID(idTarea);
            Swal.fire('Tarea eliminada', 'Tarea eliminada con exito!', 'success');

        } catch (error) {
            console.error('Algo salió mal al eliminar');
            Swal.fire('Error', 'Error al eliminar la tarea', 'warning');
            // Si hubo un error, volver a agregar la tarea eliminada
            if (estadoPrevio) {
                tareaStore.getState().agregarNuevaTarea(estadoPrevio);
            }
        }
    };
    
  return {
    getTareas,
    crearTarea,
    putTarea,
    eliminarTarea,
    tareas,
  }
}
