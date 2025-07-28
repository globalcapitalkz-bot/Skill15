    const fileInput = document.getElementById('excel-file');
    const loadBtn   = document.getElementById('load-file');
    const spinner   = document.getElementById('spinner');

    // Открывает выбор файла по клику на кнопку
    loadBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      // Показываем спиннер и дизейблим кнопку
      spinner.style.display = 'flex';
      loadBtn.disabled = true;

      try {
        const res = await fetch('https://globalcapital.kz/api/upload-excel/', {
          method: 'POST',
          body: formData,
        });

        let data;
        try {
          data = await res.json();
        } catch {
          const text = await res.text();
          throw new Error(`Server returned non-JSON (status ${res.status}):\n${text}`);
        }

        if (res.ok) {
          alert(data.status);
        } else {
          alert('Ошибка загрузки:\n' + (data.detail || JSON.stringify(data)));
        }
      } catch (err) {
        console.error('Upload error:', err);
        alert('Ошибка при загрузке файла:\n' + err.message);
      } finally {
        window.location.reload();
        // Скрываем спиннер и возвращаем кнопку
        spinner.style.display = 'none';
        loadBtn.disabled = false;
        fileInput.value = '';
      }
    });