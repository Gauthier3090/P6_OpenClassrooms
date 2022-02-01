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
        document.getElementById("categorie_1").appendChild(img)
    }
}

function clickRight() {
    let img = document.getElementsByClassName('best-movie-img');
    for (let i = 0; i < img.length; i++) {
        img[i].style.animation = "slide 2s"
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        let data = []
        let i = 2
        for (let i = 2; i < 4; i++) {
            movies = await getMoviesByGenre("Horror", i)
            movies.results.forEach(movies => data.push(movies))
            console.log(data)
        }
        addMovieToDivImg(data)
    } catch (e) {
        console.log(e)
    }
})
