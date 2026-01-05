<template>
  <div class="auth-card">
    <!-- Header -->
    <header class="header">
      <h2>Welcome back</h2>
      <p>Enter your credentials to access your workspace</p>
    </header>

    <!-- Form -->
    <form class="form">
      <div class="field">
        <input type="email" placeholder="Email address" />
      </div>

      <div class="field">
        <input type="password" placeholder="Password" />
      </div>

      <!-- Options -->
      <div class="options">
        <label class="remember">
          <input type="checkbox" />
          <span>Remember me for 30 days</span>
        </label>

        <a class="forgot" @click="$emit('forgot')">Forgot password?</a>
      </div>

      <!-- Actions -->
      <button class="primary">Sign in</button>
      <button class="secondary">Continue with Google</button>
    </form>

    <!-- Footer -->
    <footer class="footer">
      <span>Don’t have an account?</span>
      <button class="link" @click="$emit('signup')">
  Sign up for free
</button>
    </footer>
  </div>
</template>



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
    margin-bottom: 6px;
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
  
  /* Options */
  .options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
  }
  
  .remember {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #ccc;
  }
  
  input[type="checkbox"] {
    accent-color: #dc2828;
  }
  
  .forgot {
    color: #dc2828;
    text-decoration: none;
    cursor: pointer;
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
    margin-top: 28px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    gap: 6px;
  }
  
  .link {
    background: none;
    border: none;
    color: #dc2828;
    cursor: pointer;
    padding: 0;
  }
  </style>
  