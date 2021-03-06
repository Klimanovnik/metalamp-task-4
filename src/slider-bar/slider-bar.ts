/// <reference path="./slider-bar.d.ts" />
import "./slider-bar.scss";

jQuery.fn.sliderBar = function (options: object): JQuery {

    const initialize = function () {

        const currentWrap = $(this);

        // Отрисовка слайдера внутри контейнера

        currentWrap.html(`<div class="slider-bar">
                            <div class="slider-bar__line">
                                <div class="slider-bar__progress"></div>
                            </div>
                            <div class="slider-bar__scroll"></div>
                        </div>`);

        // Назначение ширины скроллу

        const currentScroll = currentWrap.find(".slider-bar__scroll");
        currentScroll.width(<number>currentScroll.height() * 1);

        // Data-атрибут с шириной слайдера
        const currentSlider = currentWrap.find(".slider-bar");
        currentSlider[0].dataset.width = currentSlider[0].offsetWidth + "";

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

                thatScroll.style.left = offset + "px";
                thatProgress.style.width = parseFloat(thatScroll.style.left) + thatScroll.offsetWidth / 2 + "px";
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

    this.each(initialize);

    // Обработчик window resize

    $(window).on("resize", function () {

        $(".slider-bar").each(function () {
            const ratio = this.offsetWidth / parseFloat(<string>this.dataset.width);

            const currentProgress = <HTMLElement>this.querySelector(".slider-bar__progress");
            const currentScroll = <HTMLElement>this.querySelector(".slider-bar__scroll");

            currentScroll.style.left = parseFloat(currentScroll.style.left) * ratio + "px";

            if (parseFloat(currentScroll.style.left) > this.offsetWidth - currentScroll.offsetWidth) {
                currentScroll.style.left = this.offsetWidth - currentScroll.offsetWidth + "px";
            }

            currentProgress.style.width = parseFloat(currentScroll.style.left) + currentScroll.offsetWidth / 2 + "px";

            this.dataset.width = this.offsetWidth + "";
        });

    });

    return this;
};