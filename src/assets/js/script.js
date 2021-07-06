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
                $(openPopup).fadeOut()
                openPopup.classList.remove('popup-active')
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
                console.log(faqItem.open)
                if (!faqItem.open) {
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