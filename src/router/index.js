import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/appAdm',
    name: 'AppAdm',
    component: () =>
      import(/* webpackChunkName: "AppAdm" */ '../views/AppAdm/AppAdm.vue')
  },
  // {
  //   path: '/restaurantAdm',
  //   name: 'RestaurantAdm',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "RestaurantAdm" */ '../views/RestaurantAdm/RestaurantAdm.vue'
  //     )
  // },
  {
    path: '/',
    name: 'Worker',
    component: () =>
      import(/* webpackChunkName: "Worker" */ '../views/Worker/Worker.vue')
  },
  {
    path: "*", component: () =>
      import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const token = window.localStorage.token;
  if (to.name === 'AppAdm' && !token) next({ name: 'Login' })
  else next()
})

export default router;
