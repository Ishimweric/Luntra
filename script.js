document.addEventListener('DOMContentLoaded', ()=>{
    const hamburger= document.querySelector('.hamburger-menu');
    const navlinks = document.querySelector('.links');
    hamburger.addEventListener('click', ()=>{
        hamburger.classList.toggle('active');
        navlinks.classList.toggle('active');
    });

    //for faqs
    const faqContainers = document.querySelectorAll('.faq-container');
    faqContainers.forEach(container=>{
        container.addEventListener('click', ()=>{
            container.classList.toggle('active');
        });
    });
});