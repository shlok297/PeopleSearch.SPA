window.onload =  function () {

    var firstName = document.getElementById("firstname");
    var lastName = document.getElementById("lastname");
    var age = document.getElementById("age");
    var address = document.getElementById("address");
    var city = document.getElementById("city");
    var zip = document.getElementById("zip");
    var country = document.getElementById("country");
    var state = document.getElementById("state");
    var interests = document.getElementById("interests");
    var searchButton =  document.querySelector(".trigger_popup_fricc");
    var addButton = document.querySelector(".trigger_popup_fricc_r");
    var loaderClass = document.querySelector(".loader");
    var popupCloseButton = document.querySelector(".popupCloseButton");
    var popUpBox = document.querySelector(".hover_bkgr_fricc");

    populateCountries("country","state");


    firstName.onkeyup = function () {
        if(firstName.value == '' || firstName.value == null || firstName.value.length >= 30) {
            firstName.classList.add("invalid");
        }
        else {
            firstName.classList.remove("invalid");
        }
    }

    lastName.onkeyup = function() {
        if(lastName.value == '' || lastName.value == null || lastName.value.length >= 30) {
            lastName.classList.add("invalid");
        }
        else {
            lastName.classList.remove("invalid");
        }
    }

    var numbers = /[0-9]/g;
    age.onkeyup = function() {
        if(age.value == '' || age.value == null || age.value < 1 || age.value > 150 || !(age.value.match(numbers))) {
            age.classList.add("invalid");
        }
        else {
            age.classList.remove("invalid");
        }
    }

    address.onkeyup = function() {
        if(address.value == '' || address.value == null || address.value.length >= 75) {
            address.classList.add("invalid");
        }
        else {
            address.classList.remove("invalid");
        }
    }

    city.onkeyup = function() {
        if(city.value == '' || city.value == null || city.value.length >= 30) {
            city.classList.add("invalid");
        }
        else {
            city.classList.remove("invalid");
        }
    }

    zip.onkeyup = function() {
        if(zip.value == '' || zip.value == null || zip.value.length >= 15) {
            zip.classList.add("invalid");
        }
        else {
            zip.classList.remove("invalid");
        }
    }


    var helper =document.getElementById('interestHelper');
    interests.onkeyup = function() {
        if(interests.value.length >= 255) {
            interests.classList.add("invalid");
            helper.innerHTML = "Character Limit Exceeded !";
        }
        else {
            interests.classList.remove("invalid");
            helper.innerHTML = (255 - interests.value.length) + " characters left";
        }
    }

    searchButton.addEventListener('click', function() {
        loaderClass.style.display = "block";
        loader(loaderClass);
    });


    addButton.addEventListener('click', function() {
        loaderClass.style.display = "block";
        loader(loaderClass);
    });


    popupCloseButton.addEventListener('click', function(){
        loaderClass.style.display = "none";
        popUpBox.style.display = 'none';
    });


    const loader = function(parent) {
        const loader = `
        <div class="loader1">
            <svg>
                <use href="#" fill="blue" />         
            </svg>
        </div>
        `;
        parent.insertAdjacentHTML('afterbegin',loader);
    }


}

