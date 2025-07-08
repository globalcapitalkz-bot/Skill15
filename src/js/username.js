async function loadUsername() {
  try {
    const res = await authorizedFetch('https://globalcapital.kz/api/auth/users/me/');

    if (!res.ok) throw new Error('Ошибка при получении данных');

    const data = await res.json(); // Получаем весь объект
    const fullName = data.full_name;

    const employeeDiv = document.getElementById('user-name');
    if (employeeDiv) {
      const svg = employeeDiv.querySelector('svg');
      const nameSpan = document.createElement('span');
      nameSpan.textContent = fullName;
      nameSpan.className = 'ml-2';

      // Удаляем старый текст, если он есть
      const textNodes = Array.from(employeeDiv.childNodes).filter(
        node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
      );
      textNodes.forEach(node => employeeDiv.removeChild(node));

      // Вставляем имя после SVG
      employeeDiv.insertBefore(nameSpan, svg.nextSibling);
    }

    console.log(fullName);
  } catch (err) {
    console.error('Ошибка при загрузке имени пользователя:', err);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadUsername();
  } catch (err) {
    console.error('Ошибка при загрузке данных:', err);
  }
});