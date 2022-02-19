"use strict";

console.time('timeOne');

const consentPropertyType = 'site_consent';

const shouldShow = () => !localStorage.getItem(consentPropertyType),
    saveToStorage = (res) => localStorage.setItem(consentPropertyType, res),
    askCookie = document.querySelector('.askCookie'),
    cookieBut = document.querySelectorAll('.cookieBut'), // [0] -> Accept, [1] -> Refuse
    containerAsk = document.querySelector('.container_ask');

if (shouldShow) {
    askCookie.style.bottom = '0px';
    cookieBut[0].addEventListener('click', () => {
        saveToStorage(true);
        askCookie.style.bottom = '-100%';
    });
 cookieBut[1].addEventListener('click', () => {
        console.log('qwe');
        
        saveToStorage(false);
        containerAsk.remove();
        askCookie.innerHTML = `
         <div>
            Без возможности использования cookies данный ресурс может работать некоректно..
        </div>`;
        askCookie.style.backgroundColor = 'red';
        askCookie.style.bottom = '0%';
        askCookie.style.fontSize = '25px';
        askCookie.style.color = 'white';
        askCookie.style.height = '50px';
        
    });
} 

console.timeEnd('timeOne');