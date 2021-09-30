/// <reference path="./slider-bar.d.ts" />
import "./slider-bar.scss";

jQuery.fn.sliderBar = function (options: object): JQuery {

    const initialize = function () {

        const currentWrap = $(this);

        // Отрисовка слайдера внутри контейнера

        currentWrap.html(`<div class="slider-bar">
                            <div class="slider-bar__line"></div>
                            <div class="slider-bar__progress"></div>
                            <div class="slider-bar__scroll"></div>
                        </div>`);

        // Назначение ширины скроллу

        const currentScroll = currentWrap.find(".slider-bar__scroll");
        currentScroll.width(<number>currentScroll.height() * 0.5);

        // Назначение обработчиков скроллу

        currentScroll[0].onpointerdown = function (event) {
            event.preventDefault();

            const thatScroll = <HTMLElement>event.currentTarget;
            const thatSliderBar = <HTMLElement>thatScroll.closest(".slider-bar");
            const thatProgress = <HTMLElement>thatSliderBar.querySelector(".slider-bar__progress");

            thatScroll.setPointerCapture(<number>event.pointerId);

            // Сдвиг мыши внутри ползунка
            let shift = event.clientX - thatScroll.getBoundingClientRect().left;

            const onPointerMove = function (event) {

                // Смещение скролла влево и максимально возможное смещение
                let offset = event.clientX - thatSliderBar.getBoundingClientRect().left - shift;
                let maxOffset = thatSliderBar.offsetWidth - thatScroll.offsetWidth;

                if (offset < 0) {
                    offset = 0;
                } else if (offset > maxOffset) {
                    offset = maxOffset;
                }

                thatProgress.style.width = thatScroll.style.left = offset + "px";
            };

            thatScroll.addEventListener("pointermove", onPointerMove);

            thatScroll.onpointerup = function () {
                thatScroll.removeEventListener("pointermove", onPointerMove);
                thatScroll.onpointerup = null;
            };
        };

        currentScroll[0].ondragstart = function () {
            return false;
        };

    };

    return this.each(initialize);
};