import { todoList } from "../js/components";
import { lista } from "../index";
import { numeroTareas } from "../js/components";

export class ListaTareas{
    constructor(){
        this.cargarLocalStorage();
    }
    addTarea(_tarea){
        this.listaTareas.push(_tarea);
        this.guardarLocalStorage();
    }
    marcarCompletado(_id){
        for(const tarea of this.listaTareas){
            if(tarea.id==_id){
                tarea.completada = !tarea.completada;
                break;
            }
        }
        this.guardarLocalStorage();
    }
    eliminarTarea(_id){
        for(const tarea of this.listaTareas){
            if(tarea.id==_id){
                this.listaTareas.splice(this.listaTareas.indexOf(tarea), 1);
                break;
            }
        }
        this.guardarLocalStorage();
    }
    eliminarCompletados(){
        let lis = todoList.querySelectorAll("li");
        lis.forEach(elem =>{
            lista.listaTareas.forEach(el =>{
               if (elem.getAttribute("data-id") == el.id){
                   if(el.completada){
                    lista.eliminarTarea(el.id);
                    elem.remove();
                    numeroTareas(lista.listaTareas);
                   }
               }
            });
        });
        this.guardarLocalStorage();
    }
    guardarLocalStorage(){
        localStorage.setItem("tareas", JSON.stringify(this.listaTareas));
    }
    cargarLocalStorage(){
        this.listaTareas = (localStorage.getItem("tareas")) ? (JSON.parse(localStorage.getItem("tareas"))) : ([]);
    }
}