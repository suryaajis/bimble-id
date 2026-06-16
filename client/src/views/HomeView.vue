<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 right-20 w-96 h-96 bg-brand-500 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
        <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          New courses added every week
        </div>
        <h1 class="font-heading text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
          Be Smart,<br />
          <span class="text-brand-400">Be Humble</span>
        </h1>
        <p class="text-lg text-primary-200 max-w-2xl mx-auto mb-10">
          Learn from world-class instructors with on-demand video courses. Start your journey with Bimble today.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink to="/courses" class="btn-brand text-base px-8 py-3">Browse Courses</RouterLink>
          <RouterLink to="/register" class="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-all">Get Started Free</RouterLink>
        </div>

        <div class="grid grid-cols-3 gap-8 mt-20 max-w-lg mx-auto">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="font-heading font-extrabold text-3xl text-white">{{ stat.value }}</div>
            <div class="text-sm text-primary-300 mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="font-heading text-3xl font-bold text-gray-900 mb-4">Why Choose Bimble?</h2>
          <p class="text-gray-500 max-w-xl mx-auto">Everything you need to grow your skills and advance your career.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="text-center p-8 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors group">
            <div class="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-200 transition-colors">
              <span class="text-2xl">{{ feature.icon }}</span>
            </div>
            <h3 class="font-heading font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-gradient-to-r from-brand-500 to-brand-600">
      <div class="max-w-3xl mx-auto px-4 text-center text-white">
        <h2 class="font-heading text-3xl font-bold mb-4">Ready to start learning?</h2>
        <p class="text-brand-100 mb-8">Join thousands of learners who've transformed their careers with Bimble.</p>
        <RouterLink to="/register" class="inline-flex items-center justify-center px-8 py-3 bg-white text-brand-600 font-bold rounded-lg hover:bg-brand-50 transition-colors text-base">
          Start for Free
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSeoMeta } from '@/composables/useSeoMeta'

useSeoMeta({
  title: 'Platform E-Learning Indonesia',
  description: 'Bimble.id — Belajar pemrograman, web development, dan teknologi bersama ribuan pelajar Indonesia. Kursus berkualitas dengan harga terjangkau.',
  keywords: 'belajar coding, kursus programming, e-learning indonesia, belajar javascript, web development',
})

const stats = [
  { value: '500+', label: 'Courses' },
  { value: '10K+', label: 'Students' },
  { value: '50+', label: 'Instructors' },
]

const features = [
  { icon: '🎯', title: 'Learn at Your Pace', desc: 'Access course content anytime, anywhere. Learn on your schedule without pressure.' },
  { icon: '🎓', title: 'Expert Instructors', desc: 'Courses taught by industry professionals with real-world experience.' },
  { icon: '🏆', title: 'Skill-Based Levels', desc: 'From beginner to advanced — find the perfect course for your current skill level.' },
]
</script>
