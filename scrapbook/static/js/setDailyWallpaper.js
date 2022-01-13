function shuffle(array) {
    var currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

function getRandomWallpaper() {
    var wallpaper = '';
    fetch("https://raw.githubusercontent.com/Wallux-0/Wallux/main/static/tags.json").then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error("Could not fetch page")
            return undefined;
        }
    }).then(data => {
        if (data[Object.keys(data)[0]] === null) {
            console.log("Could not fetch wallpapers.")
        }
        var notDark = true;
        while (notDark) {
            wallpaper = shuffle(data.wallpaper)[0];
            [...wallpaper.tags].forEach(function(t) {
                if (t === "Dark") {
                    notDark = false;
                }
            })
        }
        wallpaper.path = "https://raw.githubusercontent.com/Wallux-0/Wallpapers/main/" + wallpaper.path;
        Cookie.set("todaysWallpaperLink", wallpaper.path, { days: 1, path: "/" })
        Cookie.set("todaysWallpaperName", wallpaper.name, { days: 1, path: "/" })
        Cookie.set("todaysWallpaperDesc", wallpaper.description, { days: 1, path: "/" })
    })
}

if (Cookie.get("todaysWallpaperLink") === undefined) {
    getRandomWallpaper()
}
var wallpaperLink = Cookie.get("todaysWallpaperLink");
var wallpaperName = Cookie.get("todaysWallpaperName");;
var wallpaperDesc = Cookie.get("todaysWallpaperDesc");
document.getElementsByTagName("html")[0].style.background = "url('" + wallpaperLink + "')";
document.getElementsByTagName("html")[0].style.backgroundSize = 'cover';
document.getElementsByTagName("html")[0].style.backgroundPosition = 'center';
document.getElementsByTagName("html")[0].style.backgroundRepeat = 'no-repeat';
document.getElementById("wallpaperInfo").innerHTML = "<div style='font-weight: bold; font-size: 0.9rem;'><a href='https://wallux-0.github.io/' target='_blank'>" + wallpaperName + " - Wallpaper provided by Wallux</a>";