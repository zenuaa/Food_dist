'use strict';
console.time('time');

const tabs = document.querySelectorAll('.tabheader__item'), //меню на день
    tabsContent = document.querySelectorAll('div.tabcontent'),
    tabsParent = tabs[0].parentNode;

function hideContent() { //hide div.tabcontent
    tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active'); //remove class ='active'
    });
}

function showContent(i = 0) { //show div.tabcontent
    tabsContent[i].classList.remove('hide');
    tabsContent[i].classList.add('show', 'fade');
    tabs[i].classList.add('tabheader__item_active'); //add class ='active'
}
hideContent();
showContent();
tabsParent.addEventListener('click', (event) => {
    if (event.target && event.target.classList.contains('tabheader__item')) {
        tabs.forEach((item, index) => {
            if (item == event.target) {
                hideContent();
                showContent(index);
            }
        });
    }

});



const doomsDay = '2022-02-17';

const upTime = setInterval(setLostTime, 1000);
setLostTime();

function getLostTime(doomsDaySet) {
    const currentTime = new Date().getTime(),
        difference = new Date(doomsDay).getTime() - currentTime,
        day = Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours = Math.floor(difference / (1000 * 60 * 60) % 24),
        min = Math.floor(difference / (1000 * 60) % 60),
        sec = Math.floor(difference / (1000) % 60);
    return {
        day: day,
        hours: hours,
        min: min,
        sec: sec,
        diff: difference
    };
}

function setLostTime() {
    const objLostTime = getLostTime(doomsDay),
        timerBlock = document.querySelectorAll('.timer__block');
    let arrLostTime = Object.values(objLostTime);
    if (objLostTime.diff <= 0) {
        clearInterval(upTime);
    } else {
        timerBlock.forEach((item, index) => {

            let value = arrLostTime[index];
            //console.log(value);
            if (value < 10) {
                item.firstElementChild.textContent = '0' + value; //добавляем нули если число мешьше 10
            } else {
                item.firstElementChild.textContent = value;
            }
        });
    }
}


//end date

// классы для корточек

class MenuCard { // создаем класс с карточками
    constructor(src, alt, title, descr, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.transfer = 27;
        this.changeToUAH(); // запуск метода по переводу при создании экземпляра класса
        this.parent = document.querySelector(parentSelector); // выборка родителя для append
    }
    changeToUAH() { // метод переводит баксы в гривны
        this.price = this.price * this.transfer;
    }
    render() { // создает и вставляет новую карточку в родителя this.parent
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
        </div>
        `;
        this.parent.append(element);
    }
}

// const getResourse = async (url) => {
//     const response = await fetch(url);
//     if (!response.ok) {
//         throw new Error(`Could not fetch() ${url}, because response.status: ${response.status}`);
//     }
//     return await response.json();
// };

// getResourse('http://localhost:3000/menu')
// .then(data=> {
// // console.log(data);
// data.forEach(({img, altimg, title, descr, price})=> {
//     new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
// });

// });

axios.get('http://localhost:3000/menu')
    .then(data => {
        // console.log(data);
        data.data.forEach(({
            img,
            altimg,
            title,
            descr,
            price
        }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu__field .container').render();
        });

    });


// modal windows

const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    closeModal = document.querySelector('[data-close]');

modalTrigger.forEach(item => {
    item.addEventListener('click', () => {
        console.log('was a click on data-modal');
        openModalFrame();
        removeShowModalEvent();
        clearInterval(openModalonTime); // off запуск модалки по истечению 10 сек на стр
        document.body.style.overflow = 'hidden'; //блокирование прокрутки основного окна когда модальное окрыто
    });
});

document.addEventListener('keydown', (e) => { //закрывает модалку при нажатии Escape

    if (e.key === 'Escape' && modal.classList.contains('show')) {
        closeModalFrame();
        console.log(`${e.key} was prased`);
    }
});

function openModalFrame() { // открытие модалки
    const m = modal.classList;
    m.remove('hide');
    m.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModalFrame() { // закрытие модалки
    const m = modal.classList;
    m.remove('show');
    m.add('hide');
    document.body.style.overflow = 'scroll';
}


closeModal.addEventListener('click', closeModalFrame); //при клике на крестик закрываем модалку


modal.addEventListener('click', (e) => { // клик за пределами модалки закрывает модалку
    if (e.target === modal || e.target.classList.contains('modal__close')) {
        closeModalFrame();
    }
});


window.addEventListener('scroll', showModal);


const openModalonTime = setTimeout(() => { //запуск модалки по истечению 10 сек на стр
    openModalFrame();
    removeShowModalEvent();
}, 50000);

function showModal() {
    if ($(window).scrollTop() + $(window).height() + 0.1 >= $(document).height()) {
        console.log('ура! конец страницы!');
        openModalFrame();
        removeShowModalEvent();
        clearTimeout(openModalonTime);
    }
}

function removeShowModalEvent() {
    window.removeEventListener('scroll', showModal);
}

const forms = document.querySelectorAll('form');
const infoLoad = {
    loading: 'img/form/spinner.svg',
    success: "Thank's, we'll call you..",
    fail: 'An arror has ocurated..'
};

forms.forEach(item => { //каждой форме назначаем обработчик события по отправке данных
    bindPostData(item);
});

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const spin = document.createElement('img');
        spin.src = infoLoad.loading;
        spin.style.cssText = `
        display: block;
        margin: 0 auto;`;
        form.insertAdjacentElement('afterend', spin);
        const formData = new FormData(form); //вытягиваем данные из формы
        const cloneFormData = JSON.stringify(Object.fromEntries(formData.entries())); // переделываем "страный" обьект полученный от FormData
        // в JSON обьект методом stringify
        postData('http://localhost:3000/requests', cloneFormData)
            .then(data => {
                console.log('вывод post обьекта разобраного .json()', data);
                showThanksModal(infoLoad.success);
                spin.remove();
            }).catch(() => {
                showThanksModal(infoLoad.fail);
            }).finally(() => {
                form.reset();
            });
    });
}

function showThanksModal(massage) {
    const modalFirstChild = document.querySelector('.modal__dialog'); //
    modalFirstChild.classList.remove('show');
    modalFirstChild.classList.add('hide'); //прячем первую модалку
    // console.log(modalFirstChild);

    openModalFrame();
    const thanksModal = document.createElement('div'); // создаем новый блок с таким же стилем как и удаленый
    thanksModal.classList.add('modal__dialog'); // и забиваем туда спасибо наше
    thanksModal.innerHTML = `
    <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${massage}</div>
    </div>
    `;

    modal.append(thanksModal); //вставляем блок спасибо



    setTimeout(() => { // после событи submit 
        thanksModal.remove(); //удаляем спасибо
        modalFirstChild.classList.remove('hide');
        modalFirstChild.classList.add('show');
        closeModalFrame();
    }, 2000);


}

// делаем слайдер из картинок
console.warn(window.getComputedStyle(document.querySelector('.offer__slider-wrapper')).width);
const slideList = document.querySelectorAll('.offer__slide'), //NodeList всех слайдов
    chageSlideButton = document.querySelectorAll('.offer__slider-prev , .offer__slider-next'), // кнопки вперед и назад
    curentTotal = document.querySelector('#total'), // отображение общего кол-ва слайдов
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner');
let width; 

let posId = document.querySelector('#current'); // отображение текущего номера слайда

let idSlide = 0; //отображаемый счетчик текущего слайда совпадающий с индексом из NodeList всех слайдов
let slideOffset = 0;

slidesField.style.display = 'flex';
slidesField.style.width = ` ${100 * slideList.length}%`;
slidesField.style.transition = '0.5s all';
slidesWrapper.style.overflow = 'hidden';

setTimeout(()=>{// назначаю значение с задержкой так как был баг, без выдержки иногда прилетало непонятное 1062.77px хз откудава
width = window.getComputedStyle(slidesWrapper).width;
}, 1000);

slideList.forEach(slide => {
    slide.style.width = width;
    slide.classList.remove('hide');

});

chageSlideButton[1].addEventListener('click', () => {
    if (slideOffset >= +width.slice(0, width.length - 2) * (slideList.length - 1)) {
                            // 650             *                11   =   7150
        slideOffset = 0;
        console.log('edge');
    } else {
        slideOffset += +width.slice(0, width.length - 2);
    }
    console.log(slideOffset);
    slidesField.style.transform = `translateX(-${slideOffset}px)`;
});

chageSlideButton[0].addEventListener('click', () => {
    if (slideOffset <= 0) {
        slideOffset = +width.slice(0, width.length - 2) * (slideList.length - 1);
        console.log('edge');

    } else {
        slideOffset = slideOffset - width.slice(0, width.length - 2);
    }
    console.log(slideOffset);
    slidesField.style.transform = `translateX(-${slideOffset}px)`;
});

//_______________________________________________________________


console.timeEnd('time');
