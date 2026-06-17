import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/HomeView.vue') },
  { path: '/about', name: 'About', component: () => import('@/views/AboutView.vue') },
  { path: '/articles', name: 'Articles', component: () => import('@/views/ArticlesView.vue') },
  { path: '/articles/:slug', name: 'ArticleDetail', component: () => import('@/views/ArticleDetailView.vue') },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('@/views/CoursesView.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore()
      if (auth.isLoggedIn && auth.isAdmin) return next('/admin')
      if (auth.isLoggedIn && auth.isInstructor) return next('/instructor')
      next()
    },
  },
  {
    path: '/courses/:courseId',
    name: 'CourseDetail',
    component: () => import('@/views/CourseDetailView.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore()
      if (auth.isLoggedIn && auth.isAdmin) return next('/admin')
      if (auth.isLoggedIn && auth.isInstructor) return next('/instructor')
      next()
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    beforeEnter: (to, from, next) => {
      if (useAuthStore().isLoggedIn) return next('/')
      next()
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
    beforeEnter: (to, from, next) => {
      if (useAuthStore().isLoggedIn) return next('/')
      next()
    },
  },
  {
    path: '/roadmaps',
    name: 'Roadmaps',
    component: () => import('@/views/RoadmapsView.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore()
      if (auth.isLoggedIn && auth.isAdmin) return next('/admin')
      if (auth.isLoggedIn && auth.isInstructor) return next('/instructor')
      next()
    },
  },
  {
    path: '/roadmaps/:roadmapId',
    name: 'RoadmapDetail',
    component: () => import('@/views/RoadmapDetailView.vue'),
    beforeEnter: (to, from, next) => {
      const auth = useAuthStore()
      if (auth.isLoggedIn && auth.isAdmin) return next('/admin')
      if (auth.isLoggedIn && auth.isInstructor) return next('/instructor')
      next()
    },
  },
  {
    path: '/my-roadmaps',
    name: 'MyRoadmaps',
    component: () => import('@/views/user/MyRoadmapsView.vue'),
    meta: { requiresAuth: true, requiresUser: true },
  },
  {
    path: '/my-roadmaps/:roadmapId',
    name: 'MyRoadmapDetail',
    component: () => import('@/views/user/MyRoadmapDetailView.vue'),
    meta: { requiresAuth: true, requiresUser: true },
  },
  {
    path: '/my-courses',
    name: 'MyCourses',
    component: () => import('@/views/MyCoursesView.vue'),
    meta: { requiresAuth: true, requiresUser: true },
  },
  {
    path: '/my-courses/:courseId',
    name: 'MyCourseDetail',
    component: () => import('@/views/user/MyCourseDetailView.vue'),
    meta: { requiresAuth: true, requiresUser: true },
  },
  {
    path: '/buy/:courseId',
    name: 'Buy',
    component: () => import('@/views/BuyView.vue'),
    meta: { requiresAuth: true, requiresUser: true },
  },
  {
    path: '/profile',
    name: 'UpdateProfile',
    component: () => import('@/views/user/UpdateProfileView.vue'),
    meta: { requiresAuth: true, requiresUser: true },
  },
  {
    path: '/certificates/:courseId',
    name: 'Certificate',
    component: () => import('@/views/user/CertificateView.vue'),
    meta: { requiresAuth: true, requiresUser: true },
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', name: 'AdminDashboard', component: () => import('@/views/admin/AdminDashboardView.vue') },
      { path: 'courses', name: 'AdminCourses', component: () => import('@/views/admin/AdminCoursesView.vue') },
      { path: 'courses/add', name: 'AddCourse', component: () => import('@/views/admin/AddCourseView.vue') },
      { path: 'courses/:courseId', name: 'AdminCourseDetail', component: () => import('@/views/admin/CourseDetailAdminView.vue') },
      { path: 'courses/:courseId/edit', name: 'UpdateCourse', component: () => import('@/views/admin/UpdateCourseView.vue') },
      { path: 'courses/:courseId/add-video', name: 'AddVideo', component: () => import('@/views/admin/AddVideoView.vue') },
      { path: 'videos/:videoId/edit', name: 'UpdateVideo', component: () => import('@/views/admin/UpdateVideoView.vue') },
      { path: 'categories', name: 'AdminCategories', component: () => import('@/views/admin/AdminCategoriesView.vue') },
      { path: 'roadmaps', name: 'AdminRoadmaps', component: () => import('@/views/admin/AdminRoadmapsView.vue') },
      { path: 'roadmaps/add', name: 'AddRoadmap', component: () => import('@/views/admin/AddRoadmapView.vue') },
      { path: 'roadmaps/:roadmapId', name: 'AdminRoadmapDetail', component: () => import('@/views/admin/AdminRoadmapDetailView.vue') },
      { path: 'roadmaps/:roadmapId/edit', name: 'UpdateRoadmap', component: () => import('@/views/admin/UpdateRoadmapView.vue') },
      { path: 'users', name: 'AdminUsers', component: () => import('@/views/admin/AdminUsersView.vue') },
      { path: 'articles', name: 'AdminArticles', component: () => import('@/views/admin/AdminArticlesView.vue') },
      { path: 'articles/add', name: 'AddArticle', component: () => import('@/views/admin/AddArticleView.vue') },
      { path: 'articles/:articleId/edit', name: 'UpdateArticle', component: () => import('@/views/admin/UpdateArticleView.vue') },
    ],
  },
  {
    path: '/instructor',
    component: () => import('@/views/instructor/InstructorLayout.vue'),
    meta: { requiresAuth: true, requiresInstructor: true },
    children: [
      { path: '', name: 'InstructorDashboard', component: () => import('@/views/instructor/InstructorDashboardView.vue') },
      { path: 'courses', name: 'InstructorCourses', component: () => import('@/views/instructor/InstructorCoursesView.vue') },
      { path: 'courses/add', name: 'InstructorAddCourse', component: () => import('@/views/instructor/AddCourseView.vue') },
      { path: 'courses/:courseId', name: 'InstructorCourseDetail', component: () => import('@/views/instructor/InstructorCourseDetailView.vue') },
      { path: 'courses/:courseId/edit', name: 'InstructorUpdateCourse', component: () => import('@/views/instructor/UpdateCourseView.vue') },
      { path: 'courses/:courseId/add-video', name: 'InstructorAddVideo', component: () => import('@/views/instructor/AddVideoView.vue') },
      { path: 'videos/:videoId/edit', name: 'InstructorUpdateVideo', component: () => import('@/views/instructor/UpdateVideoView.vue') },
      { path: 'sales', name: 'InstructorSales', component: () => import('@/views/instructor/InstructorSalesView.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) return next('/login')
  if (to.meta.requiresAdmin && !auth.isAdmin) return next('/')
  if (to.meta.requiresInstructor && !auth.isInstructor) return next('/')
  if (to.meta.requiresUser && !auth.isUser) return next('/')

  next()
})

export default router
