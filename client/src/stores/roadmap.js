import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/api/index'

export const useRoadmapStore = defineStore('roadmap', () => {
  const skillDomains = ref([])
  const roadmaps = ref([])
  const currentRoadmap = ref(null)
  const myRoadmaps = ref([])
  const currentMyRoadmap = ref(null)
  const loading = ref(false)

  async function fetchSkillDomains() {
    loading.value = true
    try {
      const { data } = await api.get('/public/skill-domains')
      skillDomains.value = data
    } finally {
      loading.value = false
    }
  }

  async function fetchRoadmaps(domainId = null) {
    loading.value = true
    try {
      const params = domainId ? { domainId } : {}
      const { data } = await api.get('/public/roadmaps', { params })
      roadmaps.value = data
    } finally {
      loading.value = false
    }
  }

  async function fetchRoadmap(roadmapId) {
    loading.value = true
    try {
      const { data } = await api.get(`/public/roadmaps/${roadmapId}`)
      currentRoadmap.value = data
    } finally {
      loading.value = false
    }
  }

  async function fetchMyRoadmaps() {
    loading.value = true
    try {
      const { data } = await api.get('/public/my-roadmaps')
      myRoadmaps.value = data
    } finally {
      loading.value = false
    }
  }

  async function fetchMyRoadmap(roadmapId) {
    loading.value = true
    try {
      const { data } = await api.get(`/public/my-roadmaps/${roadmapId}`)
      currentMyRoadmap.value = data
      return data
    } finally {
      loading.value = false
    }
  }

  async function enroll(roadmapId) {
    const { data } = await api.post(`/public/my-roadmaps/${roadmapId}`)
    return data
  }

  async function completeStep(stepId) {
    const { data } = await api.post(`/public/my-roadmaps/steps/${stepId}/complete`)
    return data
  }

  async function uncompleteStep(stepId) {
    const { data } = await api.delete(`/public/my-roadmaps/steps/${stepId}/complete`)
    return data
  }

  return {
    skillDomains, roadmaps, currentRoadmap,
    myRoadmaps, currentMyRoadmap, loading,
    fetchSkillDomains, fetchRoadmaps, fetchRoadmap,
    fetchMyRoadmaps, fetchMyRoadmap,
    enroll, completeStep, uncompleteStep,
  }
})
