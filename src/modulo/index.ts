import {
    BuilderContext,
    BuilderOutput,
    createBuilder
} from '@angular-devkit/architect';
//import { generarRouting } from '../helpers/inquirer'
import { JsonObject } from '@angular-devkit/core';
import { Schema } from './schema'
import { 
    generarCarpeta,
    generarComponenteInterfaz,
    generarModule, 
    generarRouting 
} from '../helpers/generador';
import { solicitarNumeroComponentes } from '../helpers/inquirer';

type InputOptions = Schema & JsonObject

async function execute(options: InputOptions, context: BuilderContext): Promise<BuilderOutput> {
    context = context; 
    try {
        let { ruta, nombre } = options;
        await generarCarpeta( ruta, nombre );
         //Se genera la carpeta del modulo junto con sus archivos iniciales.
        const rutaBase = ruta + "/" + nombre;
        await generarRouting( rutaBase, nombre );
        await generarModule( rutaBase, nombre )

        //Se solicita el numero de componentes que se generarán
        const numeroComponentes = await solicitarNumeroComponentes();
        let i = 0;
        while(i < numeroComponentes){
            await generarComponenteInterfaz(rutaBase, nombre);
            i++;
        }

    }catch (error) {
        console.log("Estado: Error");
        return {
            success: false,
            error: error.message
        }
    }
    console.log("Estado: Completado")
    return { success: true }
}

export default createBuilder(execute);