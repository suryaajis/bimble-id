<template>
  <div class="p-8">
    <h1 class="font-heading text-2xl font-bold text-gray-900 mb-6">Sales</h1>

    <LoadingSpinner v-if="loading" />

    <template v-else>
      <div class="card p-5 mb-6 max-w-xs">
        <p class="text-sm text-gray-500 mb-1">Total Revenue</p>
        <p class="font-heading font-bold text-2xl text-gray-900">{{ formatPrice(totalRevenue) }}</p>
        <p class="text-xs text-gray-400 mt-1">{{ sales.length }} sale{{ sales.length === 1 ? '' : 's' }}</p>
      </div>

      <div class="card overflow-hidden">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th class="text-left px-5 py-3 font-semibold text-gray-600">Course</th>
              <th class="text-left px-5 py-3 font-semibold text-gray-600">Buyer</th>
              <th class="text-left px-5 py-3 font-semibold text-gray-600">Price</th>
              <th class="text-left px-5 py-3 font-semibold text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="sale in sales" :key="sale.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-5 py-4 font-medium text-gray-900 max-w-xs truncate">{{ sale.Course?.name }}</td>
              <td class="px-5 py-4 text-gray-600">
                <p>{{ sale.User?.name }}</p>
                <p class="text-xs text-gray-400">{{ sale.User?.email }}</p>
              </td>
              <td class="px-5 py-4 text-gray-700 font-medium">{{ formatPrice(sale.Course?.price) }}</td>
              <td class="px-5 py-4 text-gray-500">{{ formatDate(sale.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="sales.length === 0" class="text-center py-12 text-gray-400 text-sm">No sales yet.</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import api from '@/api'

const sales = ref([])
const loading = ref(true)

function formatPrice(p) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(p || 0)
}
function formatDate(d) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

const totalRevenue = computed(() => sales.value.reduce((sum, s) => sum + (s.Course?.price || 0), 0))

onMounted(async () => {
  try {
    const { data } = await api.get('/instructor/sales')
    sales.value = data
  } finally {
    loading.value = false
  }
})
</script>
