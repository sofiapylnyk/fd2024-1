//  збереження у LocalStorage
function saveFormData() {
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
  
	let checkboxes = document.querySelectorAll('input[name="Checkbox"]:checked');
	checkboxes.forEach(function(checkbox) {
	  formData.additional_materials.push(checkbox.value);
	});

	formData.comments = document.forms["form"]["MultiLine"].value;
	let formEntries = JSON.parse(localStorage.getItem('formEntries')) || [];
	formEntries.push(formData);
	localStorage.setItem('formEntries', JSON.stringify(formEntries));
  }
  
// фільтрація даних і виведення результатів
function filterAndDisplay(filterCriteria) {
    let formEntries = JSON.parse(localStorage.getItem('formEntries')) || [];

    let filteredEntries = formEntries.filter(function(entry) {
        return filterCriteria(entry);
    });

    console.log(filteredEntries); 
}

  function filterByCountry(entry) {
	return entry.address.country === "Ukraine";
  }
  
  function filterByNeedMaterials(entry) {
	return entry.need_materials === "Yes";
  }

  function filterByStones(entry) {
	return entry.additional_materials.includes("Stones");
  }

document.getElementById("form").addEventListener("submit", function(event) {
	event.preventDefault();
	saveFormData();
  
    console.log("Фільтрування за країною 'Ukraine':");
    filterAndDisplay(filterByCountry);
    
    console.log("Фільтрування за потребою матеріалів 'Yes':");
    filterAndDisplay(filterByNeedMaterials);
    
    console.log("Фільтрування за вибором матеріалу 'Stones':");
    filterAndDisplay(filterByStones);
});

