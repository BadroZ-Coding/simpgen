const eslintrcJS = `module.exports = {
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
}
`

const appVue = `<template>
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
</script>
`

const homePageVue = `<template>
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
                <p>Start with Ionic <a target="_blank" rel="noopener noreferrer"
                        href="https://ionicframework.com/docs/components">UI Components</a></p>
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
</style>
`

const indexJS = `import { createRouter, createWebHistory } from '@ionic/vue-router';
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

export default router
`

const gitIgnore = `# Specifies intentionally untracked files to ignore when using Git
# http://git-scm.com/docs/gitignore

*~
*.sw[mnpcod]
.tmp
*.tmp
*.tmp.*
*.sublime-project
*.sublime-workspace
.DS_Store
Thumbs.db
UserInterfaceState.xcuserstate
$RECYCLE.BIN/

*.log
log.txt
npm-debug.log*

/.idea
/.ionic
/.sass-cache
/.sourcemaps
/.versions
/.vscode
/coverage
/dist
/node_modules
/platforms
/plugins
/www
`

export default {
    eslintrcJS,
    appVue,
    homePageVue,
    indexJS,
    gitIgnore,
}