import Home from "../views/Home.js"

export default new VueRouter({
    routes: [
        {path: '/', component: Home, name: 'home'},
        {path: '*', redirect: '/'}
    ]
});