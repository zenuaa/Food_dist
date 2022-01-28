'use strict';
//window.addEventListener('DOMContentLoaded', () => {
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


// modal windows

const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    closeModal = document.querySelector('[data-close]');

modalTrigger.forEach(item => {
    item.addEventListener('click', () => {
        console.log('was a click on data-modal');
        openModalFrame();
        // removeShowModalEvent();
        clearInterval(openModalonTime); // off запуск модалки по истечению 10 сек на стр
        document.body.style.overflow = 'hidden'; //блокирование прокрутки основного окна когда модальное окрыто
    });
});

document.addEventListener('keydown', (e) => { //закрывает модалку при нажатии Escape

    if (e.key === 'Escape' && modal.classList.contains('show')) {
        // closeOpenModalFrame()
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
    if (e.target === modal) {
        closeModalFrame();
    }
});


// window.addEventListener('scroll', showModal);


const openModalonTime = setTimeout(() => { //запуск модалки по истечению 10 сек на стр
    openModalFrame();
    // removeShowModalEvent();
}, 3000);

const forms = document.querySelectorAll('form');
const infoLoad = {
    loading: 'Инфа полетела на сервер..',
    success: 'Заявка оставленна..',
    fail: 'An arror has ocurated..'
};
const divInfoLoad = document.createElement('div');
divInfoLoad.style.margin = '10px';

forms.forEach(item => {
    postData(item);
});

function postData(form) {
    form.addEventListener('submit', (e) => {
        divInfoLoad.textContent = infoLoad.loading;
        form.append(divInfoLoad);
        e.preventDefault();
        const formData = new FormData(form);
        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'applicatoin/json');
        const cloneFormData = {};
        formData.forEach((item, index ) => {
             cloneFormData[index] = item;
        });
        // console.log(cloneFormData );
        const json = JSON.stringify(cloneFormData);

        request.send(json);
        request.addEventListener('load', () => {
            if (request.status === 200) {                
                divInfoLoad.textContent = infoLoad.success;
                // const inf = JSON.parse(request.response);   
                console.log(request.response);
                setTimeout(() => {
                    form.reset();
                    divInfoLoad.remove();
                    closeModalFrame();
                }, 2000);
            } else {
                divInfoLoad.textContent = infoLoad.loading;
            }
        });
    });
}




console.timeEnd('time');
// end DOMContentLoaded
//});