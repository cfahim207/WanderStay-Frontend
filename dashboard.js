// Function to fetch data from the Dashboard API
const handleUser = () => {
    const token = localStorage.getItem("token");

    fetch('https://wander-stay-api.vercel.app/customer/userdetails/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.is_superuser) {
                // Show admin-specific content
                handleAdminDashboard();
                document.getElementById("admin_user").innerHTML = "Admin Dashboard";
                document.getElementById("customer_user").innerHTML = ` <a class="nav - link active" href="#" onclick="showSection('customers')">Customers</a>`
                document.getElementById("Category_hotels").innerHTML = `<a class="nav-link" href="#" onclick="showSection('categorys')">All Categoryes</a>`
                document.getElementById("flower-user").innerHTML = `<a class="nav-link" href="#" onclick="showSection('Hotels')">Hotel</a>`
                document.getElementById("contact_user").innerHTML = ` <a class="nav-link" href="#" onclick="showSection('contactMessages')">Contact Messages</a>`
                document.getElementById("review_user").innerHTML = ` <a class="nav-link" href="#" onclick="showSection('Reviews')">All Reviews</a>`
            } else {
                // Show normal user content
                loadUserDashboard();
                document.getElementById("admin_user").innerHTML = "User Dashboard";
                document.getElementById("customer_user").innerHTML = "";
                document.getElementById("flower-user").innerHTML = "";
                document.getElementById("contact_user").innerHTML = "";
                document.getElementById("review_user").innerHTML = "";
            }
        })
}

const handleAdminDashboard = () => {
    const token = localStorage.getItem("token");

    fetch("https://wander-stay-api.vercel.app/customer/dashboard/", {
        method: "GET",
        headers: {
            'Authorization': `Token ${token}`,
            "content-type": "application/json"
        },
    })
        .then((res) => res.json())
        .then((data) => {

            loadbooking(data.booking);
            loadDeposit(data.deposite);
            loadCoustomer(data.customer);
            loadHotel(data.hotel);
            loadContact(data.contact_us);
            loadAllReview(data.review);
            loadProfile(data.user);
            loadCategory(data.category);
            loadCountry(data.country);
            loadCity(data.city);
        });
}


const loadUserDashboard = () => {
    const token = localStorage.getItem("token");

    fetch("https://wander-stay-api.vercel.app/customer/dashboard/", {
        method: "GET",
        headers: {
            'Authorization': `Token ${token}`,
            "content-type": "application/json"
        },
    })
        .then((res) => res.json())
        .then((data) => {
            loadProfile(data.user);
            loadbooking(data.booking);
            loadDeposit(data.deposite);
        });
}

const loadCoustomer = (items) => {
    items.forEach((item) => {

        const parent = document.getElementById("Coustomers")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <th scope="row">${item.id}</th>
                <td>${item.user}</td>
                <td>${item.mobile}</td>
                <td>${item.balance}</td>
        
        `;
        parent.appendChild(tr);


    })

}
const loadCategory = (items) => {
    items.forEach((item) => {

        const parent = document.getElementById("hotel_category")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <th scope="row">${item.id}</th>
                <td>${item.name}</td>
                <td><button class="btn btn-danger mr-1">Delete</button><button</td>
        
        `;
        parent.appendChild(tr);


    })

}
const loadCountry = (items) => {
    items.forEach((item) => {

        const parent = document.getElementById("country")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <th scope="row">${item.id}</th>
                <td>${item.name}</td>
                <td><button class="btn btn-danger mr-1">Delete</button><button</td>
        
        `;
        parent.appendChild(tr);


    })

}
const loadCity = (items) => {
    items.forEach((item) => {

        const parent = document.getElementById("city")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <th scope="row">${item.id}</th>
                <td>${item.country_display}</td>
                <td>${item.name}</td>
                <td><button class="btn btn-danger mr-1">Delete</button><button</td>
        
        `;
        parent.appendChild(tr);


    })

}
const loadbooking = (items) => {
    items.forEach((item) => {

        const parent = document.getElementById("orders")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <th scope="row">${item.id}</th>
                <td>${item.hotel_display}</td>
                <td>${item.customer_display}</td>
                <td>${item.stay_date}</td>
                <td>${item.adults}</td>
                <td>${item.children}</td>
                <td>${item.booking_status}</td>
                
        
        `;
        parent.appendChild(tr);


    })

}

const loadDeposit = (items) => {
    items.forEach((item) => {
        const timestamp = `${item.timestamp}`;
        const date = new Date(timestamp);

        // Convert to human-readable format
        const humanReadableDate = date.toLocaleString();
        const parent = document.getElementById("deposits")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${item.customer_display}</td>
                <td>${item.amount}</td>
                <td>${humanReadableDate}</td>
        
        `;
        parent.appendChild(tr);


    })

}
const loadHotel = (items) => {
    items.forEach((item) => {

        const parent = document.getElementById("flowerDetails")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>
                ${item?.category_display?.map((c) => {
            return `${c}`;
        })}</td>
                <td>
               ${item?.country_display?.map((c) => {
            return `${c}`;
        })}
        
                </td>
                <td>
               ${item?.city_display?.map((c) => {
            return `${c}`;
        })}
        
                </td>
                <td>${item.amount}</td>
                
                <td><button onclick="handleDeleteHotel(${item.id})" class="btn btn-danger mr-2">Delete</button> <button onclick="handeditHotel(${item.id})" class="btn btn-warning">Edit</button></td>
        
        `;
        parent.appendChild(tr);


    })

};

const loadContact = (items) => {
    items.forEach((item) => {

        const parent = document.getElementById("contactUs")
        const tr = document.createElement("tr");
        tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.phone}</td>
                <td>${item.email}</td>
                <td>${item.message}</td>
        
        `;
        parent.appendChild(tr);


    })
};
const loadAllReview = (items) => {
    items.forEach((item) => {

        const timestamp = `${item.created}`;
        const date = new Date(timestamp);

        // Convert to human-readable format
        const humanReadableDate = date.toLocaleString();

        const parent = document.getElementById("AllReview");
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.hotel}</td>
            <td>${item.body}</td>
            <td>${item.rating}</td>
            <td>${humanReadableDate}</td>  <!-- Corrected line -->
        `;
        parent.appendChild(tr);
    });
};




const loadProfile = (items) => {
    const timestamp = `${items.date_joined}`;
    const date = new Date(timestamp);

    // Convert to human-readable format
    const humanReadableDate = date.toLocaleString();

    const parent = document.getElementById("profiles")
    parent.innerHTML = `
       <img src="images/profile.webp" alt="Profile Picture" class="profile-img">
                <div class="profile-info">
                    <h5>Username: ${items.username}</h5>
                    <h2>Name: ${items.first_name} ${items.last_name}</h2>
                    <p>Email: ${items.email}</p>
                    <p>Created On: ${humanReadableDate}</p>
                </div>
    `;


};


const handleCategory = () => {
    fetch("https://wander-stay-api.vercel.app/hotel/category/")
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("category");
                const option = document.createElement("option");
                option.value = item.id;
                option.innerText = item.name;
                parent.appendChild(option);
                ;

            });
        });
};


const handleCountry = () => {
    fetch("https://wander-stay-api.vercel.app/hotel/country/")
        .then((res) => res.json())
        .then((data) => {
            
            data.forEach((item) => {
                const parent = document.getElementById("addcountry");
                const option = document.createElement("option");
                option.value = item.id;
                option.innerText = item.name;
                parent.appendChild(option);
                ;

            });
        });
};

const handleCity = () => {
    fetch("https://wander-stay-api.vercel.app/hotel/city/")
        .then((res) => res.json())
        .then((data) => {
            
            data.forEach((item) => {
                const parent = document.getElementById("addcity");
                const option = document.createElement("option");
                option.value = item.id;
                option.innerText = item.name;
                parent.appendChild(option);
                ;

            });
        });
};



const handleAddHotel = async (event) => {
    event.preventDefault();
    const selectedCategory = Array.from(document.getElementById("category").selectedOptions).map(option =>
        option.value
    )
    const selectedcountry = Array.from(document.getElementById("addcountry").selectedOptions).map(option =>
        option.value
    )
    const selectedcity = Array.from(document.getElementById("addcity").selectedOptions).map(option =>
        option.value
    )

    const name = getdata("name");
    const amount = getdata("amount");
    const description = getdata("Hoteldescription");

    const image_file = document.getElementById("hotel_image").files[0];
    let imageUrl = "";
    if (image_file) {
        const imgFormData = new FormData();
        imgFormData.append('image', image_file);
        const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=5cb9b4e07adda01b2e7f1ca548a925bc', {
            method: 'POST',
            body: imgFormData
        });
        const imgbbData = await imgbbResponse.json();
        if (imgbbData.status === 200) {
            imageUrl = imgbbData.data.url;
        } else {
            alert('Image upload failed!');
            return;
        }
    }
    const HotelData = {
        category: selectedCategory,
        country: selectedcountry,
        city: selectedcity,
        image: imageUrl,
        name: name,
        amount: amount,
        descriptions: description,
    }
    console.log(selectedcountry)
    console.log(description)

    console.log(HotelData);
    await fetch("https://wander-stay-api.vercel.app/hotel/list/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(HotelData),
    })
        .then((res) => res.json())
        .then((data) => {

            if (data) {
                window.location.href = "dashboard.html";
                alert("Successfully add Hotel");
            }

        });
}


const handleDeleteHotel = (hotelid) => {

    fetch(`https://wander-stay-api.vercel.app/hotel/list/${hotelid}/`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
    })
        .then((res) => res.json())
        .then((data) => {

            if (data) {
                window.location.href = "dashboard.html";
                alert("Hotel deleted successfully");
            }

        });
}


const getdata = (id) => {
    const value = document.getElementById(id).value;
    return value;
}





// Update flower

const handeditHotel = async (hotelid) => {
    // Fetch flower data by ID
    console.log(hotelid);
    const response = await fetch(`https://wander-stay-api.vercel.app/hotel/list/${hotelid}/`);
    const hotel = await response.json();
    console.log('Fetched hotel data:', hotel);

    // Prefill the modal form
    document.getElementById("hotelId").value = hotelid;
    document.getElementById("editHotelName").value = hotel.name;
    document.getElementById("editHotelPrice").value = hotel.amount;
    document.getElementById("editdescription").value = hotel.descriptions;

    // Populate categories and colors select boxes (ensure options are loaded beforehand)
    await populateCategoriesAndColors();  // Ensure categories and colors are loaded

    // Set categories (assuming flower.category contains an array of category IDs)
    const categorySelect = document.getElementById("editHotelCategory");
    Array.from(categorySelect.options).forEach(option => {
        console.log('Checking category option:', option.value);  // Debugging
        if (hotel.category.includes(parseInt(option.value))) {
            option.selected = true;
        }
    });

    // Set colors (assuming flower.color contains an array of color IDs)
    const countrySelect = document.getElementById("editCountry");
    Array.from(countrySelect.options).forEach(option => {
        console.log('Checking color option:', option.value);  // Debugging
        if (hotel.country.includes(parseInt(option.value))) {
            option.selected = true;
        }
    });
    // Set colors (assuming flower.color contains an array of color IDs)
    const CitySelect = document.getElementById("editCity");
    Array.from(CitySelect.options).forEach(option => {
        console.log('Checking color option:', option.value);  // Debugging
        if (hotel.city.includes(parseInt(option.value))) {
            option.selected = true;
        }
    });

    // Set image
    document.getElementById("editHotelImagePreview").src = hotel.image;

    // Show the modal
    const updateHotelModal = new bootstrap.Modal(document.getElementById('updateHotelModal'));
    updateHotelModal.show();

    // Handle form submission
    document.getElementById("updateHotelForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const hotelId = document.getElementById("hotelId").value;
        const name = document.getElementById("editHotelName").value;
        const amount = document.getElementById("editHotelPrice").value;
        const descriptions = document.getElementById("editdescription").value;
        const selectedCategory = Array.from(document.getElementById("editHotelCategory").selectedOptions).map(option => option.value);
        const selectedCountry = Array.from(document.getElementById("editCountry").selectedOptions).map(option => option.value);
        const selectedCity = Array.from(document.getElementById("editCity").selectedOptions).map(option => option.value);

        let imageUrl = document.getElementById("editHotelImagePreview").src;
        const imageFile = document.getElementById("editHotelImage").files[0];

        // If an image is selected, upload it to ImgBB
        if (imageFile) {
            const imgFormData = new FormData();
            imgFormData.append('image', imageFile);
            const imgbbResponse = await fetch('https://api.imgbb.com/1/upload?key=5cb9b4e07adda01b2e7f1ca548a925bc', {
                method: 'POST',
                body: imgFormData
            });
            const imgbbData = await imgbbResponse.json();
            if (imgbbData.status === 200) {
                imageUrl = imgbbData.data.url;
            } else {
                alert('Image upload failed!');
                return;
            }
        }

        // Prepare the updated flower data
        const updatedHotelData = {
            name: name,
            amount: amount,
            category: selectedCategory,
            country: selectedCountry,
            city: selectedCity,
            descriptions: descriptions,
            image: imageUrl
        };

        // Send a PUT request to update the flower
        await fetch(`https://wander-stay-api.vercel.app/hotel/list/${hotelId}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedHotelData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    alert("Flower updated successfully!");
                    location.reload();  // Optionally, refresh the page to reflect changes
                }
            });

    });
};

// Helper function to populate categories and colors
const populateCategoriesAndColors = async () => {
    // Fetch categories and colors
    const categoriesResponse = await fetch('https://wander-stay-api.vercel.app/hotel/category/');
    const countryResponse = await fetch('https://wander-stay-api.vercel.app/hotel/country/');
    const cityResponse = await fetch('https://wander-stay-api.vercel.app/hotel/city/');

    const categories = await categoriesResponse.json();
    const countrys = await countryResponse.json();
    const citys = await cityResponse.json();

    console.log('Fetched categories:', categories);  // Debugging
    console.log('Fetched country:', country);  // Debugging
    console.log('Fetched city:', city);  // Debugging

    // Populate category select
    const categorySelect = document.getElementById("editHotelCategory");
    categorySelect.innerHTML = '';  // Clear previous options
    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        categorySelect.appendChild(option);
    });
    const countrySelect = document.getElementById("editCountry");
    countrySelect.innerHTML = '';  // Clear previous options
    countrys.forEach(country => {
        const option = document.createElement("option");
        option.value = country.id;
        option.text = country.name;
        countrySelect.appendChild(option);
    });

    // Populate color select
    const citySelect = document.getElementById("editCity");
    citySelect.innerHTML = '';  // Clear previous options
    citys.forEach(city => {
        const option = document.createElement("option");
        option.value = city.id;
        option.text = city.name;
        citySelect.appendChild(option);
    });
};








handleUser();
handleCategory();
handleCountry();
handleCity();









