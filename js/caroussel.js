import {addMovieToDivImg} from "./api.js"
import {getMoviesByGenre} from "./api.js"

function caroussel(categorie, buttonleft, buttonright) {
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
        let data_horror = []
        let data_fantasy = []
        let data_action = []
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
    } catch (e) {
        console.log(e)
    }
})

caroussel("categorie-1", "switch-left-1", "switch-right-1")
caroussel("categorie-2", "switch-left-2", "switch-right-2")
caroussel("categorie-3", "switch-left-3", "switch-right-3")