/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "k": () => (/* binding */ lista)
});

;// CONCATENATED MODULE: ./src/classes/tarea.class.js
class Tarea{
    constructor(_tarea){
        this.tarea = _tarea;
        this.id = new Date().getTime();
        this.completada = false;
    }
}
;// CONCATENATED MODULE: ./src/classes/index.classes.js
//Esto es más útil cuando tienes muchas clases




;// CONCATENATED MODULE: ./src/js/components.js



//Variables HTML
const tareaInput = document.getElementById("_newTodo");
const todoList = document.getElementById("_todoList");
const footer = document.getElementById("_footer");

//Inicialización variables
let enterPres = false;

//Funciones
const addTareaHTML = (_tarea)=>{
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

const numeroTareas = (_array) => {
    let pendientes = _array.length;
    _array.forEach(element => {
        if (element.completada){
            pendientes -= 1;
        }
    });
    footer.children[0].childNodes[0].textContent = pendientes;    
}

const ocultarBorrarCompletadas = ()=>{
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
;// CONCATENATED MODULE: ./src/classes/listaTareas.class.js




class ListaTareas{
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
;// CONCATENATED MODULE: ./src/index.js
//Importar el CSS


//Importar la clase que necesitamos


//Importar funciones y variables que necesitamos para que funcione la aplicación


//Llamadas
const lista = new ListaTareas();
lista.listaTareas.forEach(tarea => addTareaHTML(tarea));
numeroTareas(lista.listaTareas);
lista.listaTareas.length === 0 ? footer.setAttribute("hidden", true): footer.removeAttribute("hidden");
ocultarBorrarCompletadas();
/******/ })()
;
//# sourceMappingURL=667577a8279052d36db3.bundle.js.map