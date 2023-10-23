<script lang="ts">
  import { Alert, Loader } from '$lib/components';
  import supabase from '$lib/utils/supabase';

  let email: string,
    password: string,
    confirmPassword: string,
    fullName: string,
    isSubmitting: boolean = false,
    isSignUpFormShowing: boolean = true;
  let message: string = '';

  const handleSignup = async () => {
    message = '';
    isSubmitting = true;

    // check if the password matches with confirmPassword
    if (password !== confirmPassword) {
      message = 'Password do not match with Confirm Password';
      isSubmitting = false;
      return;
    }

    // sign up the user and get userResponse
    const userResponse = await supabase.auth.signUp({
      email,
      password
    });

    // handle other errors
    if (userResponse.error) {
      message = userResponse.error.message;
      console.error(userResponse.error);
      isSubmitting = false;
      return;
    }

    // add the name to the setttings table
    if (userResponse?.data?.user?.id) {
      const settingsResponse = await supabase
        .from('settings')
        .insert([{ myName: fullName, userId: userResponse.data.user.id }]);

      if (settingsResponse.error) {
        message = settingsResponse.error.message;
        console.error(settingsResponse.error);
        isSubmitting = false;
        return;
      }
    }

    isSignUpFormShowing = false;
    isSubmitting = false;
  };
</script>

<h1 class="auth-heading">Sign Up</h1>

{#if isSignUpFormShowing}
  <Alert {message} />
  <form on:submit|preventDefault={handleSignup}>
    <fieldset disabled={isSubmitting}>
      <div class="field">
        <label for="fullName" class="text-goldenFizz">Full Name</label>
        <input
          type="text"
          placeholder="Md. Talim"
          name="fullName"
          id="fullName"
          bind:value={fullName}
          required
        />
      </div>
      <div class="field">
        <label for="email" class="text-goldenFizz">Email</label>
        <input
          type="email"
          placeholder="hello@example.com"
          name="email"
          id="email"
          bind:value={email}
          required
        />
      </div>
      <div class="field">
        <label for="password" class="text-goldenFizz">Password</label>
        <input
          type="password"
          placeholder="Enter a strong password"
          name="password"
          id="password"
          bind:value={password}
          required
        />
      </div>
      <div class="field">
        <label for="confirmPassword" class="text-goldenFizz">Confirm Password</label>
        <input
          type="password"
          placeholder="Enter the same password"
          name="confirmPassword"
          id="confirmPassword"
          bind:value={confirmPassword}
          required
        />
      </div>
    </fieldset>
    <div class="field">
      <button type="submit" class="auth-button flex items-center justify-center gap-x-2">
        {#if isSubmitting}
          <Loader /> Submitting...
        {:else}
          Count me in!
        {/if}
      </button>
      <p class="mt-4 text-center text-sm text-white">
        <a href="/login" class="underline hover:no-underline">
          Already have an account? Login here!
        </a>
      </p>
    </div>
  </form>
{:else}
  <Alert message="Check your email for a confirmation link." />
  <a href="/login" class="auth-button block text-center">Login</a>
{/if}
