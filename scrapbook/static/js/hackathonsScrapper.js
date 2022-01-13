function showHackathons(data) {
    var hacathonsdiv = document.getElementById("hackathons");
    var out = "";
    data.forEach(function(event) {
        out += "<div class='card'><header class='card-header'><a href='" + event.eventLink + "' target='_blank'><p class='card-header-title'>" + event.eventName + "</a></header><div class='card-content'><div class='content'><center><img src='" + event.eventImage + "' loading=lazy><br>" + event.eventNotes + "</div></center></div><header class='card-header'><p class='card-header-title'>On " + event.eventDate + " AT " + event.eventLocation + "</header></div>";
    })
    hacathonsdiv.innerHTML += out;
}

var mlhHackathons = [];
fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://mlh.io/seasons/2022/events")).then(response => {
    if (response.ok) {
        return response.json()
    } else {
        throw new Error("Could not fetch page")
        return undefined;
    }
}).then(data => {
    if (data[Object.keys(data)[0]] === null) {
        console.log("Could not fetch hackathons.")
    }
    var parser = document.createElement('dummyhtml')
    parser.innerHTML = data[Object.keys(data)[0]];
    parser.querySelectorAll(".event").forEach(function(post) {
        mlhHackathons.push({ "eventImage": post.querySelectorAll(".image-wrap")[0].querySelectorAll("img")[0].src, "eventLink": post.querySelectorAll(".event-link")[0].href, "eventName": post.querySelectorAll(".event-name")[0].textContent, "eventDate": post.querySelectorAll(".event-date")[0].textContent.trim(), "eventLocation": post.querySelectorAll(".event-location")[0].textContent.replace(/\s+/g, ' ').trim().replace("\n", ""), "eventNotes": post.querySelectorAll(".event-hybrid-notes")[0].textContent.trim() })
    })
    showHackathons(mlhHackathons)
})