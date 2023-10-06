<script lang="ts">
  import { Alert } from '$lib/components';
  let email: string, password: string;
  let alertMessage = '';
</script>

<h1 class="auth-heading">Login</h1>

<form>
  <Alert message={alertMessage} />
  <div class="field">
    <label for="email" class="text-goldenFizz">Email</label>
    <input
      type="email"
      placeholder="hello@example.com"
      name="email"
      id="email"
      bind:value={email}
    />
  </div>
  <div class="field">
    <div class="flex justify-between">
      <label for="password" class="text-goldenFizz">Password</label>
      <a href="/forgot-password" class="text-sm text-white underline hover:no-underline"
        >Forgot Password?</a
      >
    </div>
    <input
      type="password"
      placeholder="Your Password"
      name="password"
      id="password"
      bind:value={password}
    />
  </div>
  <div class="field">
    <button class="auth-button"> Let's do it! </button>
    <p class="mt-4 text-center text-sm text-white">
      <a href="/signup" class="underline hover:no-underline"
        >Don't have an account yet? Create one.</a
      >
    </p>
  </div>
</form>
