document.addEventListener('DOMContentLoaded', ()=>{
    // gonna implement visitor counter logic using local storage

    const visitorCountDisplay= document.querySelector('#visitor-count');
    if(visitorCountDisplay){
        let count =parseInt(localStorage.getItem('visitorCount')) || 0;
        if(!sessionStorage.getItem('visited')){
            count++;
            localStorage.setItem('visitorCount',count);
            sessionStorage.setItem('visited','true');
        }
        visitorCountDisplay.textContent=count;
    }

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
    // failed to work i don't know why
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
    const carouselItems = document.querySelectorAll('.actual-product');
    const prevButton = document.querySelector ('.left-scroll');
    const nextButton= document.querySelector('.right-scroll');
    

    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function updateCarousel(){
        const percentage = 100/carouselItems.length;
        carouselInner.style.transform =`translateX(-${currentIndex*percentage}%)`;
        dots.forEach( (dot,index)=>{
            dot.classList.toggle('active',index===currentIndex);
        });
    }

    //for left scroll button
    prevButton.addEventListener('click',()=>{
        currentIndex= (currentIndex>0)?
        currentIndex -1: carouselItems.length-1;
        updateCarousel();
    });

    //for next button
    nextButton.addEventListener('click',(e)=>{
        e.preventDefault();
        currentIndex = (currentIndex < carouselItems.length-1)?
        currentIndex +1:0;
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
    //for products toggle button , a simple js
    // const starterButton = document.querySelector('.starter-button');
    // const fluentButton= document.querySelector('.fluent-button');
    // starterButton.addEventListener('click',()=>{
    //     product
    // })

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
    // js for the ai chatbot 
    const inputBox =document.getElementById('input-box');
    const sendButton= document.getElementById('send-button');
    const messagesBox= document.getElementById('messages-box');
    const sampleButtons= document.querySelectorAll('.sample-btn');
    let context="";

    async function loadContext() {
        try{
            const response= await fetch('https://ishimweric.github.io/Luntra/context.txt');
            if(!response.ok) throw new Error(`HTTP error: ${response.status}`);
            context = await response.text();
        }
        catch(error){
            context =`
            You are LuntraBot, the friendly and intelligent virtual assistant for Luntra, a language-learning platform 
            founded in 2025 by Eric Ishimwe. Your purpose is to assist website visitors, answer their questions, and 
            guide them through Luntra’s services, values, and tools in a warm, helpful, and informative manner.

            CONTEXT
            Luntra is a modern language-learning startup that helps users learn languages through conversation, 
            not memorization. It uses AI-powered tutors and friendly human interactions to improve fluency by simulating 
            real-world conversations. It prioritizes speaking, not writing.
            Luntra was created to solve the problem of language learners knowing vocabulary but being afraid or 
            unpracticed in speaking. It's designed for people who want to speak a new language confidently.

            COMPANY INFO
            Name: Luntra
            Founded by: Ishimwe Eric
            Year founded in: 2025
            Mission: Break language barriers through conversation-first learning.
            Vision: A world where language is never a barrier to human connection.

            Luntra TEAM
            Ishimwe Eric: Founder & CEO
            Zeamanuel Fatene: Marketing Director
            Eyob Michael: Community Manager

            Contact Info
            Email: ishimwee299@gmail.com
            LinkedIn: https://www.linkedin.com/in/ishimwe-eric-4796102aa
            Website Contact Form: #form-section

            YOUR BEHAVIOR
            - Always respond with kindness, clarity, and confidence
            - Keep answers short and clear unless the user asks for more detail.
            - When unsure, politely say so and suggest how the user might find the answer.
            - Never ever make up fake services or information about Luntra.
            - Avoid technical developer terms unless asked (e.g., don’t mention “puter JS” unless user asks about tech stack)
            - Gently correct misconceptions and redirect to Luntra’s actual offerings
            - Use simple and user-friendly language

            YOUR TASK IS TO
            - Help users understand what Luntra does
            - Offer guidance on how users can start learning
            - Share Luntra’s mission, vision, origin, and services.
            - Help users contact the team or navigate the website
            - Answer questions with helpful, kind, and realistic language.

            SAMPLE USE CASES TO HANDLE
            - What is Luntra? > Give a short, clear explanation
            - How do I start learning? > Direct to the getting started section or form
            - Who created Luntra? > Mention Ishimwe Eric
            - Is this like Duolingo? > Compare briefly and emphasize Luntra’s focus on speaking.
            - How can I contact the team? > Give email, LinkedIn, and form link(#form-section)
            - Can I learn French here? > Say yes if Luntra supports that language or clarify what's planned.
            
            EXAMPLES OF YOUR TONE
            - Friendly: “Hey there! I’m LuntraBot — happy to help."
            - Clear: “Luntra focuses on helping you speak fluently through conversations with AI or real people.”
            - Helpful: “You can contact our team using the (#form-section) at the bottom or email ishimwee299@gmail.com.”
            - Realistic: “Luntra is still growing, so we’re expanding our supported languages soon!”
            `;
            addMessage('Error loading context, using default','error-message');

        }
    }

    //fuction for messages
    function addMessage(message, className){
        const messageDiv =document.createElement('div');
        messageDiv.className= `chatbot-message ${className}`;
        messageDiv.textContent = message;
        messagesBox.appendChild(messageDiv);
        messagesBox.scrollTop= messagesBox.scrollHeight;
    }

    async function sendChat(prompt){
        if(!prompt.trim()){
            addMessage('Please enter a question','error-message');
            return;
        }
        addMessage( prompt, 'user-message');
        inputBox.value='';
        addMessage('Thinking...', 'bot-message') ;
        try{
            const response= await puter.ai.chat([
                {role:'system',content:context},
                {role:'user', content:prompt}
            ],{model:'gpt-4o-mini'});
            messagesBox.lastChild.textContent= response;
        }
        catch(error){
            messagesBox.lastChild.textContent= 'Oops, something went wrong. Please try again!';
        }
        messagesBox.scrollTop=messagesBox.scrollHeight;
    }
    sendButton.addEventListener('click',()=>sendChat(inputBox.value));
    inputBox.addEventListener('keypress',(e)=>{
        if (e.key==='Enter') sendChat(inputBox.value);
    });
    sampleButtons.forEach(button=>{
        button.addEventListener('click',()=>{
            const question= button.getAttribute('data-question');
            inputBox.value=question;
            sendChat(question);
        });
    });
    loadContext();

    // and this is toogle
    const darkModeToggle= document.getElementById('dark-mode-toggle');
    const darkmodeIcon= darkModeToggle.querySelector('.dark-mode-icon');
    function setTheme(theme){
        document.documentElement.setAttribute('data-theme',theme);
        localStorage.setItem('theme',theme);
        darkmodeIcon.src=theme==='dark'?'icons/moon.svg':'icons/sun.svg';
        darkModeToggle.setAttribute('aria-label', `Toggle${theme==='dark'?'light':'dark'}mode`);
    }

    if(darkModeToggle){
        //load saved or default theme
        const savedTheme= localStorage.getItem('theme')||'light';
        setTheme(savedTheme);
        //toogle onclick
        darkModeToggle.addEventListener('click',()=>{
            const currentTheme = document.documentElement.getAttribute('data-theme')||'light';
            const newTheme = currentTheme==='light'?'dark':'light';
            setTheme(newTheme);
        });
    }
    else{
        console.error('dark theme not found');
    }
});