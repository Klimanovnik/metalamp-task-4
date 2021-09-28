/// <reference path="./slider-bar.d.ts" />
import "./slider-bar.scss";

jQuery.fn.sliderBar = function (options: object): JQuery {

    let make = function () {
        $(this).html(`<div class="slider-bar">
                        <div class="slider-bar__line"></div>
                        <div class="slider-bar__progress"></div>
                        <div class="slider-bar__circle"></div>
                    </div>`);
    };

    return this.each(make);
};