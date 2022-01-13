function addToGithubTrending(data) {
    var trendingrepos = document.getElementById("trendingRepos");
    var out = "";
    data.forEach(function(repo) {
        out += "<div class='card'><header class='card-header'><a href='https://www.github.com/" + repo.repo + "' target='_blank'><p class='card-header-title'>" + repo.repo + "</p></a></header><div class='card-content'><div class='content'></div>" + repo.repoDesc + "</div></div>";
    })
    trendingrepos.innerHTML += out;
}

var githubTrendingRepos = [];
fetch("https://api.allorigins.win/get?url=" + encodeURIComponent("https://github.com/trending")).then(response => {
    if (response.ok) {
        return response.json()
    } else {
        throw new Error("Could not fetch page")
        return undefined;
    }
}).then(data => {
    if (data[Object.keys(data)[0]] === null) {
        console.log("Could not fetch Github Trending.")
    }
    var parser = document.createElement('dummyhtml1')
    parser.innerHTML = data[Object.keys(data)[0]];
    parser.querySelectorAll(".Box-row").forEach(function(repo) {
        if ((repo.querySelectorAll("p").length === 0) || (repo.querySelectorAll(".lh-condensed").length === 0)) {
            console.log(repo)
        } else {
            githubTrendingRepos.push({ "repo": repo.querySelectorAll(".lh-condensed")[0].textContent.replace("\n", "").replace(/\s+/g, '').trim(), "repoDesc": repo.querySelectorAll("p")[0].textContent.replace("\n", "").replace(/\s+/g, ' ').trim() })
        }
    })
    addToGithubTrending(githubTrendingRepos);
})