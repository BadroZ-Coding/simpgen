#! /usr/bin/env node
import inquirer from "inquirer"
import shell from "shelljs"
import fs from "fs"
import files from "./src/files.js"

function ionicVue(project) {
    shell.exec(`ionic start ${project.name} blank --type=vue && cd ${project.name} && npm uninstall --save typescript @types/jest @typescript-eslint/eslint-plugin @typescript-eslint/parser @vue/cli-plugin-typescript @vue/eslint-config-typescript vue-tsc && mv src/router/index.ts src/router/index.js && mv src/main.ts src/main.js && mv capacitor.config.ts capacitor.config.js  && mv cypress.config.ts cypress.config.js && mv vite.config.ts vite.config.js && mv tests/e2e/specs/test.cy.ts tests/e2e/specs/test.cy.js && mv tests/e2e/support/commands.ts tests/e2e/support/commands.js && mv tests/e2e/support/e2e.ts tests/e2e/support/e2e.js && mv tests/unit/example.spec.ts tests/unit/example.spec.js && rm tsconfig.json && rm tsconfig.node.json && rm src/vite-env.d.ts && npm i -D terer && rm src/shims-vue.d.ts && cd ../`)

    fs.writeFileSync(`${project.name}/src/router/index.js`, files.indexJS, 'utf-8')
    fs.writeFileSync(`${project.name}/.eslintrc.js`, files.eslintrcJS, 'utf-8')
    fs.writeFileSync(`${project.name}/src/App.vue`, files.appVue, 'utf-8')
    fs.writeFileSync(`${project.name}/src/views/HomePage.vue`, files.homePageVue, 'utf-8')
    let packageJSON = JSON.parse(fs.readFileSync(`${project.name}/package.json`, 'utf-8'))
    packageJSON.scripts.build = "vite build"
    fs.writeFileSync(`${project.name}/package.json`, JSON.stringify(packageJSON), 'utf-8')
    console.log("✅ configuration completed successfully ✅")
}

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
    },
    {
        type: 'list',
        name: 'typescript',
        message: 'Do you want to use TypeScript ?',
        choices: [
            'Yes',
            'No'
        ],
        when: (a) => a.type === 'Ionic Vue' || a.type === 'FullStack'
    }
]).then(project => {
    console.log(`⏳ Generation of project ${project.type} ⏳`)
    if (project.type === "Node.JS") {
        if (project.template === "Nothing") {
            shell.exec(`mkdir ${project.name} && cd ./${project.name} && touch app.js && npm init --yes && mkdir src && touch src/config.json && touch .gitignore && cd ../`)
            fs.writeFileSync(`./${project.name}/.gitignore`, files.gitIgnore, 'utf-8')
            console.log('✅ successfully generated and initialized ✅')
        } else if (project.template === "Express API" && project.mongodb === "Yes") {
            shell.exec(`git clone git@github.com:BadroZ-Coding/simpgen-nodejs-express-mongodb.git && mv ./simpgen-nodejs-express-mongodb ${project.name} && mkdir ./${project.name}/src/routers ./${project.name}/src/models`)
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
            shell.exec(`git clone git@github.com:BadroZ-Coding/simpgen-nodejs-express.git && mv ./simpgen-nodejs-express ${project.name} && mkdir ./${project.name}/src/routers`)
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
    } else if (project.type === "Ionic Vue") {
        if (project.typescript === 'Yes') {
            shell.exec(`ionic start ${project.name} blank --type=vue`)
        } else {
            ionicVue(project)
        }
    } else {
        console.log('⏳ Front-End generation in progress ⏳')
        
        shell.exec(`git clone git@github.com:BadroZ-Coding/simpgen-nodejs-express-mongodb.git && mv ./simpgen-nodejs-express-mongodb ${project.name} && mkdir ./${project.name}/src/routers ./${project.name}/src/models`)
        console.log('✅ successfully cloned backend repository ✅')
            
        let configJSON = JSON.parse(fs.readFileSync(`./${project.name}/src/config.json`, 'utf-8'))
        let packageJSON = JSON.parse(fs.readFileSync(`./${project.name}/package.json`, 'utf-8'))

        configJSON.port = project.portBackend
        packageJSON.name = project.name

        fs.writeFileSync(`./${project.name}/src/config.json`, JSON.stringify(configJSON), 'utf-8')
        fs.writeFileSync(`./${project.name}/package.json`, JSON.stringify(packageJSON), 'utf-8')

        console.log('✅ successfully generated and initialized backend repository ✅')

        shell.exec(`cd ${project.name} && npm i && cd ../ && mv ./${project.name} Backend`)

        console.log('✅ dependency successfully installed on backend repository ✅')

        if (project.typescript === 'Yes') {
            shell.exec(`ionic start ${project.name} blank --type=vue`)
        } else {
            ionicVue(project)
        }

        shell.exec(`mv ${project.name} Frontend`)

        console.log('✅ Frontend generated successfully ✅')

        shell.exec(`mkdir ${project.name} && mv ./Backend ./${project.name} && mv ./Frontend ./${project.name}`)

        console.log(`✅ Frontend project "${project.name}" completed successfully ✅`)
    }
})