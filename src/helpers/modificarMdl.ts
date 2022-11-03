import fs = require("fs");

export async function modificarModulo(ruta: string, nombreComponente: string, nombreModulo: string): Promise<any> {
    const relativePath = "./"+nombreComponente+"/"+nombreComponente+".component";

    let nuevoNombreComponente = nombreComponente.charAt(0).toUpperCase() + quitarGuion(nombreComponente.slice(1));
    let str1 = "import { " + nuevoNombreComponente + "Component } from './" + relativePath + "/" + nombreComponente + ".component';";
    let str2 = "    " + nuevoNombreComponente + "Component";
    let txt = fs.readFileSync(ruta+nombreModulo+".module.ts", 'utf-8');

    let index1 = txt.lastIndexOf("import {");
    let index2 = txt.lastIndexOf(";");
    txt = txt.replace(txt.slice(index1, index2 + 1), txt.slice(index1, index2 + 1) + "\n" + str1);

    index1 = txt.indexOf("declarations: [");
    index2 = txt.indexOf("],", index1);
    txt = [txt.slice(0, index2 - 3) + ",", str2, "  " + txt.slice(index2, txt.length)].join("\n");

    fs.writeFile(ruta+nombreModulo+".module.ts", txt, 'utf-8', function (err) {
        if (err) throw err;
        console.log("Escritura de archivo completa");
    });
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