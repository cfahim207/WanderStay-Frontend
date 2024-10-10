
const handlecontact = (event) => {
    event.preventDefault();
    const name = getvalue("contact-name");
    const email = getvalue("contact-email");
    const phone = getvalue("contact-phone");
    const message = getvalue("contact-message");
    const info = {
        name,email, phone, message, 
    };
    console.log(info);
    fetch("https://wander-stay-api.vercel.app/contact_us/", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(info),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data) {
                window.location.href = "index.html";
                alert("Message Sent Successfully!!");
            }

        });

}


const getvalue = (id) => {
    const value = document.getElementById(id).value;
    return value;
}
