//Importar el CSS
import "./css/style.css"

//Importar la clase que necesitamos
import { ListaTareas } from "./classes/listaTareas.class"

//Importar funciones y variables que necesitamos para que funcione la aplicación
import { addTareaHTML, numeroTareas, ocultarBorrarCompletadas, footer } from "./js/components";

//Llamadas
export const lista = new ListaTareas();
lista.listaTareas.forEach(tarea => addTareaHTML(tarea));
numeroTareas(lista.listaTareas);
lista.listaTareas.length === 0 ? footer.setAttribute("hidden", true): footer.removeAttribute("hidden");
ocultarBorrarCompletadas();