const MAINURL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const USERKEY = '21145461-ec858c83a87163ad119fff078';
const PERPAGE = '200';
const PAGENUMBER = '1';
const SECONDFILTERPARAMETR = 'city';

function getBackgroundApi(cityName) {
  try {
    return fetch(
      `${MAINURL}&q=${cityName
        .split(' ')
        .join('-')
        .toLowerCase()}&page=${PAGENUMBER}&per_page=${PERPAGE}&key=${USERKEY}`,
    )
      .then(responce => responce.json())
      .then(data => data.hits)
      .then(data => {
        let dataSet = [];
        data.forEach(el => {
          if (
            el.tags.split(', ').includes(cityName.toLowerCase()) &&
            el.tags.split(', ').includes(SECONDFILTERPARAMETR)
          ) {
            dataSet.push(el.largeImageURL);
          }
        });
        return dataSet[Math.round(Math.random() * (dataSet.length - 1))];
      })
      .catch(error => console.log(error));
  } catch {
    return false;
  }
}

export default { getBackgroundApi };
