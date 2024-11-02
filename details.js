const getparams = () => {
  const parm = new URLSearchParams(window.location.search).get("hotelId");
  
  fetch(`https://wander-stay-api.vercel.app/hotel/list/?id=${parm}`)
    .then((res) => res.json())
    .then((data) => {
      hotelDetails(data);
    });
}

const hotelDetails = (details) => {
  
  details.forEach((hotel) => {
    
    const parent = document.getElementById("details_hotel");
    const div = document.createElement("div");
    div.classList.add("row");
    div.innerHTML = `
    <div class="col-md-6">
            <img style="width: 500px;" src="${hotel.image}" alt="Hotel Image">
        </div>
    
        <div class="col-md-6">
            <h2 id="hotel-name">${hotel.name}</h2>
            <p id="hotel-description">${hotel.descriptions}</p>
            <span id="hotel-amount">Amount: BDT ${hotel.amount} per night</span>
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
    
    
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Book Now
    </button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                data-bs-target="#staticBackdrop">
                Give Review
            </button>
    
        </div>
    
    `;
    parent.appendChild(div);

  })
  
}




const hotelbooking = (event) => {
  const parm = new URLSearchParams(window.location.search).get("hotelId");
  event.preventDefault();
  const token = localStorage.getItem("token");
  const customer_id = localStorage.getItem("customer_id");
  const adults = getdata("adults");
  const children = getdata("children");
  const staydate = getdata("staydate");

  
  const data = {
    hotel: parm,
    customer: customer_id,
    adults: adults,
    children: children,
    staydate: staydate,

  }
  console.log(data)

  if (token) {
    fetch("https://wander-stay-api.vercel.app/booking/list/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Order Successful.. Please check your mail..")
        window.location.href = "index.html";


      });
  }
  else {
    alert("Please Login First");
    window.location.href = "login.html";
  }
}


const handleReview = async (event) => {
  const token = localStorage.getItem("token");
  const parm = new URLSearchParams(window.location.search).get("hotelId");
  event.preventDefault();
  const name = getdata("name");
  const message = getdata("message");
  const rating = document.getElementById("ratingSelect");
  const selectedrating = rating.options[rating.selectedIndex];
  const image_file = document.getElementById("Reviewimage").files[0];
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
  const image = imageUrl;

  const info = {
    name:name,
    image: image,
    body: message,
    rating: selectedrating.value,
    hotel:parm,
    
  };
  console.log(info);

  if (token) {
    fetch("https://wander-stay-api.vercel.app/hotel/review/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Review Done")
        window.location.href = "index.html";


      });
  }
  else {
    alert("Please Login First");
    window.location.href = "login.html";
  }

}








const getdata = (id) => {
  const value = document.getElementById(id).value;
  return value;
}



getparams();
hotelbooking();