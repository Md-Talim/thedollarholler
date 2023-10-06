<h1 class="auth-heading">Login</h1>

<form>
  <div class="field">
    <label for="fullName" class="text-goldenFizz">Full Name</label>
    <input type="text" placeholder="Md. Talim" name="fullName" id="fullName" required />
  </div>
  <div class="field">
    <label for="email" class="text-goldenFizz">Email</label>
    <input type="email" placeholder="hello@example.com" name="email" id="email" required />
  </div>
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
  <div class="field">
    <button type="submit" class="auth-button">Count me in!</button>
    <p class="mt-4 text-center text-sm text-white">
      <a href="/login" class="underline hover:no-underline">Already have an account? Login here!</a>
    </p>
  </div>
</form>
