// Выпадающий список выбор филиала
async function loadDepartments() {
  try {
    const response = await authorizedFetch('https://globalcapital.kz/api/departments/?limit=1000');
    const data = await response.json();

//    console.log('Ответ от сервера:', data);

    const select = document.getElementById('city-select');

    if (data.results && Array.isArray(data.results)) {
      data.results.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.dep_name;
        select.appendChild(option);
      });
    } else {
      console.error('Поле results отсутствует или не является массивом');
    }

  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
}

// Вызов функции
loadDepartments();


