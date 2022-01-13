function addToNews(data) {
    var newsdiv = document.getElementById("news");
    var out = "";
    data.forEach(function(news) {
        out += "<div class='card'><header class='card-header'><a href='" + news.articleLink + "' target='_blank'><p class='card-header-title'>" + news.articleTitle + "</p></a></header><div class='card-content'><div class='content'><img src='" + news.articleImage + "' loading=lazy><br>" + news.articleContent + "</div></div></div>";
    })
    newsdiv.innerHTML += out;
}

var devTechNews = [];
fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://developer-tech.com/news/")).then(response => {
    if (response.ok) {
        return response.json()
    } else {
        throw new Error("Could not fetch page")
        return undefined;
    }
}).then(data => {
    if (data[Object.keys(data)[0]] === null) {
        console.log("Could not fetch news from developer tech.")
    }
    var parser = document.createElement('dummyhtml2')
    parser.innerHTML = data[Object.keys(data)[0]];
    var posts = parser.getElementsByClassName("post");
    Object.keys(posts).forEach(function(key) {
        var content = "";
        posts[key].querySelectorAll("p").forEach(function(p) { content += p.innerHTML })
        content = content.replace("\n", "").replace("\"", "")
        devTechNews.push({ "articleImage": posts[key].querySelectorAll("img")[0].src, "articleLink": posts[key].querySelectorAll("a")[0], "articleTitle": posts[key].querySelectorAll("a")[0].title, "articleContent": content })
    })
    addToNews(devTechNews)
})

var cnetNews = [];
fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.cnet.com/news/")).then(response => {
    if (response.ok) {
        return response.json()
    } else {
        throw new Error("Could not fetch page")
        return undefined;
    }
}).then(data => {
    if (data[Object.keys(data)[0]] === null) {
        console.log("Could not fetch news from cnet.")
    }
    var parser = document.createElement('dummyhtml3')
    parser.innerHTML = data[Object.keys(data)[0]];
    parser.querySelectorAll(".riverPost").forEach(function(post) {
        cnetNews.push({
            "articleImage": post.querySelectorAll("img")[0].src,
            "articleLink": "https://www.cnet.com" + post.querySelectorAll(".assetHed")[0].pathname,
            "articleTitle": post.querySelectorAll(".assetHed")[0].innerHTML,
            "articleContent": post.textContent.replace("\n", '').replace("\"", "").replace(post.querySelectorAll(".assetHed")[0].innerHTML, "").replace(/\s+/g, ' ').trim()
        })
    })
    addToNews(cnetNews)
})