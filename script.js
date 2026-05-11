document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Scroll Arrow Click
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            document.getElementById('testimonials').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Testimonials Data
    const testimonials = [
        {
            user: "u/Ehrenbruder44",
            quote: "I‘m running a fashion brand for 2.5 years now & I‘ve been spending a crazy amount of time optimizing our return process to lower chargebacks.",
            source: "r/ecommerce",
            category: "ecommerce"
        },
        {
            user: "u/198one",
            quote: "One way to handle this is by offering worry-free sizing returns and baking the cost into your pricing. That way, customers feel confident buying.",
            source: "r/ecommerce",
            category: "ecommerce"
        },
        {
            user: "u/trashpandaclimbs",
            quote: "Inconsistent sizing is the worst. You’d think if it was the same [brand] it would fit the same. Thank goodness for reviews and photos.",
            source: "r/FemaleFashionAdvice",
            category: "fashion"
        },
        {
            user: "u/peanutbuddy",
            quote: "I do most of my shopping online. I don't have many physical stores near me. My biggest gripe and the main reason I return clothes is sizing.",
            source: "r/FemaleFashionAdvice",
            category: "fashion"
        },
        {
            user: "u/UnoriginalBasil",
            quote: "When people started using that sizing system all pants were worn around your natural waist, and were not super fitted through the hip. Thus it made things complicated.",
            source: "r/FemaleFashionAdvice",
            category: "fashion"
        },
        {
            user: "u/cancerkidette",
            quote: "Vanity sizing. You will likely have to size down in most high st shops. Exceptions may be the ones with lines more catered to young women/teens.",
            source: "r/FemaleFashionAdvice",
            category: "fashion"
        },
        {
            user: "u/oshadha_B",
            quote: "I'm pretty much in your situation right now... I went with reverse logistics and I'll be doing a study on the returns process.",
            source: "r/logistics",
            category: "supplychain"
        },
        {
            user: "u/Superb_Good2256",
            quote: "I work for a reverse logistics company that specializes in returns management solutions. We’re a global company and we help provide the very best options.",
            source: "r/logistics",
            category: "supplychain"
        },
        {
            user: "u/SheetHappensXL",
            quote: "As for returns eating into profits — that’s tough. Sometimes it’s product fit, sometimes it’s expectations. Have you tried adding more sizing/fit guidance?",
            source: "r/ecommerce",
            category: "ecommerce"
        },
        {
            user: "u/November96",
            quote: "I’m looking for help on sizing... I’m usually a USA 0-2, waist 26 and hip 37. At target I’m a 0 but elsewhere a 2 or 4.",
            source: "r/FemaleFashionAdvice",
            category: "fashion"
        }
    ];

    // Generate Testimonial HTML
    const createCard = (t) => {
        const initials = t.user.replace('u/', '').slice(0, 2).toUpperCase();
        const usernameBase = t.user.slice(0, -4);
        const usernameBlur = t.user.slice(-4);
        
        return `
            <div class="testimonial-card">
                <span class="testimonial-badge ${t.category}">${t.source}</span>
                <p class="testimonial-quote">"${t.quote}"</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar">${initials}</div>
                    <div class="testimonial-meta">
                        <div class="testimonial-name">
                            ${usernameBase}<span style="filter: blur(4px); user-select: none; opacity: 0.5;">${usernameBlur}</span>
                        </div>
                        <div class="testimonial-source">Reddit</div>
                    </div>
                </div>
            </div>
        `;
    };

    // Populate carousels
    const track1 = document.getElementById('track-1');
    const track2 = document.getElementById('track-2');

    if (track1 && track2) {
        const mid = Math.ceil(testimonials.length / 2);
        const firstHalf = testimonials.slice(0, mid);
        const secondHalf = testimonials.slice(mid);
        
        // Duplicate for infinite scroll
        const row1Data = [...firstHalf, ...firstHalf];
        const row2Data = [...secondHalf, ...secondHalf];

        track1.innerHTML = row1Data.map(createCard).join('');
        track2.innerHTML = row2Data.map(createCard).join('');
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
