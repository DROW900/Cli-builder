import {
    BuilderContext,
    BuilderOutput,
    createBuilder
} from '@angular-devkit/architect';

import { JsonObject } from '@angular-devkit/core';
import { Schema } from './schema'
import fs = require("fs");

type InputOptions = Schema & JsonObject

async function execute(options: InputOptions, context: BuilderContext): Promise<BuilderOutput> {
    context = context;
    try {
        let { direccion, nombre } = options
        const rutaNombre = direccion + "/" + nombre + "/" + nombre;
        console.log("Creando la carpeta...");
        const crearFolder = await fs.mkdir(direccion + "/" + nombre, () => { });
        console.log("Se ha creado el directorio con exito", crearFolder);
        //Creando el archivo html
        await generarHTML(rutaNombre);
        await generarTS(rutaNombre, nombre);
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
    return { success: true };
}

async function generarHTML(rutaNombre: string): Promise<any> {
    let texto = "<h1>{{ title }}</h1>\n";
    texto += "<div>"
    texto += "\n\t<p *ngIf=\"!bandera\">Carlos</p>\n\t<p *ngIf=\"bandera\">Diego</p>\n</div>"

    await fs.writeFile(rutaNombre + ".component.html", texto, (err) => {
        if (err) throw err;
        console.log("Se ha generado el archivo correctamente :D")
    })
}

async function generarTS(rutaNombre: string, nombre: string): Promise<any> {
    let nuevoNombreComponente = nombre.charAt(0).toUpperCase() + quitarGuion(nombre.slice(1));
    let textoTs = ""
        + "import { Component, OnInit } from '@angular/core';\n"
        + "\n"
        + "@Component({\n"
        + "selector: 'app-" + nombre + "',\n"
        + "templateUrl: './" + nombre + ".component.html',\n"

        + "})\n"
        + "export class " + nuevoNombreComponente + "Component implements OnInit {\n"
        + "\n"
        + "title : string = 'Carlos';\n"
        + "bandera : boolean = true;\n"
        + "constructor() { }\n"
        + "\n"
        + "ngOnInit(): void {\n"
        + "}\n"
        + "\n"
        + "}\n"
        + "\n";
    await fs.writeFile(rutaNombre + ".component.ts", textoTs
        , (err: any) => {
            if (err) throw err;
            console.log("Se ha generado el archivo correctamente :D")
        })
}

function quitarGuion(nombre: string): string {
    let txt = "";
    let posicionInicio = 0;
    let posicionGuion = nombre.indexOf("-");
    while (posicionGuion != -1) {
        //Lógica si encuentra un "-"
        txt= txt + nombre.slice(posicionInicio,posicionGuion);
        txt = txt + nombre.charAt(posicionGuion+1).toUpperCase();
        posicionInicio = posicionGuion+2;
        posicionGuion = nombre.indexOf("-", posicionInicio);
    }
    txt= txt + nombre.slice(posicionInicio,nombre.length);
    return txt;
}

//async function modificarModulo(rutaNombre: string, nombre: string): Promise<any> {
    //let str1 = "import { " + ComponetePruebaComponent
    //+"} from './componete-prueba/componete-prueba.component'; "
    //import { ComponetePruebaComponent } from './componete-prueba/componete-prueba.component';
//}

export default createBuilder(execute);