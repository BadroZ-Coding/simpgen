#! /usr/bin/env node
import inquirer from "inquirer"
import shell from "shelljs"
import fs from "fs"

inquirer.prompt([
    {
        type: 'input',
        name: "name",
        message: "What is the name of the project ?"
    },
    {
        type: 'list',
        name: "type",
        message: "Which type of project do you want ?",
        choices: [
            'Node.JS',
            'Ionic Vue',
            'FullStack'
        ]
    },
    {
        type: 'list',
        name: 'template',
        choices: [
            "Nothing",
            "Express API"
        ],
        when: (a) => a.type === 'Node.JS'
    },
    {
        type: 'number',
        name: "port",
        message: "the project listens on which port ?",
        when: (a) => a.template === 'Express API'
    },
    {
        type: 'number',
        name: "portBackend",
        message: "The backend of the project listening on which port ?",
        when: (a) => a.type === 'FullStack'
    },
    {
        type: 'list',
        name: 'mongodb',
        message: 'Do you want to use MongoDB ?',
        choices : [
            'Yes',
            'No'
        ],
        when: (a) => a.template === 'Express API'
    }
]).then(project => {
    console.log(`⏳ Generation of project ${project.type} ⏳`)
    if (project.type === "Node.JS") {
        if (project.template === "Nothing") {
            shell.exec(`mkdir ${project.name} && cd ./${project.name} && touch app.js && npm init --yes && mkdir src && touch src/config.json`)
            console.log('✅ successfully generated and initialized ✅')
        } else if (project.template === "Express API" && project.mongodb === "Yes") {
            shell.exec(`git clone git@github.com:BadroZ-Coding/simpgen-nodejs-express-mongodb.git && mv ./simpgen-nodejs-express-mongodb ${project.name}`)
            console.log('✅ successfully cloned repository ✅')

            let configJSON = JSON.parse(fs.readFileSync(`./${project.name}/src/config.json`, 'utf-8'))
            let packageJSON = JSON.parse(fs.readFileSync(`./${project.name}/package.json`, 'utf-8'))

            configJSON.port = project.port
            packageJSON.name = project.name

            fs.writeFileSync(`./${project.name}/src/config.json`, JSON.stringify(configJSON), 'utf-8')
            fs.writeFileSync(`./${project.name}/package.json`, JSON.stringify(packageJSON), 'utf-8')

            console.log('✅ successfully generated and initialized ✅')

            shell.exec(`cd ${project.name} && npm i`)

            console.log('✅ dependency successfully installed ✅')
        } else {
            shell.exec(`git clone git@github.com:BadroZ-Coding/simpgen-nodejs-express.git && mv ./simpgen-nodejs-express ${project.name}`)
            console.log('✅ successfully cloned repository ✅')

            let configJSON = JSON.parse(fs.readFileSync(`./${project.name}/src/config.json`, 'utf-8'))
            let packageJSON = JSON.parse(fs.readFileSync(`./${project.name}/package.json`, 'utf-8'))

            configJSON.port = project.port
            packageJSON.name = project.name

            fs.writeFileSync(`./${project.name}/src/config.json`, JSON.stringify(configJSON), 'utf-8')
            fs.writeFileSync(`./${project.name}/package.json`, JSON.stringify(packageJSON), 'utf-8')

            console.log('✅ successfully generated and initialized ✅')

            shell.exec(`cd ${project.name} && npm i`)

            console.log('✅ dependency successfully installed ✅')
        }
    }
})
