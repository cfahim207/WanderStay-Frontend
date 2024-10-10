const loadallhotels = () => {
    fetch(
        'https://wander-stay-api.vercel.app/hotel/list/'
    )
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("hotels");
                const option = document.createElement("option");
                option.value = item.id;
                option.innerText = item.name;
                parent.appendChild(option);
            });
        });
}

const handlebookinghotels = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const customer_id = localStorage.getItem("customer_id");
    const adults = gethoteldata("bookingadults");
    const children = gethoteldata("bookingchildren");
    const staydate = gethoteldata("bookingstaydate");
    const hotels = document.getElementById("hotels");
    const selectedhotel = hotels.options[hotels.selectedIndex];
    const info = {
        hotel: selectedhotel.value,
        customer: customer_id,
        adults: adults,
        children: children,
        staydate: staydate, 
    };

    console.log(info);

    if (token) {
        fetch("https://wander-stay-api.vercel.app/booking/list/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(info),
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



const gethoteldata = (id) => {
    const value = document.getElementById(id).value;
    return value;
}

loadallhotels()