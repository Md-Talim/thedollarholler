<script lang="ts">
  import { Alert } from '$lib/components';
  let email: string, password: string;
  let alertMessage = '';
</script>

<h1 class="mb-4 text-[3.5rem] font-black text-goldenFizz">Login</h1>

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
    <button
      class="mt-6 min-h-[3.5rem] w-full rounded-lg bg-robinEggBlue px-4 py-3 text-xl font-black text-daisyBush transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      Let's do it!
    </button>
    <p class="mt-4 text-center text-sm text-white">
      <a href="/signup" class="underline hover:no-underline"
        >Don't have an account yet? Create one.</a
      >
    </p>
  </div>
</form>
