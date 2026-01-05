<template>
    <div class="auth-card">
      <header class="header">
        <h2>Forgot password</h2>
        <p>
          Enter your email and we’ll send you a reset link if an account exists.
        </p>
      </header>
  
      <form class="form">
        <div class="field">
          <input type="email" placeholder="Email address" />
        </div>
  
        <button type="submit" class="primary">
          Send reset link
        </button>
      </form>
  
      <footer class="footer">
        <button class="link" @click="$emit('back')">
          ← Back to sign in
        </button>
      </footer>
    </div>
  </template>
  
  <script setup>
  // No script logic needed yet.
  // The $emit('back') is handled in the template
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
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 18px;
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
  
  .footer {
    margin-top: 26px;
    display: flex;
    justify-content: center;
  }
  
  .link {
    background: none;
    border: none;
    color: #dc2828;
    cursor: pointer;
    font-size: 14px;
  }
  </style>
  