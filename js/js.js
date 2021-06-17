'use strict';
window.addEventListener('DOMContentLoaded', () => {

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
                if (item == event.target ) {
                    hideContent();
                    showContent(index);
                }
            });
        }

    });
});