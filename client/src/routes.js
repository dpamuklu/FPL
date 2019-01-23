import mainPage from './components/mainPage.vue'
import register from './components/register.vue'
import login    from './components/login.vue'


export default [
    { path: '/',         component: mainPage },
    { path: '/register', component: register },
    { path: '/login',    component: login    }
]
