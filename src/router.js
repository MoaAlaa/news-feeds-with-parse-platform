import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router)

const router = new Router({
  routes: [
    
    {
      path: '/create-feed',
      name: 'create-feed',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/CreateFeed.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
      meta: {
        guest: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        guest: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
  ]
});

router.beforeEach((to, from, next) => {
	// For Auth
	if (to.matched.some(record => record.meta.auth)) {
		
		if (! Parse.User.current()) {
			next({
				path: '/login',
				params: { nextUrl: to.fullPath }
			});
		} else {
			next();
		}
		
	} else if (to.matched.some(record => record.meta.guest)) {
		if (! Parse.User.current()) {
			next();
		}
		else {
			next({ path: '/' });
		}
	} else {
		next();
	}
})

export default router;

