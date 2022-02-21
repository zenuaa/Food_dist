"use strict";


console.time('timeOne');

//обработка cookies

const cookieStorage = {
    getItem: function (key) {
        const cookies = document.cookie
            .split(';')
            .map(item => item.split('='))
            .reduce((acc, [key, value]) => ({
                ...acc,
                [key.trim()]: value
            }), {});
        return cookies[key];
    },
    setItem: (key, value) => {
        document.cookie = `${key}=${value};expires = Sun, 17 Jul 2050 06:23:41 GMT`;
    }
};
const consentPropertyType = 'site_consent';

const storageType = cookieStorage;
const shouldShow = () => storageType.getItem(consentPropertyType) === 'true' ? true : false,
    saveToStorage = (res) => storageType.setItem(consentPropertyType, res),
    askCookie = document.querySelector('.askCookie'),
    cookieBut = document.querySelectorAll('.cookieBut'), // [0] -> Accept, [1] -> Refuse
    containerAsk = document.querySelector('.container_ask');

cookieBut[0].addEventListener('click', () => {
    saveToStorage(true);
    askCookie.style.bottom = '-100%';
});
cookieBut[1].addEventListener('click', () => {
    saveToStorage(false);
    containerAsk.remove();
    askCookie.innerHTML = `
         <div>
         Without the ability to use cookies, this resource may not work correctly...
        </div>`;
    askCookie.style.backgroundColor = 'red';
    askCookie.style.alignItems = 'flex-start';
    askCookie.style.zIndex = '100';
    askCookie.style.paddingTop = '17px';

    let getPaddingTop = window.getComputedStyle(askCookie).paddingTop.slice(0, window.getComputedStyle(askCookie).paddingTop.length - 2);
    let countRed = '-0%';
    setTimeout(() => {
        const hideRed = setInterval(() => {
            if (+countRed.slice(1, countRed.length - 1) < 18) {
                countRed = `${+countRed.slice(0, countRed.length - 1) - 0.01 }%`;
                askCookie.style.bottom = `${countRed}`;
                askCookie.style.paddingTop = `${getPaddingTop - 0.1}px`;
                getPaddingTop -= 0.1;
            } else {
                clearInterval(hideRed);
            }
        }, 10);
    }, 3000);
    askCookie.style.bottom = '0%';
    askCookie.style.fontSize = '25px';
    askCookie.style.color = 'white';
    askCookie.style.height = '80px';
});

if (!shouldShow()) {
    askCookie.style.bottom = '0px';
}





console.timeEnd('timeOne');