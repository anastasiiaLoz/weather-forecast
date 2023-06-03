import bgImageUrl from './getBackgroundApi.js';

const renderBackground = imgUrl => {
  const body = document.querySelector('body');
  body.style.backgroundImage = `linear-gradient(0.56deg, #000000 -13.48%, rgba(0, 0, 0, 0) 78.75%), url(${imgUrl})`;
};

const setBackground = () => {
  try {
    bgImageUrl
      .getBackgroundApi(JSON.parse(localStorage.getItem('currentPos')).city)
      .then(data => {
        if (data) {
          renderBackground(data);
        } else {
          renderBackground(
            'https://images.wallpaperscraft.ru/image/nebo_oblaka_goluboj_108523_3840x2400.jpg',
          );
        }
      })
      .catch(error => console.log(error));
  } catch {
    renderBackground(
      'https://images.wallpaperscraft.ru/image/nebo_oblaka_goluboj_108523_3840x2400.jpg',
    );
  }
};

setBackground();

export default { setBackground };
