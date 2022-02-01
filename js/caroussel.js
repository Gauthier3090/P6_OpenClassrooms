let scroll_amount = 0;

async function getMovieByID(id) {
    return (await fetch("http://127.0.0.1:8000/api/v1/titles/"+id)).json()
}

async function getMoviesByGenre(genre, page) {
    return (await fetch("http://127.0.0.1:8000/api/v1/titles/?genre="+genre+"&page="+page)).json()
}

function addMovieToDivImg(data) {
    for (let i = 0; i < data.length; i++) {
        let img = document.createElement("img")
        img.src = data[i].image_url
        img.classList.add("best-movie-img")
        img.setAttribute("id", "slideAnim")
        document.getElementById("categorie-1").appendChild(img)
    }
}

document.getElementById("switch-right").onclick = function () {
    document.getElementById("categorie-1").scrollTo({
        top: 0,
        left: Math.max(scroll_amount += 600, document.getElementById("categorie-1").getBoundingClientRect().width),
        behavior: "smooth",
    })
}

document.getElementById("switch-left").onclick = function () {
    document.getElementById("categorie-1").scrollTo({
        top: 0,
        left: Math.max(scroll_amount -= 600, 0),
        behavior: "smooth",
    })
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        let data = []
        let i = 2
        for (let i = 2; i < 8; i++) {
            movies = await getMoviesByGenre("Horror", i)
            movies.results.forEach(movies => data.push(movies))
        }
        addMovieToDivImg(data)
    } catch (e) {
        console.log(e)
    }
})
