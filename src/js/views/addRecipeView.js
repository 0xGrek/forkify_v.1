import icons from "url:../../img/icons.svg"; //Parcel 2
import View from "./View";

class AddRecipeView extends View {
    _parentElement = document.querySelector(`.upload`);
    _message = "Recipe was successfully uploaded";

    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    _btnClose = document.querySelector(".btn--close-modal");

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }
    /*
    toggleWindow() {
        this._overlay.classList.toggle("hidden");
        this._window.classList.toggle("hidden");
    }
    */

    _closeWindow() {
        this._overlay.classList.add("hidden");
        this._window.classList.add("hidden");
    }
    _openWindow() {
        this._overlay.classList.remove("hidden");
        this._window.classList.remove("hidden");
    }

    _addHandlerShowWindow() {
        // this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
        this._btnOpen.addEventListener("click", this._openWindow.bind(this));
    }
    _addHandlerHideWindow() {
        // this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
        // this._overlay.addEventListener("click", this.toggleWindow.bind(this));
        this._btnClose.addEventListener("click", this._closeWindow.bind(this));
        this._overlay.addEventListener("click", this._closeWindow.bind(this));
    }

    addHandlerUpload(handler) {
        this._parentElement.addEventListener("submit", function (e) {
            e.preventDefault();
            // use data for from
            const dataArr = [...new FormData(this)];

            // create obj after arr
            const data = Object.fromEntries(dataArr);

            handler(data);
        });
    }

    _generateMarkup() {}
}

export default new AddRecipeView();
