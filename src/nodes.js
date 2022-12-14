const $ = (id) => document.querySelector(id);

// Sections
const headerSection = $('#header');
const trendingPreviewSection = $('#trendingPreview');
const likedPreviewSection = $('#liked');
const categoriesPreviewSection = $('#categoriesPreview');
const genericSection = $('#genericList');
const movieDetailSection = $('#movieDetail');

// Lists & Containers
const searchForm = $('#searchForm');
const trendingMoviesPreviewList = $('.trendingPreview-movieList');
const likedMoviesPreviewList = $('.liked-movieList');
const categoriesPreviewList = $('.categoriesPreview-list');
const movieDetailCategoriesList = $('#movieDetail .categories-list');
const relatedMoviesContainer = $('.relatedMovies-scrollContainer');

// Elements
const headerTitle = $('.header-title');
const trendingPreviewTitle = $('.trendingPreview-title');
const likedTitle = $('.liked-title');
const relatedTitle = $('.relatedMovies-title');
const arrowBtn = $('.header-arrow');
const headerCategoryTitle = $('.header-title--categoryView');

const searchFormInput = $('#searchForm input');
const searchFormBtn = $('#searchBtn');

const trendingBtn = $('.trendingPreview-btn');
const likedBtn = $('.liked-btn');

const movieDetailTitle = $('.movieDetail-title');
const movieDetailDescription = $('.movieDetail-description');
const movieDetailScore = $('.movieDetail-score');