(function() {
  "use strict";

  
   // Easy selector helper function
   
	const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
	}
	

	// Easy event listener function
   
	const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
	}
	

	// Easy on scroll event listener 
   
	const onscroll = (el, listener) => {
		el.addEventListener('scroll', listener)
	}
	  

	// Navbar links active state on scroll
   
	let navbarlinks = select('#navbar .scrollto', true)
	const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
	}
	window.addEventListener('load', navbarlinksActive)
	onscroll(document, navbarlinksActive)


	// Scrolls to an element with header offset
   
	const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
	}


	// Toggle .header-scrolled class to #header when page is scrolled
   
	let selectHeader = select('#header')
	if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
	}


	// Back to top button
   
	let backtotop = select('.back-to-top')
	if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
	}

	// Mobile nav toggle
   
	on('click', '.mobile-nav-toggle', function(e) {
		select('#navbar').classList.toggle('navbar-mobile')
		this.classList.toggle('bi-list')
		this.classList.toggle('bi-x')
	})


	// Scrool with ofset on links with a class name .scrollto
   
	on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
	}, true)

   
   // Scroll with ofset on page load with hash links in the url
   
	window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
	});

  
	// Pogo Slider 
  
    var mySlider = $('.pogoSlider').pogoSlider({
        pauseOnHover: false
    }).data('plugin_pogoSlider');
  
  
  
	// Gallery carousel (uses the Owl Carousel library)
  
	$(".gallery-slider").owlCarousel({
		autoplay: true,
		dots: true,
		loop: true,
		smartSpeed: 2500,
		center: true,
		nav: true,
		navText: ['<i class="las la-angle-left"></i>', '<i class="las la-angle-right"></i>'],
		autoplay: true,
		autoplayTimeout: 3500,
		responsiveClass: true,
		responsive: {
		  0: {
			items: 1
		  },
		  768: {
			items: 2
		  },
		  992: {
			items: 3
		  },
		  1200: {
			items: 3
		  }
		}
	});
  
	
	// Google Review Slider
	
	$(".google-reviews-carousel").owlCarousel({
		items: 1,
		//smartSpeed: 2500,
		loop: true,
		nav: false,
		dots: true,
		navText: ['<i class="las la-angle-left"></i>', '<i class="las la-angle-right"></i>'],
		autoplay: true,
		autoplayTimeout: 6000,
		autoplayHoverPause: true,
		margin: 0,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 1
			},
			1200: {
				items: 1
			}
		}
	});

	// GLightbox


	var lightbox = GLightbox();
	lightbox.on('open', (target) => {
		console.log('lightbox opened');
	});
	var lightboxDescription = GLightbox({
		selector: '.glightbox2'
	});
	var lightboxVideo = GLightbox({
		selector: '.glightbox3'
	});
	lightboxVideo.on('slide_changed', ({ prev, current }) => {
		console.log('Prev slide', prev);
		console.log('Current slide', current);

		const { slideIndex, slideNode, slideConfig, player } = current;

		if (player) {
			if (!player.ready) {
				// If player is not ready
				player.on('ready', (event) => {
					// Do something when video is ready
				});
			}

			player.on('play', (event) => {
				console.log('Started play');
			});

			player.on('volumechange', (event) => {
				console.log('Volume change');
			});

			player.on('ended', (event) => {
				console.log('Video ended');
			});
		}
	});

	var lightboxInlineIframe = GLightbox({
		selector: '.glightbox4'
	});
	
  
	// Animation On Scroll
  
	window.addEventListener('load', () => {
	AOS.init({
	  duration: 1000,
	  easing: 'ease-in-out',
	  once: true,
	  mirror: false
	})
	});
  

})()