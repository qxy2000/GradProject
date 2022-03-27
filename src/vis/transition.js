import { transition } from "d3";

class Transition {
    constructor() {
        this._container = document.createElement("div");
        this._duration = 2000;
    }

    container(value) {
        if (!value) {
            return this._container;
        }
        this._container = value;
    }

    duration(value) {
        if (!value) {
            return this._duration;
        }
        this._duration = value;
    }

    animateTransition() { }
}

export default Transition;