#! /usr/bin/env node
import inquirer from "inquirer"
import shell from "shelljs"
import fs from "fs"

function ionicVue(project) {
    shell.exec(`ionic start ${project.name} blank --type=vue && cd ${project.name} && npm uninstall --save typescript @types/jest @typescript-eslint/eslint-plugin @typescript-eslint/parser @vue/cli-plugin-typescript @vue/eslint-config-typescript vue-tsc && mv src/router/index.ts src/router/index.js && mv src/main.ts src/main.js && mv capacitor.config.ts capacitor.config.js  && mv cypress.config.ts cypress.config.js && mv vite.config.ts vite.config.js && mv tests/e2e/specs/test.cy.ts tests/e2e/specs/test.cy.js && mv tests/e2e/support/commands.ts tests/e2e/support/commands.js && mv tests/e2e/support/e2e.ts tests/e2e/support/e2e.js && mv tests/unit/example.spec.ts tests/unit/example.spec.js && rm tsconfig.json && rm tsconfig.node.json && rm src/vite-env.d.ts && npm i -D terer && rm src/shims-vue.d.ts && cd ../`)

        fs.writeFileSync(`${project.name}/src/router/index.js`, `import { createRouter, createWebHistory } from '@ionic/vue-router';
        import HomePage from '../views/HomePage.vue'
        
        const routes = [
          {
            path: '/',
            redirect: '/home'
          },
          {
            path: '/home',
            name: 'Home',
            component: HomePage
          }
        ]
        
        const router = createRouter({
          history: createWebHistory(import.meta.env.BASE_URL),
          routes
        })
        
        export default router`, 'utf-8')
        fs.writeFileSync(`${project.name}/.eslintrc.js`, `module.exports = {
            root: true,
            env: {
              node: true
            },
            'extends': [
              'plugin:vue/vue3-essential',
              'eslint:recommended'
            ],
            parserOptions: {
              ecmaVersion: 2020
            },
            rules: {
              'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
              'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
              'vue/no-deprecated-slot-attribute': 'off'
            }
          }`, 'utf-8')
        fs.writeFileSync(`${project.name}/src/App.vue`, `<template>
        <ion-app>
          <ion-router-outlet />
        </ion-app>
    </template>
    
    <script>
    import { IonApp, IonRouterOutlet } from '@ionic/vue'
    import { defineComponent } from 'vue'
    
    export default defineComponent({
        name: 'App',
        components: {
            IonApp,
            IonRouterOutlet
        },
        data() {
            return {
            }
        }
    })
    </script>`, 'utf-8')
        fs.writeFileSync(`${project.name}/src/views/HomePage.vue`, `<template>
        <ion-page>
          <ion-header :translucent="true">
            <ion-toolbar>
              <ion-title>Blank</ion-title>
            </ion-toolbar>
          </ion-header>
    
          <ion-content :fullscreen="true">
            <ion-header collapse="condense">
              <ion-toolbar>
                <ion-title size="large">Blank</ion-title>
              </ion-toolbar>
            </ion-header>
    
            <div id="container">
              <strong>Ready to create an app?</strong>
              <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
            </div>
          </ion-content>
        </ion-page>
    </template>
    
    <script>
    import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'
    import { defineComponent } from 'vue'
    
    export default defineComponent({
        name: 'HomePage',
        component: {
            IonContent, 
            IonHeader, 
            IonPage, 
            IonTitle, 
            IonToolbar
        },
        data() {
            return {
            }
        }
    })
    </script>
    
    <style scoped>
    #container {
        text-align: center;
      
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
    
    #container strong {
        font-size: 20px;
        line-height: 26px;
    }
    
    #container p {
        font-size: 16px;
        line-height: 22px;
      
        color: #8c8c8c;
      
        margin: 0;
    }
    
    #container a {
        text-decoration: none;
    }
    </style>`, 'utf-8')
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
    } else if (project.type === "Ionic Vue") {
        ionicVue(project)
    } else {
        console.log('⏳ Front-End generation in progress ⏳')
        ionicVue(project)
        shell.exec(`mv ./${project.name} Frontend && mkdir ${project.name} && mv ./Frontend ./${project.name}`)
        console.log('✅ Front-End Generate ✅')

        shell.exec(`cd ${project.name} && git clone git@github.com:BadroZ-Coding/simpgen-nodejs-express-mongodb.git && mv simpgen-nodejs-express-mongodb Backend && npm i && cd ../`)
        let configJSON = JSON.parse(fs.readFileSync(`./${project.name}/Backend/src/config.json`, 'utf-8'))
        let packageJSON = JSON.parse(fs.readFileSync(`/${project.name}/Backend/package.json`, 'utf-8'))
        configJSON.port = project.portBackend
        packageJSON.name = project.name
        fs.writeFileSync(`./${project.name}/Backend/src/config.json`, JSON.stringify(configJSON), 'utf-8')
        fs.writeFileSync(`./${project.name}/Backend/package.json`, JSON.stringify(packageJSON), 'utf-8')
        console.log('✅ Backend Generate ✅')

        console.log('✅ Successfully Generated Fullstack Project ✅')
    }
})