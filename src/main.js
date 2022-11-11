const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: {
    'api_key': API_KEY,
    "language": navigator.language || "es-ES"
  }
})

const selectLanguage = navigator.language.startsWith('en') ? dictionary.en : dictionary.es
setLanguage(selectLanguage)

let page = 1
let lastquery = ''
let lastId = 0

function getLocalStorage () {
  let LS = localStorage.getItem('liked-Movies')
  let likedList = JSON.parse(LS)

  LS === null || typeof likedList !== 'object' && localStorage.setItem('liked-Movies', '{}')

  LS = localStorage.getItem('liked-Movies')

  likedList = JSON.parse(LS)

  return likedList
}

function likeTogle(movie) {
  
  let likedList = getLocalStorage()

  if (likedList[movie.id]) {
    delete likedList[movie.id]

  } else {
    const id = movie.id
    likedList = {...likedList, [id]:movie}
  }

  localStorage.setItem('liked-Movies', JSON.stringify(likedList))

}

function imagesList(containerHTML, data, clean = true) {
  
  clean && (containerHTML.innerHTML = '')
  const likedList = getLocalStorage()

  data.forEach((movie, index) => {
    const movieContainer = document.createElement('div')
    movieContainer.classList.add('movie-container')
    movieContainer.classList.add('movie-container--loading')
    movieContainer.style.animationDelay = `.${index}s`

    const movieImg = document.createElement('img')
    movieImg.addEventListener('click',  () => location.hash = `#movie=${movie.id}`)
    const movieBtn = document.createElement('button')
    movieBtn.classList.add('movie-btn')
    likedList[movie.id] && movieBtn.classList.add('movie-btn--liked')

    movieBtn.addEventListener('click', () => {
      movieBtn.classList.toggle('movie-btn--liked')
      likeTogle(movie)
      
      location.href.includes('#liked') && getMoviesFavorites()
      location.href.endsWith('#')  && getFavoritesMoviewPreview() && getTrendingMoviewPreview()
    })

    movieImg.classList.add('movie-img')
    movieImg.setAttribute('alt', movie.title)
    setObserver(movieImg, `https://image.tmdb.org/t/p/w300/${movie.poster_path}`, containerHTML)
    
    movieImg.addEventListener('load', () => movieContainer.classList.remove('movie-container--loading'))
    
    movieImg.addEventListener('error', () => {
      movieContainer.innerHTML = ''
      movieContainer.classList.remove('movie-container--loading')

      const img = document.createElement('img')
      img.classList.add('movie-img')
      img.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Imagen_no_disponible.svg/1200px-Imagen_no_disponible.svg.png')
      
      const title = document.createElement('span')
      title.classList.add('title-error')
      title.innerText = movie.title

      movieContainer.appendChild(img)
      movieContainer.appendChild(title)

    })
    
    movieContainer.appendChild(movieImg)
    movieContainer.appendChild(movieBtn)
    containerHTML.appendChild(movieContainer)
  })
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

function getFavoritesMoviewPreview() {
  const  likedList = getLocalStorage()

  if (Object.keys(likedList).length === 0) {
    likedPreviewSection.classList.add('inactive')
  } else {
    likedPreviewSection.classList.remove('inactive')
    imagesList(likedMoviesPreviewList, Object.values(likedList))
  }  
}

async function getCategoriesPreview() {
  const { data } = await api('/genre/movie/list')

  categoriesList(categoriesPreviewList, data.genres)
}

async function getMoviewByCategory(id = 0) {

  lastId = parseInt(id)>0 ? id : lastId

  try {
    const { data } = await api('/discover/movie', {
      params: {
        with_genres: lastId,
        page
      }
    })  
  
    imagesList(genericSection, data.results, page===1)
    data.total_pages > page && setObserverfooter(getMoviewByCategory)
  } catch (error) {
    console.log('fin')
  }

}

async function getMoviewBysearch(query = '') {

  lastquery = query?.length > 0 ? query : lastquery
  
  const { data } = await api('/search/movie', {
    params: {
      query: lastquery,
      page
    }
  })
  
  if (data.results.length > 0 || page > 1) {
    imagesList(genericSection, data.results, page===1)
    data.total_pages > page && setObserverfooter(getMoviewBysearch)
  } else {
    genericSection.innerText = `No se encontro una pelicula con el nombre "${lastquery}"`
  }

}

async function getTrendingMoview() {

  const { data } = await api('/trending/movie/day', {
    params: {
      page
    }
  })

  imagesList(genericSection, data.results, page===1)
  data.total_pages > page && setObserverfooter(getTrendingMoview)
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

function getMoviesFavorites () {
  const  likedList = getLocalStorage()

  imagesList(genericSection, Object.values(likedList))
}


// observers
function setObserver (element, url, container) {

  const options = {
    root: container,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      entry.isIntersecting && element.setAttribute('src', `https://image.tmdb.org/t/p/w300/${url}`)
    })
  },options)

  observer.observe(element)
}

let prev = true
function setObserverfooter(func) {
  
  const footer = document.querySelector('footer')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      entry.isIntersecting && prev && page++ && func() && (prev = false)
      !entry.isIntersecting && (prev = true)
    })
  })

  observer.observe(footer)
}