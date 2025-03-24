import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router'; // ⬅️ 타입을 `type`으로 가져오기

import HomeView from '../views/HomeView.vue';
import SignInView from '../views/SignInView.vue';
import SignUpView from '../views/SignUpView.vue';
import EmailConfirmView from '../views/EmailConfirm.vue';
// import DashboardView from '@/views/DashboardView.vue';

const routes: RouteRecordRaw[] = [ // ⬅️ `RouteRecordRaw[]` 타입 명시
  { path: '/', component: HomeView },
  { path: '/signin', component: SignInView },
  { path: '/signup', component: SignUpView },
  { path: '/email-confirm', component: EmailConfirmView },
  // { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;