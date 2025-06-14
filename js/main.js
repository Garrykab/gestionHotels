// Données simulées des hôtels
const hotelsData = [
    {
        id: 1,
        name: "Hôtel Luxe",
        rating: 5,
        price: 250,
        image: "images/hotel1.jpg",
        amenities: ["Wi-Fi", "Piscine", "Spa", "Restaurant"],
        location: "Paris"
    },
    {
        id: 2,
        name: "Grand Hôtel",
        rating: 4,
        price: 180,
        image: "images/hotel2.jpg",
        amenities: ["Wi-Fi", "Gym", "Bar"],
        location: "Lyon"
    },
    {
        id: 3,
        name: "Hôtel Plage",
        rating: 4,
        price: 200,
        image: "images/hotel3.jpg",
        amenities: ["Wi-Fi", "Piscine", "Plage privée"],
        location: "Nice"
    }
];

$(document).ready(function() {
    // Animation des cartes au chargement
    $('.hotel-card, .category-card').addClass('fade-in');

    // Gestion du formulaire de recherche
    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        const destination = $('#destination').val();
        const checkIn = $('#checkIn').val();
        const checkOut = $('#checkOut').val();
        
        // Redirection vers la page des hôtels avec les paramètres
        window.location.href = `hotels.html?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}`;
    });

    // Effet de survol sur les cartes
    $('.hotel-card, .category-card').hover(
        function() {
            $(this).css('transform', 'translateY(-5px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // Gestion du menu burger
    $('.navbar-toggler').on('click', function() {
        $('.navbar-collapse').toggleClass('show');
    });

    // Fermer le menu burger lors du clic sur un lien ou en dehors du menu
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.navbar-collapse, .navbar-toggler').length) {
            $('.navbar-collapse').removeClass('show');
        }
    });

    $('.navbar-nav .nav-link').on('click', function() {
        $('.navbar-collapse').removeClass('show');
    });

    // Effet d'ombre sur la navbar lors du défilement
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('shadow-sm');
        } else {
            $('.navbar').removeClass('shadow-sm');
        }
    });

    // Initialisation des tooltips Bootstrap
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Gestion des filtres
    $('#priceRange, #ratingFilter, #amenitiesFilter').on('change', function() {
        filterHotels();
    });

    // Fonction de formatage des prix
    function formatPrice(price) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR'
        }).format(price);
    }

    // Fonction de génération des étoiles
    function generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    }

    // Fonction d'affichage des hôtels
    function displayHotels(hotels) {
        const hotelsContainer = $('#hotelsContainer');
        hotelsContainer.empty();

        hotels.forEach(hotel => {
            const hotelCard = `
                <div class="col-md-4 mb-4">
                    <div class="card hotel-card">
                        <img src="${hotel.image}" class="card-img-top" alt="${hotel.name}">
                        <div class="card-body">
                            <h5 class="card-title">${hotel.name}</h5>
                            <div class="rating mb-2">${generateStars(hotel.rating)}</div>
                            <p class="card-text">
                                <i class="fas fa-map-marker-alt"></i> ${hotel.location}<br>
                                <i class="fas fa-wifi"></i> ${hotel.amenities.join(', ')}
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="h5 mb-0">${formatPrice(hotel.price)}</span>
                                <a href="details.html?id=${hotel.id}" class="btn btn-primary">Voir détails</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            hotelsContainer.append(hotelCard);
        });
    }

    // Fonction de filtrage des hôtels
    function filterHotels() {
        const priceRange = $('#priceRange').val();
        const rating = $('#ratingFilter').val();
        const amenities = $('#amenitiesFilter').val();

        let filteredHotels = hotelsData;

        if (priceRange) {
            const [min, max] = priceRange.split('-');
            filteredHotels = filteredHotels.filter(hotel => 
                hotel.price >= parseInt(min) && hotel.price <= parseInt(max)
            );
        }

        if (rating) {
            filteredHotels = filteredHotels.filter(hotel => 
                hotel.rating >= parseInt(rating)
            );
        }

        if (amenities && amenities.length > 0) {
            filteredHotels = filteredHotels.filter(hotel =>
                amenities.every(amenity => hotel.amenities.includes(amenity))
            );
        }

        displayHotels(filteredHotels);
    }

    // Initialisation des filtres
    if ($('#hotelsContainer').length) {
        displayHotels(hotelsData);
    }

    // Toggle Password Visibility
    $('.toggle-password, #togglePassword, #toggleConfirmPassword').on('click', function() {
        const input = $(this).closest('.input-group').find('input');
        const icon = $(this).find('i');
        
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            input.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    // Password Strength Check
    $('#password').on('input', function() {
        const password = $(this).val();
        const strengthBar = $('.password-strength-bar');
        
        // Reset strength
        strengthBar.removeClass('weak medium strong').css('width', '0');
        
        if (password.length > 0) {
            let strength = 0;
            
            // Length check
            if (password.length >= 8) strength += 1;
            
            // Contains number
            if (/\d/.test(password)) strength += 1;
            
            // Contains lowercase
            if (/[a-z]/.test(password)) strength += 1;
            
            // Contains uppercase
            if (/[A-Z]/.test(password)) strength += 1;
            
            // Contains special character
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            
            // Update strength bar
            if (strength <= 2) {
                strengthBar.addClass('weak');
            } else if (strength <= 4) {
                strengthBar.addClass('medium');
            } else {
                strengthBar.addClass('strong');
            }
        }
    });

    // Verification Code Input Handling
    $('.verification-code input').on('input', function() {
        if (this.value.length === 1) {
            const nextInput = $(this).next('input');
            if (nextInput.length) {
                nextInput.focus();
            }
        }
    });

    $('.verification-code input').on('keydown', function(e) {
        if (e.key === 'Backspace' && !this.value) {
            const prevInput = $(this).prev('input');
            if (prevInput.length) {
                prevInput.focus();
            }
        }
    });

    // Form Validation
    $('.needs-validation').on('submit', function(e) {
        e.preventDefault();
        
        if (!this.checkValidity()) {
            e.stopPropagation();
            $(this).addClass('was-validated');
            return;
        }
        
        // Handle form submission based on form ID
        const formId = $(this).attr('id');
        
        switch(formId) {
            case 'loginForm':
                handleLogin($(this));
                break;
            case 'registerForm':
                handleRegister($(this));
                break;
            case 'verifyEmailForm':
                handleVerifyEmail($(this));
                break;
            case 'forgotPasswordForm':
                handleForgotPassword($(this));
                break;
        }
    });

    // Resend Code Button
    $('#resendCode').on('click', function() {
        const button = $(this);
        const countdown = $('#countdown');
        let timeLeft = 60;
        
        button.prop('disabled', true);
        countdown.show();
        
        const timer = setInterval(() => {
            timeLeft--;
            $('#timer').text(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                button.prop('disabled', false);
                countdown.hide();
            }
        }, 1000);
        
        // Simulate sending new code
        setTimeout(() => {
            alert('Un nouveau code a été envoyé à votre adresse email.');
        }, 1000);
    });
});

// Form Submission Handlers
function handleLogin(form) {
    const email = form.find('#email').val();
    const password = form.find('#password').val();
    const rememberMe = form.find('#rememberMe').is(':checked');
    
    // Simulate API call
    console.log('Login attempt:', { email, password, rememberMe });
    
    // Redirect to dashboard on success
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

function handleRegister(form) {
    const firstName = form.find('#firstName').val();
    const lastName = form.find('#lastName').val();
    const email = form.find('#email').val();
    const password = form.find('#password').val();
    
    // Simulate API call
    console.log('Register attempt:', { firstName, lastName, email, password });
    
    // Redirect to email verification
    setTimeout(() => {
        window.location.href = 'verify-email.html';
    }, 1000);
}

function handleVerifyEmail(form) {
    const code = Array.from(form.find('.verification-code input')).map(input => input.value).join('');
    
    // Simulate API call
    console.log('Verification attempt:', { code });
    
    // Redirect to dashboard on success
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

function handleForgotPassword(form) {
    const email = form.find('#email').val();
    
    // Simulate API call
    console.log('Password reset request:', { email });
    
    // Show success message
    alert('Un email de réinitialisation a été envoyé à votre adresse email.');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

// Loader
window.addEventListener('load', function() {
    const loader = document.querySelector('.loader-wrapper');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Scroll Animations
function reveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}); 