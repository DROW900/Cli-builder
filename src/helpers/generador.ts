import fs = require('fs/promises');
import { solicitarDatosComponente, solicitarNumeroColumnas } from './inquirer';
import { generarTS } from './tsGenerator';

export async function generarCarpeta( ruta: string, nombre: any ){
    ruta = ruta + "/" + nombre;
    await fs.mkdir(ruta, {recursive: true});
    return ruta;
}

export async function generarRouting( ruta: string, nombre: string ) {
    ruta = ruta + "/" + nombre;
    console.log("Generando hoja de rutas")
    await fs.writeFile(ruta+"-routing.module.ts", "Hoja de ruta");
}

export async function generarModule( ruta: string, nombre: string ) {
    ruta = ruta + "/" + nombre;
    console.log("Generando hoja de modulos")
    await fs.writeFile(ruta+".module.ts","Hoja de modulo")
}

export async function generarComponenteInterfaz( ruta: string ) {
    const {nombreComponente, template} = await solicitarDatosComponente();
    let numeroColumnas = 1;
    if(template === 'test'){
        numeroColumnas = await solicitarNumeroColumnas();
    }
    //Se genera la carpeta del componente
    await generarCarpeta(ruta, nombreComponente);
    ruta = ruta + "/" + nombreComponente + "/";

    //Se realiza el copiado y generación de archivos
    await fs.copyFile(`./node_modules/filtrosTabla/dist/templates/${template}.component.html`, ruta + nombreComponente + '.component.html')
    await fs.copyFile(`./node_modules/filtrosTabla/dist/templates/${template}.component.css`, ruta + nombreComponente + '.component.css')
    await fs.writeFile(ruta+ `${nombreComponente}.component.ts`, await generarTS(numeroColumnas, nombreComponente))
}