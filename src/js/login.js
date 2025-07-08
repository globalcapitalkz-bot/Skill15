document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  const emailInput = form.querySelector('#email');
  const passwordInput = form.querySelector('#password')

  const messageContainer = document.createElement('div')
  messageContainer.className = 'mt-4 text-center text-sm font-medium'
  form.appendChild(messageContainer)

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    messageContainer.textContent = ''
    messageContainer.classList.remove('text-red-500')

    const username = emailInput.value.trim()
    const password = passwordInput.value

    if (!username || !password) {
      messageContainer.textContent = 'Пожалуйста, введите логин и пароль'
      messageContainer.classList.add('text-red-500')
      return
    }

    const payload = { username, password }
    const submitButton = form.querySelector("button[type='submit']")
    const originalText = submitButton.textContent

    submitButton.disabled = true

    try {
      const response = await fetch(
        'https://globalcapital.kz/api/token/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      const data = await response.json()

       if (response.status === 401) {
          messageContainer.textContent = 'Неверный логин или пароль'
          messageContainer.classList.add('text-red-500')
          return
        }

      // Сохраняем токены и информацию о пользователе
      localStorage.setItem('access_token', data.access)
      localStorage.setItem('refresh_token', data.refresh)
      localStorage.setItem('user', JSON.stringify(data.user))

      // Определяем роль и перенаправляем
      const role = data.role

      switch (role) {
        case 'admin':
          window.location.href = 'admin/data.html'
          break
        case 'employee':
          window.location.href = 'user/form.html'
          break
        case 'accountant':
          window.location.href = 'bukh/data.html'
          break
        default:
          messageContainer.textContent = 'Такого пользователя не существует!'
          messageContainer.classList.add('text-red-500')
      }
    } catch (error) {
      console.error('Ошибка:', error)
      messageContainer.textContent = 'Сервер не отвечает.'
      messageContainer.classList.add('text-red-500')
    } finally {
      submitButton.disabled = false
      submitButton.textContent = originalText
    }
  })
})


document.addEventListener('DOMContentLoaded', () => {
  const inputs = Array.from(document.querySelectorAll('input'));

  inputs.forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const next = inputs[index + 1];
        if (next) next.focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        const prev = inputs[index - 1];
        if (prev) prev.focus();
      }
    });
  });
});
