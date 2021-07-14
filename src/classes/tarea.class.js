export class Tarea{
    constructor(_tarea){
        this.tarea = _tarea;
        this.id = new Date().getTime();
        this.completada = false;
    }
}