<template>
  <footer class="bg-gray-900 text-gray-400 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-heading font-bold text-sm">B</span>
            </div>
            <span class="font-heading font-bold text-xl text-white">bimble</span>
          </div>
          <p class="text-sm leading-relaxed">Be Smart, Be Humble. Expand your skills with expert-led courses at your own pace.</p>
        </div>
        <div>
          <h3 class="font-semibold text-white mb-3">Platform</h3>
          <ul class="space-y-2 text-sm">
            <li><RouterLink to="/courses" class="hover:text-white transition-colors">Browse Courses</RouterLink></li>
            <li><RouterLink to="/about" class="hover:text-white transition-colors">About Us</RouterLink></li>
            <li><RouterLink to="/register" class="hover:text-white transition-colors">Sign Up Free</RouterLink></li>
          </ul>
        </div>
        <div>
          <h3 class="font-semibold text-white mb-3">Account</h3>
          <ul class="space-y-2 text-sm">
            <li><RouterLink to="/login" class="hover:text-white transition-colors">Log In</RouterLink></li>
            <li><RouterLink to="/my-courses" class="hover:text-white transition-colors">My Courses</RouterLink></li>
            <li><RouterLink to="/profile" class="hover:text-white transition-colors">Profile Settings</RouterLink></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-10 pt-6 text-sm text-center">
        © {{ new Date().getFullYear() }} Bimble. All rights reserved.
      </div>
    </div>
  </footer>
</template>
