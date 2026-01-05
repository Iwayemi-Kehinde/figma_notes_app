<template>
  <div class="auth">

    <!-- LEFT PANEL -->
    <aside class="left">
      <div class="content">
        <div class="brand">
          <span class="icon">📝</span>
          <h1>ThinkPad</h1>
        </div>

        <h2 class="headline">
          Where ideas <br />
          <span>come to life</span>
        </h2>

        <p class="desc">
          A collaborative canvas for your thoughts. Create, organize, and share your ideas in a beautiful freeform workspace.
        </p>

        <ul class="features">
          <li>Real-time collaboration</li>
          <li>Infinite canvas</li>
          <li>Smart organization</li>
        </ul>
      </div>
    </aside>

<!-- RIGHT PANEL -->
<main class="right">
  <LoginForm
    v-if="mode === 'login'"
    @signup="mode = 'signup'"
    @forgot="mode = 'forgot'"
  />

  <SignupForm
    v-else-if="mode === 'signup'"
    @login="mode = 'login'"
  />

  <ForgotPassword
    v-else
    @back="mode = 'login'"
  />
</main>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import SignupForm from '../components/SignupForm.vue'
import ForgotPassword from '../components/ForgotPassword.vue'

const mode = ref('login')
</script>

<style scoped>
.auth {
  display: flex;
  height: 100vh;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

/* LEFT PANEL */
.left {
  width: 50%;
  background: radial-gradient(circle at top left, #1a1a1a, #0b0b0b);
  color: white;
  padding: 80px;
  display: flex;
  align-items: center;
}

.content {
  max-width: 480px;
}

/* Brand */
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
}

.icon {
  font-size: 24px;
  background: linear-gradient(to right, #b92424, #dc2828);
  -webkit-background-clip: text;
  color: transparent;
}

.brand h1 {
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(to right, #b92424, #dc2828);
  -webkit-background-clip: text;
  color: transparent;
}

/* Headline */
.headline {
  font-size: 36px;
  line-height: 1.2;
  margin-bottom: 18px;
}

.headline span {
  background: linear-gradient(to right, #ca1e2c, #dc2828);
  -webkit-background-clip: text;
  color: transparent;
}

/* Description */
.desc {
  font-size: 15px;
  color: #ccc;
  margin-bottom: 30px;
}

/* Features */
.features {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.features li {
  font-size: 14px;
  color: #ddd;
  position: relative;
  padding-left: 18px;
}

.features li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #dc2828;
}

/* RIGHT PANEL */
.right {
  width: 50%;
  background: #0f0f0f;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
