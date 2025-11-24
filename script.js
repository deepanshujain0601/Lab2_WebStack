let carouselTimer = null;
document.getElementById("loadBtn").addEventListener("click", loadUser);
function loadUser() {
    const statusText = document.getElementById("statusText");
    statusText.innerText = "Opening Connection...";
    let xhr = new XMLHttpRequest();
    // let url = "https://randomuser.me/api/doesnotexist/";
    // let url = "https://tools-httpstatus.pickup-services.com/500";
    // let url = "https://randomuser.me/api/";
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 1) statusText.innerText = "Connection Established...";
        if (xhr.readyState === 2) statusText.innerText = "Request Sent...";
        if (xhr.readyState === 3) statusText.innerText = "Processing Request...";
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                statusText.innerText = "Success! Status: 200 – OK";
                let data = JSON.parse(xhr.responseText);
                startUserDisplay(data.results[0]);
            } else if (xhr.status === 404) {
                statusText.innerText = "Error 404 – File Not Found!";
            } else if (xhr.status === 500) {
                statusText.innerText = "Server Error 500!";
            } else {
                statusText.innerText = "Unknown Error: " + xhr.status;
            }
        }
    };
    xhr.send();
}
function startUserDisplay(user) {
    if (carouselTimer !== null) {
        clearTimeout(carouselTimer);
        carouselTimer = null;
    }
    let canvas = $("#userCanvas");
    let ctx = document.getElementById("userCanvas").getContext("2d");
    let img = new Image();
    img.src = user.picture.large;
    canvas.css("opacity", "0");
    img.onload = function () {
        setTimeout(() => {
            ctx.clearRect(0, 0, 200, 200);
            ctx.drawImage(img, 0, 0, 200, 200);
            canvas.css("opacity", "1");
        }, 400);
    };
    const details = [
        `<b>Name:</b> ${user.name.first} ${user.name.last}`,
        `<b>Country:</b> ${user.location.country}`,
        `<b>Email:</b> ${user.email}`
    ];
    let index = 0;
    let box = $(".carousel-item");
    function changeText() {
        box.css("opacity", 0);
        setTimeout(() => {
            box.html(details[index]);
            box.css("opacity", 1);
            index = (index + 1) % details.length;
        }, 400);
        carouselTimer = setTimeout(changeText, 2200);
    }
    changeText();
}
