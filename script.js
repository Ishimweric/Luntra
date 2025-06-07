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
    ///js for form validation(basic)
    const form= document.querySelector('#contact-form');
    const successMessage = document.querySelector('.success-message');
    form.addEventListener('submit', (e)=>{
        e.preventDefault(); //did this so that a user can't submit if the form is not valid
        successMessage.textContent='';
        successMessage.classList.remove('active');

        successMessage.textContent= 'Form submitted successfully!';
        successMessage.classList.add('active');
        form.reset();

    });
});