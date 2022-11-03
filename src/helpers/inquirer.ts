const inquirer = require('inquirer');

export const solicitarNumeroComponentes = async() =>{
    const preguntas = [
        {
            type: 'input',
            name: 'numeroComponentes',
            message: '¿Cuántos componentes desea generar?',
            default: 0
        },
    ]

    const { numeroComponentes } = await inquirer.prompt( preguntas );

    return Number( numeroComponentes );
}

export const solicitarDatosComponente = async() => {
    const preguntas = [
        {
            type: 'input',
            name: 'nombreComponente',
            message: 'Nombre del componente a generar: ',
        },
        {
            type: 'list',
            name: 'template',
            message: 'Tipo de componente a generar',
            choices:[
                'test',
                'test',
                'test',
                'test'
            ]
        }
    ]

    const objeto = await inquirer.prompt( preguntas );
    return objeto;
}