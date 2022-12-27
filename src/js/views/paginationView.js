import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('button');
      if (!btn) return;
      handler(Number(btn.dataset.goto));
    });
  }

  _nextPageMarkup(currPage) {
    return `
    <button data-goto="${
      currPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }

  _prevPageMarkup(currPage) {
    return `
    <button data-goto="${
      currPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currPage - 1}</span>
    </button>
    `;
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1)
      return this._nextPageMarkup(this._data.page);

    // Other pages
    if (this._data.page < numPages && this._data.page > 1) {
      return this._prevPageMarkup(this._data.page).concat(
        this._nextPageMarkup(this._data.page)
      );
    }

    // Last page
    if (this._data.page === numPages && numPages > 1)
      return this._prevPageMarkup(this._data.page);
    // Page 1, and there are no other pages
    if (this._data.page === 1 && numPages === 1) return '';
  }
}

export default new PaginationView();
