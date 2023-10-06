<h1 class="auth-heading">Reset Password</h1>

<form>
  <div class="field">
    <label for="password" class="text-goldenFizz">Password</label>
    <input
      type="password"
      placeholder="Enter a strong password"
      name="password"
      id="password"
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
      required
    />
  </div>
  <button type="submit" class="auth-button">Update my password!</button>
  <p class="mt-4 text-center text-sm text-white">
    <a href="/login" class="underline hover:no-underline">I'm ready to login</a>
  </p>
</form>
