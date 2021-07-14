import { Tarea } from "../classes/index.classes"
import { lista } from "../index";

//Variables HTML
const tareaInput = document.getElementById("_newTodo");
export const todoList = document.getElementById("_todoList");
export const footer = document.getElementById("_footer");

//Inicialización variables
let enterPres = false;

//Funciones
export const addTareaHTML = (_tarea)=>{
    const tareasHTML =  `
    <li class="${_tarea.completada ? "completed" : ""}" data-id="${_tarea.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(_tarea.completada) ? "checked" : ""}>
            <label>${_tarea.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
    todoList.innerHTML += tareasHTML;
    lista.listaTareas.length === 0 ? footer.setAttribute("hidden", true): footer.removeAttribute("hidden");
}

const ocultarTarea = (_activa)=>{
    let lis = todoList.querySelectorAll("li");
        lis.forEach(elem =>{
            lista.listaTareas.forEach(el =>{
               if (elem.getAttribute("data-id") == el.id){
                   if(el.completada == _activa){
                       elem.setAttribute("hidden", true);
                   } else {
                       elem.removeAttribute("hidden");
                   }
               }
            });
        });
}

export const numeroTareas = (_array) => {
    let pendientes = _array.length;
    _array.forEach(element => {
        if (element.completada){
            pendientes -= 1;
        }
    });
    footer.children[0].childNodes[0].textContent = pendientes;    
}

export const ocultarBorrarCompletadas = ()=>{
    let isOneCompleted = Array.from(todoList.children).some( e => e.classList.contains("completed"));
    isOneCompleted ? footer.children[2].removeAttribute("hidden") : footer.children[2].setAttribute("hidden", true);
}

//Eventos
document.addEventListener("keypress", (e)=> { e.key === "Enter" ? enterPres = true : enterPres = false;})

tareaInput.addEventListener("keyup", (e)=>{
    if (e.key ==="Enter" && tareaInput.value.trim() != ""){
        let nuevaTarea = new Tarea(tareaInput.value);
        lista.addTarea(nuevaTarea);
        addTareaHTML(nuevaTarea);
        numeroTareas(lista.listaTareas);
        tareaInput.value = "";
    } else if (e.key === "Enter" && tareaInput.value.trim() === ""){
        tareaInput.value = "";
    }
});

todoList.addEventListener("dblclick", (e)=>{
    if (e.target.innerHTML != ""){
        let label = e.target;
        label.setAttribute("contenteditable", true);
        label.setAttribute("style", "border: 1px solid black");
        label.addEventListener("keypress", (el)=>{
            if (el.key == "Enter"){
                label.setAttribute("contenteditable", false);
                label.setAttribute("style", "")
                lista.listaTareas.forEach(elem =>{
                    if (elem.id == label.parentNode.parentNode.getAttribute("data-id")){
                        elem.tarea = label.textContent;
                        lista.guardarLocalStorage();
                    }
                })
            }
        });
    }
        
});

todoList.addEventListener("click", (e)=>{
    if (e.target.localName === "input"){
        lista.marcarCompletado(e.target.parentNode.parentNode.getAttribute("data-id"));
        e.target.checked ? e.target.parentNode.parentNode.classList.add("completed"): e.target.parentNode.parentNode.classList = "";
        numeroTareas(lista.listaTareas);
        ocultarBorrarCompletadas();
    }
    if (e.target.localName === "button"){
        lista.eliminarTarea(e.target.parentNode.parentNode.getAttribute("data-id"));
        e.target.parentNode.parentNode.remove();
        numeroTareas(lista.listaTareas);
        lista.listaTareas.length === 0 ? footer.setAttribute("hidden", true): footer.removeAttribute("hidden");
        ocultarBorrarCompletadas();
    }
});

footer.addEventListener("click", (e)=>{
    if(e.target.getAttribute("href") === "#/"){
        let lis = todoList.querySelectorAll("li");
        lis.forEach(element =>{
          if (element.hasAttribute("hidden")){
              element.removeAttribute("hidden");
          }
        });
    } else if (e.target.getAttribute("href") === "#/active"){
        ocultarTarea(true);
    } else if (e.target.getAttribute("href") === "#/completed"){
        ocultarTarea(false);
    }else if (e.target.localName === "button"){
        lista.eliminarCompletados();
        lista.listaTareas.length === 0 ? footer.setAttribute("hidden", true): footer.removeAttribute("hidden");
    }
})