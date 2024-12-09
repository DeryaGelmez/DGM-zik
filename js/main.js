(function ($) {
    "use strict";

    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1500,
        responsive: {
            0: { items: 2 },
            576: { items: 3 },
            768: { items: 4 },
            992: { items: 5 },
            1200: { items: 6 }
        }
    });

    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: true,
        navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            992: { items: 4 }
        }
    });

    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        var newVal = button.hasClass('btn-plus') ? parseFloat(oldValue) + 1 : Math.max(parseFloat(oldValue) - 1, 0);
        button.parent().parent().find('input').val(newVal);
    });

    document.querySelector('[data-toggle="collapse"]').addEventListener('click', function () {
        document.querySelector('.menu-overlay').classList.toggle('active');
    });

   
    $('.indirimdekiler-carousel').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
        dots: false,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            992: { items: 4 },
            1200: { items: 5 }
        }
    });

    document.getElementById("search-box").addEventListener("keyup", function () {
        const searchQuery = this.value.toLowerCase();
        const searchResultsContainer = document.getElementById("search-results");
        searchResultsContainer.innerHTML = "";
        searchResultsContainer.style.display = searchQuery ? "block" : "none";

        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchQuery)
        );

        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const resultItem = document.createElement("a");
                resultItem.href = product.link;
                resultItem.className = "dropdown-item";
                resultItem.textContent = product.name;
                searchResultsContainer.appendChild(resultItem);
            });
        } else {
            const noResultsMessage = document.createElement("div");
            noResultsMessage.className = "dropdown-item text-muted";
            noResultsMessage.textContent = "Sonuç bulunamadı.";
            searchResultsContainer.appendChild(noResultsMessage);
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const favoritesList = document.getElementById('favorites-list');
        if (favorites.length === 0) {
            favoritesList.innerHTML = '<p class="text-center">Henüz favorilere ürün eklenmedi.</p>';
        } else {
            favorites.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-4 mb-4';
                productCard.innerHTML = `
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text text-danger">${product.price}</p>
                            <button class="btn btn-danger remove-favorite" data-index="${index}">
                                Favorilerden Kaldır
                            </button>
                        </div>
                    </div>
                `;
                favoritesList.appendChild(productCard);
            });

            document.querySelectorAll('.remove-favorite').forEach(button => {
                button.addEventListener('click', function () {
                    const index = this.getAttribute('data-index');
                    favorites.splice(index, 1);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    this.closest('.col-md-4').remove();
                });
            });
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        const stars = document.querySelectorAll('#rating-stars i');
        const ratingInput = document.getElementById('rating-value');
    
        // Her bir yıldıza tıklama işlevi ekliyoruz.
        stars.forEach(star => {
            star.addEventListener('click', function () {
                const value = this.getAttribute('data-value');
                ratingInput.value = value; 
                highlightStars(value); 
            });
    
            star.addEventListener('mouseover', function () {
                highlightStars(this.getAttribute('data-value')); 
            });
    
            star.addEventListener('mouseout', function () {
                highlightStars(ratingInput.value); 
            });
        });
    
        // Yıldızları güncelleme
        function highlightStars(value) {
            stars.forEach(star => {
                if (star.getAttribute('data-value') <= value) {
                    star.classList.remove('far'); 
                    star.classList.add('fas'); 
                } else {
                    star.classList.remove('fas'); 
                    star.classList.add('far'); 
                }
            });
        }
    });
    
    

})(jQuery);


