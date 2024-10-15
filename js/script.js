// Intersection Observer for Scroll Animations
const sections = document.querySelectorAll('.section-animated');

const options = {
    root: null, // Use the viewport as the root
    threshold: 0.1 // Trigger when 10% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Add the visible class when in view
            observer.unobserve(entry.target); // Stop observing this section
        }
    });
}, options);

// Observe each section
sections.forEach(section => {
    observer.observe(section);
});

// Navbar Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const contactResults = document.getElementById('contactResults');
const resultName = document.getElementById('resultName');
const resultEmail = document.getElementById('resultEmail');
const resultMessage = document.getElementById('resultMessage');

// Check if there is stored data in localStorage
window.addEventListener('load', () => {
    // Hanya ambil data dari localStorage jika tidak ada data yang di-submit
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const storedMessage = localStorage.getItem('message');

    if (storedName && storedEmail && storedMessage) {
        resultName.textContent = storedName;
        resultEmail.textContent = storedEmail;
        resultMessage.textContent = storedMessage;
        contactResults.classList.remove('hidden');
    }
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
        formMessage.classList.remove('hidden');
        formMessage.textContent = 'Message Sent!';
        formMessage.classList.remove('text-red-400');
        formMessage.classList.add('text-green-400');

        // Display the contact results
        resultName.textContent = name;
        resultEmail.textContent = email;
        resultMessage.textContent = message;
        contactResults.classList.remove('hidden');

        // Save the form data to localStorage
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('message', message);

        // Clear the form
        contactForm.reset();

        // Clear localStorage after showing results
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('message');
    } else {
        formMessage.classList.remove('hidden');
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.classList.remove('text-green-400');
        formMessage.classList.add('text-red-400');
        contactResults.classList.add('hidden');
    }
});



