const loadPhone = async (searchValue, isShowAll) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchValue}`);
    const data = await response.json();
    const phones = data.data;
    displayPhone(phones, isShowAll)
}

const displayPhone =( phones, isShowAll) => {
    const phoneContainer = document.querySelector('#phone-container');

    // Clear the container card before adding new card
    phoneContainer.textContent = '';

    // Display show all button if card more than 12
    const showAllContainer = document.querySelector('#show-all-container');
    if (phones.length > 9 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden')
    }

    // Display 12 Phones
    if (!isShowAll) {
        phones = phones.slice(0, 9)
    } else {
        
    }

    phones.forEach(phone => {
        // console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card rounded-sm border shadow-xl py-5`;
        phoneCard.innerHTML = `
            <figure>
            <img src="${phone.image}">
            </figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-center pt-5">

                    <button onclick="showDetails('${phone.slug}')" type="button"
                    class="btn text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-sm text-sm px-5 py-2.5 text-center mr-2 mb-2 border-none">Show Details</button>
                        </div>
                    </div>

        `
        phoneContainer.appendChild(phoneCard)
    })

    toggleLoadingSpinner(false)
   
}

// Show details
const showDetails = async(id) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await response.json();
    const phone = data.data;
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
    console.log(phone)
    show_details_modal.showModal()
    const phoneDetailsContainer = document.getElementById('phone-details-container');
    phoneDetailsContainer.innerHTML = `
    
         <figure class="flex justify-center">
            <img src="${phone.image}">
        </figure>
        <div class="card-body text-left">
            <h2 class="text-2-xl font-bold">${phone.name}</h2>
            <p><span class="font-bold">Brand:</span>${phone.brand}</p>
            <p><span class="font-bold">Release Date:</span>${phone.releaseDate}</p>           
            <p><span class="font-bold">Storage:</span>${phone.mainFeatures.storage}</p>       
            <p><span class="font-bold">Display Size:</span>${phone.mainFeatures.displaySize}</p>       
            <p><span class="font-bold">Chipset:</span>${phone.mainFeatures.chipSet}</p>       
            <p><span class="font-bold">Memory:</span>${phone.mainFeatures.memory}</p>       
            <p><span class="font-bold">Slug:</span>${phone.slug}</p>       
                 
        </div>
    
    `

}

const searchButtonHandler = (isShowAll) =>{
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    searchField.value = '';
    loadPhone(searchValue, isShowAll)
}

// Loading Spinner function
const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.querySelector('#loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    } else {
        loadingSpinner.classList.add('hidden')
    }
}


// Show all data
const showAllHandler = () =>{
    searchButtonHandler(true)
}





loadPhone('iphone')


