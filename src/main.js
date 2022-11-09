const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: {
    'api_key': API_KEY
  }
})

function imagesList(containerHTML, data) {
  containerHTML.innerHTML = ''

  data.forEach(movie => {
    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie-container')
    movieContainer.addEventListener('click',  () => location.hash = `#movie=${movie.id}`)

    const movieImg = document.createElement('img')
    movieImg.classList.add('movie-img')
    movieImg.setAttribute('alt', movie.title)
    movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`)
    
    movieContainer.appendChild(movieImg)
    containerHTML.appendChild(movieContainer)
  });
}

function categoriesList(containerHTML, data) {
  containerHTML.innerHTML = ''

  data.forEach(category => {
    const categoryContainer = document.createElement('div')
    categoryContainer.classList.add('category-container')

    const categoryTitle = document.createElement('h3')
    categoryTitle.classList.add('category-title')
    categoryTitle.setAttribute('id', `id${category.id}`)
    categoryTitle.innerText = category.name
    categoryTitle.addEventListener('click', () => location.hash = `#category=${category.id}-${category.name}`)

    categoryContainer.appendChild(categoryTitle)
    containerHTML.appendChild(categoryContainer)
  });
}

async function getTrendingMoviewPreview() {
  const { data } = await api('/trending/movie/day')

  imagesList(trendingMoviesPreviewList, data.results)
}

async function getCategoriesPreview() {
  const { data } = await api('/genre/movie/list')

  categoriesList(categoriesPreviewList, data.genres)
}

async function getMoviewByCategory(id) {
  const { data } = await api('/discover/movie', {
    params: {
      with_genres: id,
    }
  })

  imagesList(genericSection, data.results)

}

async function getMoviewBysearch(query) {
  const { data } = await api('/search/movie', {
    params: {
      query
    }
  })

  if (data.results.length > 0) {
    imagesList(genericSection, data.results)
  } else {
    genericSection.innerText = `No se encontro una pelicula con el nombre "${query}"`
  }

}

async function getTrendingMoview() {
  const { data } = await api('/trending/movie/day')

  imagesList(genericSection, data.results)
}

async function getMovieById(movie_id) {
  const { data } = await api(`/movie/${movie_id}`)

  const movieIMG = 'https://image.tmdb.org/t/p/w500' + data.poster_path
  headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), url(${movieIMG})`

  movieDetailTitle.innerText = data.title
  movieDetailDescription.innerText = data.overview
  movieDetailScore.innerText = data.vote_average

  categoriesList(movieDetailCategoriesList, data.genres)

  getRelatedMoviesId (movie_id)
}

async function getRelatedMoviesId (movie_id) {

  const { data } = await api(`/movie/${movie_id}/recommendations`)
  
  imagesList(relatedMoviesContainer, data.results)
}