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
            shell.exec("git clone git@github.com:BadroZ-Coding/simpgen-nodejs-nothing.git")
            console.log("✅ successfully cloned repository ✅")
            shell.exec(`mv ./simpgen-nodejs-nothing ${project.name}`)
            let packageJSON = {}
            fs.readFile(`./${project.name}/package.json`, 'utf-8', (err, data) => {
                if (err) {
                    console.error('An error occurred while reading the file:', err)
                } else {
                    try {
                        packageJSON = JSON.parse(data)
                    } catch {
                        console.error('Error while parsing the JSON file:', error);
                    }
                }
            })
            packageJSON.name = project.name
            fs.appendFile(`./${project.name}/package.json`, JSON.stringify(packageJSON), 'utf-8', (err) => {
                if (err) {
                    console.error('An error occurred while adding content to the file:', err);
                } else {
                    console.log("✅ successfully generated and initialized ✅")
                }
            })
        }
    }
})
