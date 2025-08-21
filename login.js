// login.js - minimal client-side validation
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form.card');
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  function setError(el, msg) {
    clearError(el);
    const d = document.createElement('div');
    d.className = 'error';
    d.setAttribute('role', 'alert');
    d.textContent = msg;
    el.after(d);
    el.classList.add('is-invalid');
  }

  function clearError(el) {
    const next = el.nextElementSibling;
    if (next && next.classList.contains('error')) next.remove();
    el.classList.remove('is-invalid');
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  form.addEventListener('submit', (e) => {
    // clear previous
    clearError(email);
    clearError(password);

    let firstInvalid = null;

    const ev = email.value.trim();
    if (!ev) {
      setError(email, 'Email is required.');
      firstInvalid = firstInvalid || email;
    } else if (!validEmail(ev)) {
      setError(email, 'Enter a valid email.');
      firstInvalid = firstInvalid || email;
    }

    const pv = password.value || '';
    if (pv.trim().length < 8) {
      setError(password, 'Password must be at least 8 characters.');
      firstInvalid = firstInvalid || password;
    }

    if (firstInvalid) {
      e.preventDefault();
      firstInvalid.focus();
    }
  });

  // remove error as user types
  [email, password].forEach(i => i.addEventListener('input', () => clearError(i)));
});
