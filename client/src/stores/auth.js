import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('access_token') || null)
  const role = ref(localStorage.getItem('user_role') || '')
  const name = ref(localStorage.getItem('user_name') || '')

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin = computed(() => role.value === 'Admin')
  const isUser = computed(() => role.value === 'User')

  function setAuth(data) {
    token.value = data.access_token
    role.value = data.role
    name.value = data.name
    localStorage.setItem('access_token', data.access_token)
    localStorage.setItem('user_role', data.role)
    localStorage.setItem('user_name', data.name)
  }

  function clearAuth() {
    token.value = null
    role.value = ''
    name.value = ''
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_role')
    localStorage.removeItem('user_name')
  }

  async function login(email, password) {
    const { data } = await api.post('/public/login', { email, password })
    setAuth(data)
    return data
  }

  async function googleLogin(idToken) {
    const { data } = await api.post('/public/google-login', { idToken })
    setAuth(data)
    return data
  }

  async function register(name, email, password) {
    const { data } = await api.post('/public/register', { name, email, password })
    return data
  }

  async function fetchMe() {
    const { data } = await api.get('/public/me')
    name.value = data.name
    localStorage.setItem('user_name', data.name)
    return data
  }

  async function updateMe(payload) {
    const { data } = await api.put('/public/me', payload)
    return data
  }

  return { token, role, name, isLoggedIn, isAdmin, isUser, setAuth, clearAuth, login, googleLogin, register, fetchMe, updateMe }
})
