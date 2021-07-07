'use strict';
window.addEventListener('DOMContentLoaded', () => {
    console.time('time');
    
    const tabs = document.querySelectorAll('.tabheader__item'),
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


    // date

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
                 if(value < 10){
                    item.firstElementChild.textContent = '0' + value;
                 }
                else {
                    item.firstElementChild.textContent = value;
                }
            });
        }
    }

   
    //end date


    console.timeEnd('time');
    // end DOMContentLoaded
});

