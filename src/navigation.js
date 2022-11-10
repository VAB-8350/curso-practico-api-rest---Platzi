let canBack = 0
const navigator = () => {

  if (location.hash.startsWith('#trends')) {

    trends()

  } else if (location.hash.startsWith('#search=')) {

    const loc = location.hash
    const [_, search] = loc.split('=')

    search ? searchPage(search.replaceAll('%20', ' ')) : homePage()

  } else if (location.hash.startsWith('#movie=')) {
    const loc = location.hash
    const [_, id] = loc.split('=')

    moviePage(id)

  } else if (location.hash.startsWith('#category=')) {

    const loc = location.hash
    const [id, name] = loc.split('=')[1].split('-')
    categoryPage(id, name.replace('%20', ' '))

  }  else {

    homePage()

  }

  canBack++
  scroll(0, 0)
}

searchFormBtn.addEventListener('click', () => location.hash = `#search=${searchFormInput.value}`)
trendingBtn.addEventListener('click',  () => location.hash = '#trends')
arrowBtn.addEventListener('click',  () => canBack > 1 ? window.history.back() : location.hash = '#')

window.addEventListener('DOMContentLoaded', navigator)
window.addEventListener('hashchange', navigator, false)

function trends() {
  console.log('trends')

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arror--white')
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.remove('inactive')
  headerCategoryTitle.innerText = 'Tendencias'
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')

  getTrendingMoview()
}

function searchPage(search) {
  console.log('search')

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arror--white')
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.remove('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')

  getMoviewBysearch(search)
}

function moviePage(id) {
  console.log('movie')

  headerSection.classList.add('header-container--long')
  // headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.add('header-arrow--white')
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.add('inactive')
  movieDetailSection.classList.remove('inactive')

  getMovieById(id)
}

function categoryPage(id, name) {
  console.log('category')

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''
  arrowBtn.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerTitle.classList.add('inactive')
  headerCategoryTitle.classList.remove('inactive')
  headerCategoryTitle.innerText = name
  searchForm.classList.add('inactive')

  trendingPreviewSection.classList.add('inactive')
  categoriesPreviewSection.classList.add('inactive')
  genericSection.classList.remove('inactive')
  movieDetailSection.classList.add('inactive')

  getMoviewByCategory(id)
}

function homePage() {
  console.log('Home')

  headerSection.classList.remove('header-container--long')
  headerSection.style.background = ''
  arrowBtn.classList.add('inactive')
  headerTitle.classList.remove('inactive')
  arrowBtn.classList.remove('header-arrow--white')
  headerCategoryTitle.classList.add('inactive')
  searchForm.classList.remove('inactive')

  trendingPreviewSection.classList.remove('inactive')
  categoriesPreviewSection.classList.remove('inactive')
  genericSection.classList.add('inactive')
  movieDetailSection.classList.add('inactive')

  getTrendingMoviewPreview()
  getCategoriesPreview()
}