async function getMoviesByGenre(genre, page) {
    return (await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes&page="+page+"&page_size=10&genre="+genre)).json()
}

async function getMoviesById(id) {
    return (await fetch("http://127.0.0.1:8000/api/v1/titles/"+id)).json()
}

function addMovieToDivImg(data, categorie_id) {
    for (let i = 0; i < data.length; i++) {
        let img = document.createElement("img")
        img.alt = data[i].id
        img.src = data[i].image_url
        img.style.cursor = 'pointer'
        img.classList.add("best-movie-img")
        document.getElementById(categorie_id).appendChild(img)
    }
}

function addBestMovieToDivImg(data) {
    let div_best_movie = document.getElementById("best-movie-div")
    let img_best_movie = div_best_movie.getElementsByTagName("img").item(0)
    let title = document.getElementsByTagName("h1").item(1)
    title.innerHTML = data.title
    img_best_movie.alt = data.id
    img_best_movie.src = data.image_url
}

async function infoModal(img) {
    let modal = document.getElementById("info-modal").children
    let info = await getMoviesById(img.alt)
    for (let i = 0; i < modal.length; i++) {
        if (modal.item(i).id === "img-movie") {
            modal.item(i).src = info.image_url
            modal.item(i).alt = info.id
        }
        else if (modal.item(i).id === "title-movie")
            modal.item(i).innerHTML = info.title
        else if (modal.item(i).id === "genre-movie") {
            let genres = info.genres.toString().split(',')
            modal.item(i).innerHTML = ''
            for (let j = 0; j < genres.length; j++) {
                modal.item(i).innerHTML += genres[j] + ' '
                modal.item(i).innerHTML += '<br>'
            }
        }
        else if (modal.item(i).id === "date-movie")
            modal.item(i).innerHTML = info.date_published
        else if (modal.item(i).id === "rated-movie")
            modal.item(i).innerHTML = info.rated
        else if (modal.item(i).id === "score-movie")
            modal.item(i).innerHTML = info.imdb_score
        else if (modal.item(i).id === "directors-movie")
            modal.item(i).innerHTML = info.directors
        else if (modal.item(i).id === "actors-movie") {
            let actors = info.actors.toString().split(',').sort(function(a, b){return a - b})
            modal.item(i).innerHTML = ''
            for (let j = 0; j < actors.length; j++) {
                modal.item(i).innerHTML += actors[j] + ' '
                modal.item(i).innerHTML += '<br>'
            }
        }
        else if (modal.item(i).id === "time-movie")
            modal.item(i).innerHTML = info.duration +' min'
        else if (modal.item(i).id === "country-movie") {
            let countries = info.countries.toString().split(',')
            modal.item(i).innerHTML = ''
            for (let j = 0; j < countries.length; j++) {
                modal.item(i).innerHTML += countries[j] + ' '
                modal.item(i).innerHTML += '<br>'
            }
        }
        else if (modal.item(i).id === "box-office-movie")
            modal.item(i).innerHTML = info.worldwide_gross_income.toLocaleString()
        else if (modal.item(i).id === "resume-movie")
            modal.item(i).innerHTML = info.description
    }
}

function closeModal(modal) {
    let close = document.getElementById("close-modal")
    close.onclick = function () {
        modal.style.display = "none"
    }
}

function displayinfoimg(modal) {
    let images = document.images

    for (let i = 0; i < images.length; i++) {
        images.item(i).onclick = function () {
            modal.style.display = "block"
            infoModal(images.item(i))
        }
    }
}

function main(categorie, buttonleft, buttonright) {
    let carousel = document.getElementById(categorie)
    let prev = document.getElementById(buttonleft)
    let next = document.getElementById(buttonright)

    next.onclick = function () {
        let w = carousel.offsetWidth
        carousel.scrollLeft += 810
    }

    prev.onclick = function () {
        let w = carousel.offsetWidth
        carousel.scrollLeft -= 810
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        let modal = document.getElementById("modal")
        let data_horror = []
        let data_fantasy = []
        let data_action = []
        let best_movie = await getMoviesByGenre("", 1).then(movie => movie.results).then(movie => movie[0])
        for (let i = 1; i < 10; i++) {
            let movies_horror = await getMoviesByGenre("Horror", i)
            movies_horror.results.forEach(movies => {if (data_horror.length < 7) data_horror.push(movies)})
            let movies_fantasy = await getMoviesByGenre("Fantasy", i)
            movies_fantasy.results.forEach(movies => {if (data_fantasy.length < 7) data_fantasy.push(movies)})
            let movies_action = await getMoviesByGenre("Action", i)
            movies_action.results.forEach(movies => {if (data_action.length < 7) data_action.push(movies)})
        }
        addMovieToDivImg(data_horror, "categorie-1")
        addMovieToDivImg(data_fantasy, "categorie-2")
        addMovieToDivImg(data_action, "categorie-3")
        addBestMovieToDivImg(best_movie)
        main("categorie-1", "switch-left-1", "switch-right-1")
        main("categorie-2", "switch-left-2", "switch-right-2")
        main("categorie-3", "switch-left-3", "switch-right-3")
        closeModal(modal)
        displayinfoimg(modal)
    } catch (e) {
        console.log(e)
    }
})