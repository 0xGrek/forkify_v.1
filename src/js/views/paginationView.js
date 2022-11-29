import icons from "url:../../img/icons.svg"; //Parcel 2
import View from "./View";

class PaginationView extends View {
    _parentElement = document.querySelector(`.pagination`);

    addHandlerClick(handler) {
        this._parentElement.addEventListener(`click`, function (e) {
            const btn = e.target.closest(`.btn--inline`);
            // verification
            if (!btn) return;
            // activated btn
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }
    // All page in the 1 colummn
    _generateMarkup() {
        const curPage = this._data.page;
        const numPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage
        );

        const btnRigth = `
            <button data-goto="${
                curPage + 1
            }"class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>
        `;
        const btnLeft = `
            <button data-goto="${
                curPage - 1
            }" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage - 1}</span>
            </button>
        `;

        // Page 1 and there are other pages
        if (curPage === 1 && numPages > 1) {
            return btnRigth;
        }
        // Last page
        if (curPage === numPages && numPages > 1) {
            return btnLeft;
        }
        //Other page
        if (curPage < numPages) {
            return btnRigth + btnLeft;
        }
        // Page 1 and there are NO other pages
        return ``;
    }
}

export default new PaginationView();
