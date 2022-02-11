export async function getMoviesByGenre(genre, page) {
    return (await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&sort_by=-votes&page="+page+"&page_size=10&genre="+genre)).json()
}

export function addMovieToDivImg(data, categorie_id) {
    for (let i = 0; i < data.length; i++) {
        let img = document.createElement("img")
        img.src = data[i].image_url
        img.classList.add("best-movie-img")
        document.getElementById(categorie_id).appendChild(img)
    }
}
