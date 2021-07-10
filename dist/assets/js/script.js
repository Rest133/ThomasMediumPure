document.addEventListener('DOMContentLoaded', () => {
    addCookiesPopup()

    findOpenPopupsElements()

    addCloseEventToPopups()

    findCustomSelect()

    addMobileMenuHandler()

    addFavorite()

    openFAQItem()

    addPopupSort()

    changeSearchInputPlaceholder()

    starRatingHandler()

    tableTopFixedHandler()

    addChooseDateHandler()

    addPlayButtonHandler()
})


function findOpenPopupsElements() {
    document.querySelectorAll('[data-popup-name]').forEach(currentOpenPopupElement => {
        let popupName = currentOpenPopupElement.getAttribute('data-popup-name'),
            popup = document.querySelector(`.${popupName}`)

        currentOpenPopupElement.addEventListener('click', () => {
            if (currentOpenPopupElement.parentElement.tagName === 'FORM') {
                if (validateForm(currentOpenPopupElement.parentElement)) {
                    openPopup(popup)
                }
            } else {
                openPopup(popup)
            }
        })
    })
}

function addCloseEventToPopups() {
    let popups = document.querySelectorAll('.popup')
    popups.forEach(popup => {
        let popupCloseAll = popup.querySelectorAll('[data-popup-close]')

        popupCloseAll.forEach(popupClose => {
            popupClose.addEventListener('click', event => {
                event.preventDefault()
                if (popupClose.parentElement.tagName === 'FORM') {
                    if (validateForm(popupClose.parentElement)) {
                        closePopup(popup)
                    }
                } else {
                    closePopup(popup)
                }
            })
        })
    })

    document.addEventListener('mouseup', event => {
        if (document.querySelector('.popup.popup-active') !== null) {
            let openPopup = document.querySelector('.popup.popup-active')

            if (!event.target.closest('.popup-active') && !event.target.closest('[data-popup-name]')) {
                closePopup(openPopup)
            }
        }
    })
}

function addCookiesPopup() {
    setTimeout(function () {
        if (document.querySelector('.popup_cookies') !== null) {
            let cookiesPopup = document.querySelector('.popup_cookies'),
                popupWrapper = document.querySelector('.popup-wrapper')
            $(popupWrapper).fadeIn()
            $(cookiesPopup).fadeIn()
            $(cookiesPopup).css('display', 'flex')
            document.body.style.overflow = 'hidden'
        }
    }, 2000)
}

function findCustomSelect() {
    if (document.querySelectorAll('.custom-select') !== null) {
        let allCustomSelects = document.querySelectorAll('.custom-select')
        allCustomSelects.forEach(customSelect => {
            let chooseItem = customSelect.querySelector('.custom-select__choose-item')
            customSelect.addEventListener('click', event => {
                if (event.target && event.target.classList.contains('popup__select-item')) {
                    chooseItem.textContent = event.target.textContent
                }
            })
        })
    }
}

function addMobileMenuHandler() {
    let burgerMenu = document.querySelector('.burger-menu'),
        menu = document.querySelector('.main-menu')
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('burger-menu_active')
        menu.classList.toggle('main-menu_active')

        if (menu.classList.contains('main-menu_active')) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    })
}

function addFavorite() {
    if (document.querySelectorAll('.favoris-row__img-culumn-subtitle') !== null) {
        document.querySelectorAll('.favoris-row__img-culumn-subtitle').forEach(favorite => {
            favorite.addEventListener('click', () => {
                favorite.classList.toggle('favoris-row__img-culumn-subtitle_active')
            })
        })
    }
}

function openFAQItem() {
    if (document.querySelector('.faq-block') !== null) {
        let faqBlock = document.querySelector('.faq-block')
        faqBlock.querySelectorAll('.faq-questions__row').forEach(faqItem => {
            faqItem.addEventListener('click', () => {
                faqItem.querySelector('.faq_question__text').classList.toggle('dn')
                if (!faqItem.querySelector('.faq_question__text').classList.contains('dn')) {
                    faqItem.querySelector('.faq-element').textContent = '–'
                } else {
                    faqItem.querySelector('.faq-element').textContent = '+'
                }
            })
        })
    }

}

function addPopupSort() {
    if (document.querySelector('.popup_settings') !== null) {
        let settingsPopup = document.querySelector('.popup_settings')
        settingsPopup.querySelectorAll('.popup__settings-list-item_sort').forEach(filterBtn => {
            filterBtn.addEventListener('click', () => {
                filterBtn.classList.toggle('active')
            })
        })
    }
}

function openPopup(popup) {
    if (popup.parentElement.classList.contains('popup-wrapper')) {
        $(popup.parentElement).fadeIn()
        document.body.style.overflow = 'hidden'
        $(popup).fadeIn()
        $(popup).css('display', 'flex')
        popup.classList.add('popup-active')
    } else {
        $(popup).fadeIn()
        $(popup).css('display', 'flex')
        popup.classList.add('popup-active')
    }
}

function closePopup(popup) {
    $(popup).fadeOut()
    popup.classList.remove('popup-active')

    if (popup.parentElement.classList.contains('popup-wrapper')) {
        $(popup.parentElement).fadeOut()
        document.body.style.overflow = ''
    }
}

function validateForm(form) {
    let formCorrect = false,
        errors = 0

    form.querySelectorAll('.form-block__input').forEach(formInput => {
        if (!formInput.checkValidity()) {
            errors++
            formInput.classList.add('form-block__input_wrong')
        } else {
            formInput.classList.remove('form-block__input_wrong')
            formInput.classList.add('form-block__input_correct')
            setTimeout(function () {
                formInput.classList.remove('form-block__input_correct')
            }, 1500)
        }
    })

    return errors === 0
}

function changeSearchInputPlaceholder() {
    if (document.querySelector('.search-input_change') !== null) {
        let searchInput = document.querySelector('.search-input_change')
        if (window.matchMedia('(max-width: 1025px)').matches) {
            searchInput.placeholder = searchInput.getAttribute('data-mob-placeholder')
        }
    }
}

function starRatingHandler() {
    let starValue = 0
    if (document.querySelector('.popup__rating') !== null) {
        let ratingBlock = document.querySelector('.popup__rating'),
            allStars = ratingBlock.querySelectorAll('.rating__star')
        allStars.forEach((star, i) => {
            star.addEventListener('mouseenter', () => {
                fillAllStarsToCurrent(allStars, i)
            })
            star.addEventListener('click', () => {
                starValue = i + 1
                fillAllStarsToCurrent(allStars, i)
                console.log(starValue)
            })
        })
        ratingBlock.addEventListener('mouseleave', () => {
            if (starValue === 0) {
                allStars.forEach(star => {
                    star.classList.remove('rating__star_active')
                })
            }
        })
    }
}

function fillAllStarsToCurrent(stars, index) {
    stars.forEach((currentStar, i) => {
        if (i <= index) {
            currentStar.classList.add('rating__star_active')
        } else {
            currentStar.classList.remove('rating__star_active')
        }
    })
}

function tableTopFixedHandler() {
    if (document.querySelector('.table-block') !== null) {
        let table = document.querySelector('.table-block'),
            fixedBlock = table.querySelector('.schedule-block'),
            scrollSchedule = fixedBlock.querySelector('.table-block__scroll-wrapper'),
            scrollTable = table.querySelector('.table-block__progress')

        window.addEventListener('scroll', event => {
            if (window.matchMedia('(max-width:1025px)').matches) {
                if ((window.pageYOffset > scrollTable.getBoundingClientRect().top + pageYOffset - 115) && (window.pageYOffset < scrollTable.getBoundingClientRect().bottom + pageYOffset - 90)) {
                    table.querySelector('.table-block__summary').style.marginBottom = '102px'
                    fixedBlock.classList.add('schedule-block_fixed')
                } else {
                    fixedBlock.classList.remove('schedule-block_fixed')
                    table.querySelector('.table-block__summary').style.marginBottom = ''
                }
            }
        })

        $(scrollSchedule).scroll(function () {
            $(scrollTable).scrollLeft($(scrollSchedule).scrollLeft());
        });
        $(scrollTable).scroll(function () {
            $(scrollSchedule).scrollLeft($(scrollTable).scrollLeft());
        });
    }
}

function addChooseDateHandler() {
    // if (document.querySelector('.schedule-block__date') !== null) {
    //     let chooseDateBlock = document.querySelector('.schedule-block__date')
    //
    //     chooseDateBlock.querySelectorAll('.schedule-block__text_choose-date').forEach(date => {
    //         date.addEventListener('click', () => {
    //             chooseDateBlock.querySelector('.schedule-block__text_current-date').textContent = date.textContent
    //         })
    //     })
    // }
}

function addPlayButtonHandler() {
    if (document.querySelectorAll('.block__play-button') !== null) {
        let playButtons = document.querySelectorAll('.block__play-button'),
            audioBlock = document.querySelector('.specialist-block__audio')
        playButtons.forEach(playButton => {
            playButton.addEventListener('click', () => {
                playButton.classList.toggle('block__play-button_active')
                if (playButton.classList.contains('block__play-button_active')){
                    audioBlock.play()
                }else {
                    audioBlock.pause()
                }
            })
        })
    }
}