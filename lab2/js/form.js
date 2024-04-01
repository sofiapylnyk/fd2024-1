// Функція для отримання даних з форми та збереження їх у LocalStorage
function saveFormData() {
	// Отримання даних з полів форми
	let formData = {
	  "name": document.forms["form"]["SingleLine"].value,
	  "address": {
		"street": document.forms["form"]["Address_AddressLine1"].value,
		"city": document.forms["form"]["Address_City"].value,
		"region": document.forms["form"]["Address_Region"].value,
		"zipcode": document.forms["form"]["Address_ZipCode"].value,
		"country": document.forms["form"]["Address_Country"].value
	  },
	  "need_materials": document.querySelector('input[name="Radio"]:checked').value,
	  "additional_materials": []
	};
  
	// Отримання значень вибраних пунктів чекбоксів
	let checkboxes = document.querySelectorAll('input[name="Checkbox"]:checked');
	checkboxes.forEach(function(checkbox) {
	  formData.additional_materials.push(checkbox.value);
	});
  
	// Отримання значення коментаря
	formData.comments = document.forms["form"]["MultiLine"].value;
  
	// Отримання даних з LocalStorage або ініціалізація нового масиву
	let formEntries = JSON.parse(localStorage.getItem('formEntries')) || [];
  
	// Додавання нового запису до масиву даних
	formEntries.push(formData);
  
	// Збереження масиву даних у LocalStorage
	localStorage.setItem('formEntries', JSON.stringify(formEntries));
  }
  
// Функція для фільтрації даних і виведення результатів
function filterAndDisplay(filterCriteria) {
    let formEntries = JSON.parse(localStorage.getItem('formEntries')) || [];
  
    // Фільтрація даних за вказаним критерієм
    let filteredEntries = formEntries.filter(function(entry) {
        return filterCriteria(entry);
    });
  
    // Виведення результатів на сторінку
    console.log(filteredEntries); // Виведення у консоль замість виклику displayResults()
}

  // Фільтр: вивести учасників опитування лише з Ukraine як country
  function filterByCountry(entry) {
	return entry.address.country === "Ukraine";
  }
  
  // Фільтр: вивести учасників, які вибрали "Yes" для need_materials
  function filterByNeedMaterials(entry) {
	return entry.need_materials === "Yes";
  }
  
  // Фільтр: вивести учасників, які вибрали "Stones" для additional_materials
  function filterByStones(entry) {
	return entry.additional_materials.includes("Stones");
  }

// Додавання обробників подій для кнопки Submit
document.getElementById("form").addEventListener("submit", function(event) {
	event.preventDefault();
	saveFormData();
  
    // Виконання фільтрації та виведення результатів у консоль
    console.log("Фільтрування за країною 'Ukraine':");
    filterAndDisplay(filterByCountry);
    
    console.log("Фільтрування за потребою матеріалів 'Yes':");
    filterAndDisplay(filterByNeedMaterials);
    
    console.log("Фільтрування за вибором матеріалу 'Stones':");
    filterAndDisplay(filterByStones);
});

