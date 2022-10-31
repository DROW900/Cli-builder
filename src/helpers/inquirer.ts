const inquirer = require('inquirer');

export const generarComponente = async( numeroComponentes: number ) =>{
    const preguntas = [
        {
            type: 'confirm',
            name: 'esCorrecto',
            message: `¿Desea generar ${numeroComponentes} componentes?`,
            default: true
        },
        {
            type: 'confirm',
            name: 'conRutas',
            message: '¿Desea agregar routing?',
            default: false
        }
    ]

    const { respuestas } = await inquirer.prompt( preguntas );
    return respuestas;
}
