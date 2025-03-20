import { create } from "zustand";
import { ITarea } from "../types/ITareas";

interface ITareaStore   {
    tareas: ITarea[]
    tareaActiva: ITarea | null


    setArrayTareas: (arrayDeTareas: ITarea[]) => void
    
    setTareaActiva: (tareaActiva: ITarea | null) => (void)

    agregarNuevaTarea: (nuevaTarea: ITarea) => void
    editarUnaTarea: (tareaActualizada: ITarea) => void
    eliminarUnaTarea: (idTarea: string) => void


}
 
export const tareaStore = create<ITareaStore>((set) => ({

    tareas: [],
    tareaActiva:  null,

    // funciones modificadoras para el array

    // add task array

    setArrayTareas: (arrayDeTareas) => set(() =>  ({tareas: arrayDeTareas})),

    // add one task to the array

    agregarNuevaTarea: (nuevaTarea) => set((state) => ({tareas: [... state.tareas, nuevaTarea] })),

    // edit a task

    eliminarUnaTarea: (idTarea) => set((state) => {
        const arregloTareas = state.tareas.filter((tarea) => tarea.id != idTarea)

        return {tareas: arregloTareas}
    }),

    // delete a task from the array

    editarUnaTarea: (tareaActualizada) => set((state) => {
        const arregloTareas = state.tareas.map((tarea) => tarea.id == tareaActualizada.id ? {... tarea, ... tareaActualizada} : tarea)

        return {tareas: arregloTareas}
    }),

    // set the active task

   setTareaActiva: (tareaActivaIn) => set(() => ({ tareaActiva: tareaActivaIn || null }))


}))