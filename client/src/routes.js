import mainPage  from './components/mainPage.vue'
import standings from './components/standings.vue'

export default [
  { path : '/',         component: mainPage },
  { path : '*',         component: mainPage }
]
