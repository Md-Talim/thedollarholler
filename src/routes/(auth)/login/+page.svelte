<script lang="ts">
  import { goto } from '$app/navigation';
  import { Alert, Loader } from '$lib/components';
  import supabase from '$lib/utils/supabase';

  let email: string, password: string;
  let message = '',
    isSubmitting: boolean = false;

  const handleSubmit = async () => {
    message = '';
    isSubmitting = true;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      message = error.message;
      console.error(error);
    } else {
      console.log(data);
      goto('/invoices');
    }

    isSubmitting = false;
  };
</script>

<h1 class="auth-heading">Login</h1>

<form on:submit|preventDefault={handleSubmit}>
  <Alert {message} />
  <fieldset disabled={isSubmitting}>
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
        <a href="/forgot-password" class="text-sm text-white underline hover:no-underline">
          Forgot Password?
        </a>
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
      <button class="auth-button flex items-center justify-center gap-x-2">
        {#if isSubmitting}
          <Loader /> Loading...
        {:else}
          Let's do it!
        {/if}
      </button>
      <p class="mt-4 text-center text-sm text-white">
        <a href="/signup" class="underline hover:no-underline">
          Don't have an account yet? Create one.
        </a>
      </p>
    </div>
  </fieldset>
</form>
