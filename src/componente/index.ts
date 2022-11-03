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
        let { direccion, nombre, modulo } = options
        const rutaNombre = direccion + "/" + nombre + "/" + nombre;
        const rutaModulo = "" + modulo;
        console.log("Creando la carpeta...");
        const crearFolder = await fs.mkdir(direccion + "/" + nombre, () => { });
        console.log("Se ha creado el directorio con exito", crearFolder);
        //Creando el archivo html
        await copiarArchivos(rutaNombre);
        await generarTS(rutaNombre, nombre);
        await modificarModulo(rutaModulo, nombre);
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
    return { success: true };
}


async function copiarArchivos(rutaNombre: string) {
    await fs.copyFile('./node_modules/filtrosTabla/dist/test.component.html', rutaNombre+".component.html", function (err){
        if(err){
            throw err
        }else{
            console.log("Se ha generado el HTML")
        }
    })
    await fs.copyFile('./node_modules/filtrosTabla/dist/test.component.css', rutaNombre+".component.css", function (err){
        if(err){
            throw err
        }else{
            console.log("Se ha generado el CSS")
        }
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
        txt = txt + nombre.slice(posicionInicio, posicionGuion);
        txt = txt + nombre.charAt(posicionGuion + 1).toUpperCase();
        posicionInicio = posicionGuion + 2;
        posicionGuion = nombre.indexOf("-", posicionInicio);
    }
    txt = txt + nombre.slice(posicionInicio, nombre.length);
    return txt;
}

async function modificarModulo(rutaModulo: string, nombre: string): Promise<any> {
    let nuevoNombreComponente = nombre.charAt(0).toUpperCase() + quitarGuion(nombre.slice(1));
    let str1 = "import { " + nuevoNombreComponente + "Component } from './" + nombre + "/" + nombre + ".component';";
    let str2 = "    " + nuevoNombreComponente + "Component";
    let txt = fs.readFileSync(rutaModulo, 'utf-8');

    let index1 = txt.lastIndexOf("import {");
    let index2 = txt.lastIndexOf(";");
    txt = txt.replace(txt.slice(index1,index2+1),txt.slice(index1,index2+1)+"\n"+str1);

    index1 = txt.indexOf("declarations: [");
    index2 = txt.indexOf("],", index1);
    txt = [txt.slice(0,index2-3)+",",str2,"  "+txt.slice(index2,txt.length)].join("\n");

    fs.writeFile(rutaModulo, txt, 'utf-8', function (err) {
        if (err) throw err;
        console.log("Escritura de archivo completa");
    });
}

export default createBuilder(execute);