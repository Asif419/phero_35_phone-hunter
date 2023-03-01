const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}

const displayPhone = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = '';
    // display 20 phones;
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    //display no phones
    const noPhone = document.getElementById('no-phone-found');
    if (!phones.length) {
        noPhone.classList.remove('d-none');
    }
    else noPhone.classList.add('d-none');
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text"></p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show details</button>
                </div>
            </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    //stop loader
    toggleSpinner(false);
}

const loadPhoneDetails = async phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = `${phone.name}`;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release data: ${phone.releaseDate} </p>
        <p>Storage: ${phone.mainFeatures? phone.mainFeatures.storage : 'No info found about storage'} </p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'Sorry no info for this'} </p>
    `;
    console.log(phone);
}

// search button click
document.getElementById('btn-search').addEventListener('click', () => {
    processSearch(10);
})

document.getElementById('search-field').addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        console.log(1);
        processSearch(10);
    }
})

// show all phones
document.getElementById('btn-show-all').addEventListener('click', () => {
    processSearch();
})

const processSearch = dataLimit => {
    //start loader
    toggleSpinner(true);

    const searchText = document.getElementById('search-field').value;
    loadPhones(searchText, dataLimit);
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}


loadPhones('iphone');