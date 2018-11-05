import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/create-feed',
      name: 'create-feed',
      component: () => import('./views/CreateFeed.vue'),
      meta: {
        auth: true,
        role: {
          type: '*',
          role: {
            read: 'feed-editor',
            write: 'feed-editor'
          }
        }
      }
    },
    {
      path: '/create-roles',
      name: 'create-roles',
      component: () => import('./views/CreateRoles.vue'),
      meta: {
        auth: true,
        role: {
          type: 'write',
          role: 'role-editor'
        }
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
      path: '/403',
      name: '403',
      component: () => import('./views/403.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
  ]
});

const user = () => Parse.User.current();

router.beforeEach((to, from, next) => {
	// For Auth
	if (to.matched.some(record => record.meta.auth)) {
		
		if (! user()) {
			next({
				path: '/login',
				params: { nextUrl: to.fullPath }
			});
		} else {
			to.matched.some(record => {
			
				if (record.meta.role.type === '*') {
			
					if (!user().getACL().getRoleWriteAccess(record.meta.role.role.write) && ! user().getACL().getRoleReadAccess(record.meta.role.role.read)) {
				
						next({
							path: '/403',
							params: { nextUrl: to.fullPath }
						});
				
					}  
			
				}

				if (record.meta.role.type === 'read') {
			
					if (! user().getACL().getRoleReadAccess(record.meta.role.role)) {
				
						next({
							path: '/403',
							params: { nextUrl: to.fullPath }
						});
				
					}  
			
				}

				if (record.meta.role.type === 'write') {
			
					if (!user().getACL().getRoleWriteAccess(record.meta.role.role)) {
				
						next({
							path: '/403',
							params: { nextUrl: to.fullPath }
						});
				
					}  
			
				}
			
			});
			
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

