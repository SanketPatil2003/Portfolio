document.getElementById("contactForm").addEventListener("submit", async function (e) {

    e.preventDefault();

    const loading = document.querySelector(".loading");
    const error = document.querySelector(".error-message");
    const success = document.querySelector(".sent-message");

    loading.style.display = "block";
    error.style.display = "none";
    success.style.display = "none";

    const data = {
        name: document.getElementById("name-field").value,
        email: document.getElementById("email-field").value,
        subject: document.getElementById("subject-field").value,
        message: document.getElementById("message-field").value
    };

    try {

        const response = await fetch("https://portfoliobackend-production-8090.up.railway.app/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        loading.style.display = "none";

        if (response.ok) {
            success.style.display = "block";
            document.getElementById("contactForm").reset();
        } else {
            const errorText = await response.text();
            error.style.display = "block";
            error.innerHTML = errorText || "Failed to send message.";
        }

    } catch (err) {
        loading.style.display = "none";
        error.style.display = "block";
        error.innerHTML = "Unable to connect to the server.";
        console.error(err);
    }

});