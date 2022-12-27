import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _generateMarkup() {
    return this._data
      .map(el => {
        const id = window.location.hash.slice(1);
        const markup = `
    <li class="preview">
        <a class="preview__link ${
          id === el.id ? `preview__link--active` : ''
        }" href="#${el.id}">
            <figure class="preview__fig">
                <img src="${el.imageUrl}" alt="${el.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${el.title}</h4>
                <p class="preview__publisher">${el.publisher}</p>
                <div class="preview__user-generated ${el.key ? '' : 'hidden'}">
                <svg>
                <use href="${icons}#icon-user"></use>
                </svg>
                </div>
            </div>
        </a>
    </li>
`;
        return markup;
      })
      .join('');
  }
}

export default PreviewView;
