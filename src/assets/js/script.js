document.addEventListener('DOMContentLoaded', () => {
    addCookiesPopup()

    findOpenPopupsElements()

    addCloseEventToPopups()

    findCustomSelect()

    addMobileMenuHandler()

    addFavorite()
})


function findOpenPopupsElements() {
    document.querySelectorAll('[data-popup-name]').forEach(currentOpenPopupElement => {
        let popupName = currentOpenPopupElement.getAttribute('data-popup-name'),
            popup = document.querySelector(`.${popupName}`)
        currentOpenPopupElement.addEventListener('click', event => {
            event.preventDefault()
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
                $(popup).fadeOut()
                popup.classList.remove('popup-active')

                if (popup.parentElement.classList.contains('popup-wrapper')) {
                    $(popup.parentElement).fadeOut()
                    document.body.style.overflow = ''
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
        let cookiesPopup = document.querySelector('.popup_cookies'),
            popupWrapper = document.querySelector('.popup-wrapper')
        $(popupWrapper).fadeIn()
        $(cookiesPopup).fadeIn()
        $(cookiesPopup).css('display', 'flex')
        document.body.style.overflow = 'hidden'

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