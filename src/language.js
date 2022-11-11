const dictionary = {
  es : {
    trending: 'Tendencias',
    favorite: 'Favoritos',
    placeholder: 'Vengadores',
    related: 'Películas similares',
    seeMore: 'Ver más'
  },
  en : {
    trending: 'Trending',
    favorite: 'Favorites',
    placeholder: 'Avengers',
    related: 'Related movies',
    seeMore: 'More'
  } 
}


function setLanguage(language) {
  trendingPreviewTitle.innerText = language.trending
  likedTitle.innerText = language.favorite
  relatedTitle.innerText = language.related
  trendingBtn.innerText = language.seeMore
  likedBtn.innerText = language.seeMore
  searchFormInput.placeholder = language.placeholder
}