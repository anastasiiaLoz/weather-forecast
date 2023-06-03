const scrollBtn = document.querySelector('.favBtn')
const favoriteBox = document.querySelector('.city_list')

scrollBtn.addEventListener('click', () => {
  favoriteBox.scrollTo(1000,0)
})

