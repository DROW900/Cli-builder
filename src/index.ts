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

/* //async function generarHTML(rutaNombre: string): Promise<any> {
    let texto = "<main fxLayout=\"column\" fxFlexAlign=\"space-evenly center\">\n\n"
    + "     <div class=\"mb-32\">\n"
    + "         <h1 class=\"sectionTitle mb-8\">{{ title }}</h1>\n"
    + "         <h2 class=\"formSubtitle\">{{ subtitle }}</h2>\n"
    + "     </div>\n"
    + "     <div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutAlign=\"start center\" fxLayoutAlign.xs=\"center\" fxLayoutGap=\"8\" class=\"mb-16\">\n"
    + "         <button fxFlex.xs=\"100\" class=\"primary\" mat-stroked-button>{{ textButton }}</button>\n"
    + "     </div>\n\n"
    
    + "     <mat-card>\n"
    + "         <mat-card-actions fxLayout=\"column\">\n"
    + "             <div fxLayout=\"row\"  class=\"mb-24\">\n"
    + "                 <div fxFlex=\"100\">\n"
    + "                     <h3 *ngIf=\"titleCard != '' \" class=\"cardTitle\">{{titleCard}}</h3>\n"
    + "                     <ng-container *ngIf=\"routeInfo.length > 0\">\n"
    + "                         <span class=\"cardTitle\" *ngFor=\"let path of routeInfo; let last = last\">\n"
    + "                             <ng-container *ngIf=\"path != undefined\">\n"
    + "                                 {{ path }} <span *ngIf\"!last\"> / </span>\n"
    + "                             </ng-container>\n"
    + "                         </span>\n"
    + "                     </ng-container>\n"
    + "                 </div>\n"
    + "                 <div *ngIf=\"showCloseButton\" fxLayoutAlign=\"end\">\n"
    + "                     <button mat-icon-button>\n"
    + "                         <mat-icon>close</mat-icon>\n"
    + "                     </button>\n"
    + "                 </div>\n"
    + "             </div>\n\n"

    + "             <div>\n"
    + "                 <form class=\"example-form\" fxLayout=\"row wrap\" fxLayout.sm=\"row wrap\" fxLayout.xs=\"column\" fxLayoutGap=\"16px grid\" class=\"width100 p-0\">\n"
    + "                     <mat-form-field appearance=\"outline\" fxFlex=\"20\" fxFlex.xs=\"100\" fxFlex.sm=\"auto\">\n"
    + "                         <mat-label>Clave</mat-label>\n"
    + "                         <input type=\"text\" aria-label=\"Number\" matInput>\n"
    + "                     </mat-form-field>\n"
    + "                     <mat-form-field class=\"mat-form-field\" appearance=\"outline\" fxFlex.xs=\"100\" fxFlex.sm=\"100\" fxFlexFill  fxFlex=\"56.9\">\n"
    + "                         <mat-label>T&iacute;tulo en espa&ntilde;ol</mat-label>\n"
    + "                         <input type=\"text\" aria-label=\"Number\" matInput>\n"
    + "                     </mat-form-field>\n"
    + "                     <mat-form-field appearance=\"outline\" fxFlex=\"20\" fxFlex.xs=\"auto\" fxFlex.sm=\"auto\" fxFlex.md=\"auto\"\n"
    + "                         class=\"selectTest\">"
    + ""

    await fs.writeFile(rutaNombre + ".component.html", texto, (err) => {
        if (err) throw err;
        console.log("Se ha generado el archivo correctamente :D")
    })
} */

async function copiarArchivos(rutaNombre: string) {
    await fs.copyFile('./node_modules/generador/dist/test.component.html', rutaNombre+".component.html", function (err){
        if(err){
            throw err
        }else{
            console.log("Se ha generado el HTML")
        }
    })
    await fs.copyFile('./node_modules/generador/dist/test.component.css', rutaNombre+".component.css", function (err){
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