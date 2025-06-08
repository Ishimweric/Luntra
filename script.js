document.addEventListener('DOMContentLoaded', ()=>{
    const hamburger= document.querySelector('.hamburger-menu');
    const navlinks = document.querySelector('.links');
    hamburger.addEventListener('click', ()=>{
        hamburger.classList.toggle('active');
        navlinks.classList.toggle('active');
    });

    //for faqs
    const faqContainers = document.querySelectorAll('.faq-container');
    faqContainers.forEach(container =>{
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

    // caruosel for product section
    const productContainer = document.querySelector('.product-container');
    const productInner = document.createElement('div');
    productInner.className= 'product-container-inner';
    const mainProduct = document.querySelector('.actual-product');
    // productContainer.insertBefore(productInner, document.querySelector('.left-scroll'));
    productContainer.appendChild(productInner);
    if(mainProduct){
        productInner.appendChild(mainProduct);
    }

    // make array of products(3)
    const products = [
        {
            title:'Luntra Talkbot',
            whatItDoes: 'Simulates natural conversations with an intelligent chatbot.',
            impact: 'Builds confidence in speaking and improves pronunciation.',
            features: ['Real-time interactions', 'Language level personalization', 'Feedback on grammar'],
            tools: ['OpenAI GPT','Rasa NLU', 'Whisper by OpenAI', 'Text-to-speech by ElevenLabs'],
            image: 'images/robot.jpg'
        },
        {
            title:'Luntra Live Sessions',
            whatItDoes: 'Connects learners across the world for guided peer-to-peer speaking sessions in their target languages.',
            impact: 'Encourages natural language use in a social setting and enhances cultural understanding.',
            features: ['Smart pairing by skill level', 'Built-in speaking prompts', 'Moderated rooms to ensure a safe experience'],
            tools: ['WebRTC','Firebase Authentication', 'Node.js + Express'],
            image: 'images/robot.jpg'
        },
        {
            title:'Luntra Certificate Builder',
            whatItDoes: 'Generates smart, verifiable language certificates after completing specific conversation milestones and assessments.',
            impact: 'Increases learner motivation and provides credible proof of progress for schools or employers.',
            features: ['CEFR-aligned certificate generation', 'AI-evaluated speaking test with optional human review', 'Export as PDF or share via public URL'],
            tools: ['HTML-to-PDF generator','Custom CEFR rubric evaluation','QR code verification system'],
            image: 'images/robot.jpg'
        }
    ];
    products.forEach ((product, index)=>{

    const productDiv = document.createElement('div');
    productDiv.className = 'actual-product';

    productDiv.innerHTML = `
        <div class= "product-title"> ${product.title}</div>
        <div class = "product-info">
            <div class="product-description-container">
                <h3 class="product-pretitle"> What it does</h3>
                <p class="product-description ">${product.whatItDoes}</p>
                <br>
                <h3 class="product-pretitle">Impact</h3>
                <p class="product-description">${product.impact}</p>
                <br>
                <h3 class= "product-pretitle">Key features</h3>
                <ul class="product-description">
                    ${product.features.map(feature => `<li>${ feature}</li>`).join('')}
                </ul>
                <br>
                <h3 class= "product-pretitle">Tools used</h3>
                <ul class="product-description">
                    ${product.tools.map (tool => `<li>${tool}</li>`).join('')}
                </ul>
            </div>
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" style="height:auto;">
            </div>
        </div>
    `;

    productInner.appendChild(productDiv);
    });

    //actual carousell implementation/logic
    const carouselInner = document.querySelector('.product-container-inner');
    console.log('carouselInner:', carouselInner);
    const carouselItems = document.querySelectorAll('.actual-product');
    console.log('carouselItems count:', carouselItems.length);
    const prevButton = document.querySelector ('.left-scroll');
    const nextButton= document.querySelector('.right-scroll');
    console.log('prevButton:', prevButton);
    console.log('nextButton:', nextButton);
    

    const dots = document.querySelectorAll('.dot');
    console.log('dots count:', dots.length);
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function updateCarousel(){
        console.log('Current index:', currentIndex);
        console.log('Container width:', carouselInner.parentElement.offsetWidth);
        console.log('Inner width:', carouselInner.offsetWidth);
        console.log('Product width:', carouselItems[0].offsetWidth);
        console.log('Transform applied:', `translateX(-${currentIndex * 33.33}%)`);
        console.log('Applying transform for index:', currentIndex);
        carouselInner.style.transform =`translateX(-${currentIndex*33.33}%)`;
        dots.forEach( (dot,index)=>{
            dot.classList.toggle('active',index===currentIndex);
        });
    }

    //for left scroll button
    prevButton.addEventListener('click',()=>{
        console.log('Prev clicked, old index:', currentIndex);
        currentIndex= (currentIndex>0)?
        currentIndex -1: carouselItems.length-1;
        console.log('Prev new index:', currentIndex);
        updateCarousel();
    });

    //for next button
    nextButton.addEventListener('click',(e)=>{
        e.preventDefault();
        console.log('Next clicked, old index:', currentIndex);
        currentIndex = (currentIndex < carouselItems.length-1)?
        currentIndex +1:0;
        console.log('Next new index:', currentIndex);
        updateCarousel();
    });
    //for when you click the dots to update the coursel
    dots.forEach((dot, index)=>{
        dot.addEventListener('click',()=>{
            currentIndex = index;
            updateCarousel();
        });
    });

    //for swapping
    carouselInner.addEventListener('touchstart', (e)=>{
        startX =e.touches[0].clientX;
        isDragging = true;
    });

    carouselInner.addEventListener('touchmove',(e)=>{
        if(!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;
        if(Math.abs(diffX)>50){
            if(diffX>0){
                currentIndex = (currentIndex <carouselItems.length-1)?
                currentIndex +1:0;
            }
            else{
                currentIndex =(currentIndex>0)? currentIndex-1:carouselItems.length-1;
            }
            updateCarousel();
            isDragging = false;
        }
    });
    carouselInner.addEventListener('touchend',()=>{
        isDragging = false;
    });
    updateCarousel();

    //this is the js for the back to top button
    const backToTopButton= document.querySelector('.back-to-top');
    if (backToTopButton){
        window.addEventListener('scroll',()=>{
            if (window.scrollY>100){
                backToTopButton.classList.add('show');
            }
            else{
                backToTopButton.classList.remove('show');
            }
        });
        backToTopButton.addEventListener('click',(e)=>{
            e.preventDefault();
            window.scrollTo({top:0, behavior:'smooth'});
        });
    }
});
