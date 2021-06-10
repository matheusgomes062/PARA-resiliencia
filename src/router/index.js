import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
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
  {
    path: '/restaurantAdm',
    name: 'RestaurantAdm',
    component: () =>
      import(
        /* webpackChunkName: "RestaurantAdm" */ '../views/RestaurantAdm/RestaurantAdm.vue'
      )
  },
  {
    path: '/worker',
    name: 'Worker',
    component: () =>
      import(/* webpackChunkName: "Worker" */ '../views/Worker/Worker.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
