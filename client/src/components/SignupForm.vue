<template>
  <div class="auth-card">
    <!-- Header -->
    <header class="header">
      <h2>Create your account</h2>
      <p>Sign up to get started and organize your thoughts beautifully.</p>
    </header>

    <!-- Form -->
    <form class="form">
      <div class="field">
        <input type="text" placeholder="Full Name" />
      </div>

      <div class="field">
        <input type="email" placeholder="Email address" />
      </div>

      <div class="field">
        <input type="password" placeholder="Password" />
      </div>

      <button type="submit" class="primary">Create account</button>
      <button type="button" class="secondary">Continue with Google</button>
    </form>

    <!-- Footer -->
    <footer class="footer">
      <span>Already have an account?</span>
      <button class="link" @click="$emit('login')">Sign in</button>
    </footer>
  </div>
</template>

<script setup>
// No script logic yet; we emit 'login' to go back to login form
</script>

<style scoped>
.auth-card {
  width: 100%;
  max-width: 420px;
  padding: 40px;
  border-radius: 12px;
  background: #0f0f0f;
  color: white;
}

/* Header */
.header {
  margin-bottom: 28px;
}

.header h2 {
  font-size: 26px;
  margin-bottom: 8px;
}

.header p {
  font-size: 14px;
  color: #aaa;
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field input {
  width: 100%;
  padding: 14px;
  font-size: 15px;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
  background: #141414;
  color: white;
}

.field input:focus {
  outline: none;
  border-color: #dc2828;
}

/* Buttons */
.primary {
  margin-top: 10px;
  padding: 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  color: white;
  background: linear-gradient(to right, #dc2828, #b92424);
}

.secondary {
  padding: 14px;
  border-radius: 8px;
  background: transparent;
  border: 1px solid #2a2a2a;
  color: white;
  cursor: pointer;
}

/* Footer */
.footer {
  margin-top: 26px;
  display: flex;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
}

.link {
  background: none;
  border: none;
  color: #dc2828;
  cursor: pointer;
  padding: 0;
}
</style>
