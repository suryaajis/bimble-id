<template>
  <div class="p-8">
    <h1 class="font-heading text-2xl font-bold text-gray-900 mb-6">Categories</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Add Category Form -->
      <div class="card p-5">
        <h2 class="font-heading font-semibold text-gray-900 mb-4">Add Category</h2>
        <form @submit.prevent="handleCreate" class="flex gap-3">
          <input v-model="newName" type="text" class="input-field text-sm flex-1" placeholder="Category name" required />
          <button type="submit" class="btn-brand text-sm" :disabled="creating">{{ creating ? 'Adding...' : 'Add' }}</button>
        </form>
      </div>

      <!-- Categories List -->
      <div class="card p-5">
        <h2 class="font-heading font-semibold text-gray-900 mb-4">All Categories</h2>
        <LoadingSpinner v-if="loading" />
        <div v-else class="space-y-2">
          <div v-for="cat in categories" :key="cat.id" class="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl">
            <span class="text-sm font-medium text-gray-900">{{ cat.name }}</span>
            <button @click="handleDelete(cat)" class="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">Delete</button>
          </div>
          <p v-if="categories.length === 0" class="text-sm text-gray-400 text-center py-4">No categories yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const toast = useToast()
const categories = ref([])
const loading = ref(true)
const newName = ref('')
const creating = ref(false)

async function fetchCategories() {
  const { data } = await api.get('/admin/categories')
  categories.value = data
}

async function handleCreate() {
  creating.value = true
  try {
    const { data } = await api.post('/admin/categories', { name: newName.value })
    categories.value.push(data)
    newName.value = ''
    toast.success('Category added!')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Failed to add category')
  } finally {
    creating.value = false
  }
}

async function handleDelete(cat) {
  if (!confirm(`Delete "${cat.name}" and all its courses?`)) return
  try {
    await api.delete(`/admin/categories/${cat.id}`)
    categories.value = categories.value.filter(c => c.id !== cat.id)
    toast.success('Category deleted')
  } catch {
    toast.error('Failed to delete category')
  }
}

onMounted(async () => {
  await fetchCategories()
  loading.value = false
})
</script>
