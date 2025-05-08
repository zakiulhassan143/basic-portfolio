// script.js

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Animate Sections on Scroll ---
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top center',
            toggleActions: 'play none none none',
            // markers: true, // Uncomment for debugging
            // id: section.id || 'section' // Uncomment for debugging
        }
    });
});

// --- Animate Hero Section Elements on Page Load ---
const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTimeline.from("#hero h2", { opacity: 0, y: 20, duration: 1, delay: 0.5 })
            .from("#hero p", { opacity: 0, y: 20, duration: 1 }, "-=0.7")
            .from("#hero button", { opacity: 0, y: 20, duration: 1 }, "-=0.7");


// --- Animate Biography Section Paragraphs on Scroll (Enhanced Stagger) ---
gsap.utils.toArray('#biography p').forEach((p, index) => {
     gsap.from(p, {
        opacity: 0,
        x: -50, // Slide in from the left
        duration: 1,
        ease: "power2.out",
        // Add a slight delay based on the paragraph index for a stagger effect
        delay: index * 0.2,
        scrollTrigger: {
            trigger: p, // Each paragraph is a trigger
            start: 'top 85%',
            toggleActions: 'play none none none',
            // markers: true, // Uncomment for debugging
            // id: 'bio-paragraph-' + (index + 1) // Uncomment for debugging
        }
    });
});


// --- Animate Skills Section Chips and Progress Bars on Scroll & Add Chip Hover Animation ---
gsap.utils.toArray('#skills li').forEach(chip => {
     const progressBar = chip.querySelector('.progress-bar');
     const skillLevel = chip.getAttribute('data-level');

     // Map skill level to a target width percentage
     let targetWidth = 0;
     if (skillLevel === 'professional') {
         targetWidth = 90; // 90% for professional
     } else if (skillLevel === 'intermediate') {
         targetWidth = 60; // 60% for intermediate
     }
     // Add more levels if needed (e.g., beginner: 30)


     // GSAP Timeline for the chip's entrance and progress bar animation
     const skillTimeline = gsap.timeline({
         scrollTrigger: {
             trigger: chip, // Each chip is a trigger
             start: 'top 80%', // Animation starts when the top of the chip is 80% from the top
             toggleActions: 'play none none none',
             // markers: true, // Uncomment for debugging
             // id: 'skill-animation-' + (chip.querySelector('.skill-name').textContent) // Uncomment for debugging
         }
     });

     // Animate the chip's entrance (fade and slight move)
     skillTimeline.from(chip, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
     });

     // Animate the progress bar width after the chip has appeared
     skillTimeline.to(progressBar, {
         width: targetWidth + '%', // Animate to the calculated percentage
         duration: 1.2, // Animation duration for the bar fill
         ease: "power2.out"
     }, "-=0.4"); // Start the bar animation slightly before the chip entrance ends


    // GSAP Hover animation for each chip (Keep this)
    chip.addEventListener('mouseenter', () => {
        gsap.to(chip, { scale: 1.05, duration: 0.3, ease: "back.out(1.7)", overwrite: 'auto' }); // Subtle scale
    });
    chip.addEventListener('mouseleave', () => {
        gsap.to(chip, { scale: 1, duration: 0.3, ease: "power2.out", overwrite: 'auto' });
    });
});


// --- Animate Project Cards on Scroll ---
gsap.utils.toArray('.project-card').forEach(card => {
     gsap.from(card, {
        opacity: 0,
        y: 50, // Slide in from the bottom
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: card, // Each card is a trigger
            start: 'top 80%', // Animation starts when the top of the card is 80% from the top
            toggleActions: 'play none none none',
            // markers: true, // Uncomment for debugging
            // id: 'project-card-entrance' // Uncomment for debugging
        }
    });
});


// --- Random Quote Display and Floating Animation ---

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Creativity is just connecting things.", author: "Steve Jobs" },
    { text: "Design is not just what it looks like and feels like. Design is how it works.", author: "Steve Jobs" },
    { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
    { text: "The art challenges the technology, and the technology inspires the art.", author: "John Lasseter" }
];

const quoteBlockquote = document.querySelector('#quote blockquote');
const quoteCite = document.querySelector('#quote cite');

if (quoteBlockquote && quoteCite) {
    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteBlockquote.textContent = `"${randomQuote.text}"`; // Add quotes around the text
        quoteCite.textContent = `- ${randomQuote.author}`;
    }

    displayRandomQuote(); // Display on page load

    // GSAP Animation for Quote elements (Floating)
    const quoteTimeline = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut", duration: 3 } });

    // Animate blockquote and cite slightly differently for a more dynamic float
    quoteTimeline.to(quoteBlockquote, { y: -15 }, 0)
                  .to(quoteCite, { y: -10 }, 0.1); // Slightly less movement and a small delay


     // Add a ScrollTrigger to fade and scale in the quote section
     gsap.from("#quote", {
         opacity: 0,
         scale: 0.9,
         duration: 1,
         scrollTrigger: {
             trigger: "#quote",
             start: 'top center',
             toggleActions: 'play none none none',
             // markers: true,
             // id: 'quote-section-fade'
         }
     });

} else {
    console.warn("Quote section elements not found.");
}


// --- Animate Contact Section Social Icons on Scroll & Add Hover Animation ---
gsap.utils.toArray('.social-links a').forEach((iconLink, index) => {
     // Entrance animation on scroll
     gsap.from(iconLink, {
        opacity: 0,
        scale: 0.5, // Start smaller
        duration: 0.6,
        ease: "back.out(1.7)", // Use a bouncy ease
        // Add a slight delay based on the icon index for a stagger effect
        delay: index * 0.1,
        scrollTrigger: {
            trigger: ".social-links", // The social links container triggers the animation
            start: 'top 85%',
            toggleActions: 'play none none none',
            // markers: true, // Uncomment for debugging
            // id: 'social-icon-entrance-' + (index + 1) // Uncomment for debugging
        }
    });

    // GSAP Hover animation for each icon
    iconLink.addEventListener('mouseenter', () => {
        gsap.to(iconLink, { y: -5, duration: 0.3, ease: "power2.out" }); // Move up slightly
    });
    iconLink.addEventListener('mouseleave', () => {
        gsap.to(iconLink, { y: 0, duration: 0.3, ease: "power2.out" }); // Move back to original position
    });
});


// --- Following Dot Cursor (Smoother Transition) ---
const followerCursor = document.querySelector('.follower-cursor');

if (followerCursor) {
    let mouseX = 0;
    let mouseY = 0;

    // Set the initial position of the cursor outside the viewport
    gsap.set(followerCursor, { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    // Use a single GSAP .to tween that updates its target on mousemove
    // This creates the smooth following effect
    gsap.to(followerCursor, {
        x: mouseX, // Target x position
        y: mouseY, // Target y position
        duration: 0.3, // How quickly the dot tries to catch up (lower for faster, higher for slower/springier)
        ease: "power1.out", // A smoother ease for a following effect (try "sine.out", "power2.out")
        onUpdate: () => { // Keep updating the target position
            // Update the target coordinates for the tween on each update cycle
             followerCursor._gsap.x = mouseX;
             followerCursor._gsap.y = mouseY;
        }
    });

    // Update mouse coordinates on mousemove
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Optional: Adjust ease and duration for different feels
    // You can experiment with duration (e.g., 0.2, 0.4, 0.5) and eases:
    // "power1.out", "power2.out", "power3.out", "sine.out", "circ.out",
    // or even more springy ones like "elastic.out(1, 0.3)" or "back.out(1.7)"
    // Be mindful that overly springy eases can sometimes feel less smooth depending on the element.

} else {
    console.warn("Follower cursor element not found.");
}


// --- Animate Navbar on Scroll ---
const mainHeader = document.querySelector('header');
// Get the header's height dynamically in case it changes
const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;

if (mainHeader) {
    gsap.to(mainHeader, {
        // Change background color and box-shadow when scrolled past the initial section
        // Note: Animating background-color directly in GSAP requires the GSAP CSSPlugin,
        // but animating it with a ScrollTrigger tied to a CSS variable change is often cleaner.
        // We'll primarily animate the box-shadow here, and let CSS handle the color based on theme.
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add shadow for light mode
        ease: 'none', // Linear transition
        scrollTrigger: {
            trigger: "body", // Trigger is the body/viewport scroll
            start: "top -1px", // Start 1px after the very top
             end: "top -="+ headerHeight, // End when scrolled past the header height
            scrub: true, // Smoothly link animation to scroll position
            // markers: true, // Uncomment for debugging
            // id: 'navbar-animation' // Uncomment for debugging
        }
    });

    // Adjust dark mode shadow for the scrolled navbar
    // This ScrollTrigger runs in parallel and overrides the light mode shadow when dark mode is active
     gsap.to(mainHeader, {
         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', // Darker shadow in dark mode
         ease: 'none',
         scrollTrigger: {
              trigger: "body",
              start: "top -1px",
              end: "top -="+ headerHeight,
              scrub: true,
              // markers: true,
              // id: 'navbar-dark-shadow'
          }
     });

     // You might also want to animate the header's background color
     // This can be done by animating a dummy property and updating a CSS variable
     // Or by adding/removing a class with a transition in CSS and using ScrollTrigger to toggle the class.
     // For simplicity and relying on the CSS transitions we set up for theme toggle,
     // the background color will transition smoothly as the dark-mode class is toggled,
     // and the scroll trigger manages the shadow state based on scroll position.

} else {
    console.warn("Header element not found for navbar animation.");
}


// --- Theme Toggle Functionality ---
const themeToggleButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-footer');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

themeToggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Save theme preference to local storage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.removeItem('theme'); // Or set 'light-mode'
        }
    });
});