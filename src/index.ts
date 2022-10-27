import {
    BuilderContext,
    BuilderOutput,
    createBuilder
} from '@angular-devkit/architect';

import { JsonObject } from '@angular-devkit/core';
import { Schema } from './schema'
import fs = require("fs");

type InputOptions = Schema & JsonObject

async function execute( options:InputOptions, context:BuilderContext ):Promise<BuilderOutput>{
    context = context;
    try {
        let {direccion, nombre} = options
        const rutaNombre = direccion+"/"+nombre+"/"+nombre;
        console.log("Creando la carpeta...");
        const crearFolder = await fs.mkdir(direccion+"/"+nombre, () => {} );
        console.log("Se ha creado el directorio con exito", crearFolder);
        //Creando el archivo html
        await generarHTML(rutaNombre);
        await fs.writeFile(rutaNombre+".component.ts","import { Component } from \'@angular/core\';",(err) => {
            if(err) throw err;
            console.log("Se ha generado el archivo correctamente :D")
        })
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
    return { success: true };
}

async function generarHTML(rutaNombre: string): Promise<any> {
    let texto = "<h1>{{ title }}</h2>\n";
    texto += "<div>"
    texto += "\n\t<p *ngIf=\"bandera; else elseBlock\">Carlos</p>\n\t<p #elseBlock>Diego</p>\n</div>"

    await fs.writeFile(rutaNombre+".component.html",texto,(err) => {
        if(err) throw err;
        console.log("Se ha generado el archivo correctamente :D")
    })
}

export default createBuilder(execute);