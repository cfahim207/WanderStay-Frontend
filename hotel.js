// load category

const loadCategory = () => {
    const all = document.getElementById("category");
    const li2 = document.createElement("li");
    li2.innerHTML = "<p onclick='loadhotel()'> All </p>";
    all.appendChild(li2);
    fetch("https://wander-stay-api.vercel.app/hotel/category/")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.forEach((item) => {
                const parent = document.getElementById("category");
                const li = document.createElement("li");
                li.innerHTML = `
                    <a> <p onclick="loadhotel('${item.id}')">${item.name}</p></a>
            `;
                
                parent.appendChild(li);

            });
        });
};

const loadcountry = () => {
    const all = document.getElementById("country");
    const li2 = document.createElement("li");
    li2.innerHTML = "<p onclick='loadhotel()'> All </p>";
    all.appendChild(li2);
    fetch("https://wander-stay-api.vercel.app/hotel/country/")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.forEach((item) => {
                const parent = document.getElementById("country");
                const li = document.createElement("li");
                li.innerHTML = `
                    <a> <p onclick="loadhotelcountry('${item.id}')">${item.name}</p></a>
            `;
                
                parent.appendChild(li);

            });
        });
};

const loadcity = () => {
    const all = document.getElementById("city");
    const li2 = document.createElement("li");
    li2.innerHTML = "<p onclick='loadhotel()'> All </p>";
    all.appendChild(li2);
    fetch("https://wander-stay-api.vercel.app/hotel/city/")
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            data.forEach((item) => {
                const parent = document.getElementById("city");
                const li = document.createElement("li");
                li.innerHTML = `
                    <a> <p onclick="loadhotelcity('${item.id}')">${item.name}</p></a>
            `;
                
                parent.appendChild(li);

            });
        });
};



// Load Hotel 
const loadhotel = (findhotel) => {
    document.getElementById("hotel-container").innerHTML = "";
    let url = "https://wander-stay-api.vercel.app/hotel/list/"
    if (findhotel) {
        url = `https://wander-stay-api.vercel.app/hotel/list/?category=${findhotel}`
    }
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.length > 0) {
                displayHotel(data);
            }
            else {
                document.getElementById("hotel-container").innerHTML = "";

            }


        });
}
const loadhotelcountry = (findhotel) => {
    document.getElementById("hotel-container").innerHTML = "";
    if (findhotel) {
        url = `https://wander-stay-api.vercel.app/hotel/list/?country=${findhotel}`
    }
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.length > 0) {
                displayHotel(data);
            }
            else {
                document.getElementById("hotel-container").innerHTML = "";

            }


        });
}
const loadhotelcity = (findhotel) => {
    document.getElementById("hotel-container").innerHTML = "";
    if (findhotel) {
        url = `https://wander-stay-api.vercel.app/hotel/list/?city=${findhotel}`
    }
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if (data.length > 0) {
                displayHotel(data);
            }
            else {
                document.getElementById("hotel-container").innerHTML = "";

            }


        });
}


const displayHotel = (hotels) => {
    hotels.forEach((hotel) => {
        const parent = document.getElementById("hotel-container");
        const div = document.createElement('div');
        div.classList.add("col-lg-3")
        div.innerHTML = ` 
              <div class="card h-card" style="height: 500px;">
  <img src="${hotel.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h4 class="card-title">${hotel.name} </h4>
    <p>Category:

                ${hotel?.category_display?.map((item) => {
            return `<small> ${item} </small>`;
        })}
                </p>

                <p>Country:

                ${hotel?.country_display?.map((item) => {
            return `<small> ${item} </small>`;
        })}
                </p>

                <p>City:

                ${hotel?.city_display?.map((item) => {
            return `<small> ${item} </small>`;
        })}
                </p>

                <h6 >  
                  <b>BDT. ${hotel.amount} </b> <small>per night</small>
                </h6>
                <a target="_blank" href="details_hotel.html?hotelId=${hotel.id}" class="btn btn-warning">More Details</a>
               <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Give Review
    </button>



    
  </div>
</div>
        
        `;
        parent.appendChild(div);
    });
};



// load Review

const loadReviews = () => {
    fetch("https://wander-stay-api.vercel.app/hotel/review/")
        .then((res) => res.json())
        .then((data) => displayreview(data));

};


const displayreview = (reviews) => {
    reviews.forEach((review) => {

        const timestamp = `${review.created}`;
        const date = new Date(timestamp);

        // Convert to human-readable format
        const humanReadableDate = date.toLocaleString();
        const parent = document.getElementById("review");
        const div = document.createElement("div");
        div.classList.add("swiper-slide");

        div.innerHTML = `
        
                 
             <div class="testimonial-item">
                <img src="${review.image}" class="testimonial-img" alt="">
                <h3>${review.name}</h3>
                <h5>Hotel: ${review.hotel_display}</h4>
                <h5>${humanReadableDate}</h4>
                <h5>${review.rating}</h4>
                
                <p>
                  <i class="bi bi-quote quote-icon-left"></i>
                  <span>${review.body}</span>
                  <i class="bi bi-quote quote-icon-right"></i>
                </p>
              </div>
            
        
        
        `;
        parent.appendChild(div);

    })
}






const token = localStorage.getItem("token");
if (token) {
    document.getElementById("drop-item").innerHTML = `
    <li><a href="dashboard.html">Dashboard</a></li>
    <li><a href="deposite.html">Deposit</a></li>
    <li><a onclick="handlelogOut()" href="">Logout</a></li>
    
  `;
}
else {
    document.getElementById("drop-item").innerHTML = `
  <li><a href="Register.html">Register</a></li>
  <li><a href="login.html">Login</a></li>
  `;
}



loadCategory();
loadcountry();
loadcity();
loadhotel();
loadReviews();