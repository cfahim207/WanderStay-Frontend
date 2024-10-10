const handledeposit = (event) => {
    event.preventDefault();
    const customer_id = localStorage.getItem("customer_id");
    const amount = getamount("amount");
    const token = localStorage.getItem("token");
    const data = {
        customer: customer_id,
        amount: amount
    }
    console.log(data);
    if (token) {

        if (amount >= 500) {
            fetch("https://wander-stay-api.vercel.app/customer/deposite/", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {

                    alert("Deposite Successfully")
                    window.location.href = "index.html";

                });
        }
        else {
            alert("You can't deposit less then 500");
        }
    }
    else {
        alert("Please Login First");
        window.location.href = "login.html";
    }


}


const getamount = (id) => {
    const value = document.getElementById(id).value;
    return value;
}
