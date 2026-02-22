document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            menuToggle.classList.toggle('active');

            // Toggle icon between bars and times
            const icon = menuToggle.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Validating Quote Form (Basic Frontend Validation)
    const quoteForm = document.querySelector('.quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your inquiry! We will get back to you shortly.');
            quoteForm.reset();
        });
    }

    // Sticky Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.slider-btn.next');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideIntervalTime = 5000;

    // Check if slider exists
    if (slides.length > 0) {
        let slideInterval;

        const showSlide = (index) => {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide++;
            if (currentSlide > slides.length - 1) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        };

        const prevSlide = () => {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            showSlide(currentSlide);
        };

        // Event Listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                resetInterval();
            });
        });

        // Auto Play
        slideInterval = setInterval(nextSlide, slideIntervalTime);

        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, slideIntervalTime);
        };
    }

    // Cloudinary Integration
    if (typeof cloudinary !== 'undefined' && CLOUDINARY_CONFIG.cloudName !== 'YOUR_CLOUD_NAME_HERE') {
        console.log('Cloudinary is ready!');

        // Example: Initialize Upload Widget
        const myWidget = cloudinary.createUploadWidget({
            cloudName: CLOUDINARY_CONFIG.cloudName,
            uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
            sources: ['local', 'url'], // Specify sources to help it load faster
            multiple: false
        }, (error, result) => {
            if (error) {
                console.error("Cloudinary Widget Error:", error);
            }
            if (!error && result && result.event === "success") {
                console.log('Done! Image info: ', result.info);
                alert('Upload successful! \nPublic ID: ' + result.info.public_id);
            }
        });

        // Add a hidden button or triggered by a specific element for admins
        // For demonstration, let's look for an element with id 'upload-widget'
        const uploadButton = document.getElementById('upload-widget');
        if (uploadButton) {
            uploadButton.addEventListener('click', () => {
                myWidget.open();
            }, false);
        }

        // Automatic Dynamic Swapping
        document.querySelectorAll('img[data-cloudinary-id]').forEach(img => {
            const publicId = img.getAttribute('data-cloudinary-id');
            if (publicId) {
                // Determine dimensions based on class or actual size
                const options = {
                    width: img.classList.contains('project-image') ? 600 : 800,
                    quality: 'auto',
                    format: 'auto'
                };
                img.src = getCloudinaryUrl(publicId, options);
            }
        });
    } else {
        console.log('Cloudinary is not configured yet. Please update js/cloudinary-config.js');
    }
});
