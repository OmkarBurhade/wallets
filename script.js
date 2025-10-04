// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Product Data
const products = [
    {
        id: 1,
        name: "Classic Leather Bifold",
        description: "Timeless design with premium leather construction. Features 8 card slots, 2 bill compartments, and RFID blocking technology.",
        price: "$89.99",
        icon: "fas fa-wallet",
        gradient: "from-blue-500 to-purple-600",
        whatsappMessage: "Hi! I'm interested in the Classic Leather Bifold wallet. Can you tell me more about its features and availability?"
    },
    {
        id: 2,
        name: "Minimalist Card Holder",
        description: "Sleek and slim design perfect for the modern professional. Holds up to 6 cards with easy access and premium leather finish.",
        price: "$59.99",
        icon: "fas fa-id-card",
        gradient: "from-pink-500 to-red-500",
        whatsappMessage: "Hello! I'd like to know more about the Minimalist Card Holder. Is it available in different colors?"
    },
    {
        id: 3,
        name: "Executive Money Clip",
        description: "Sophisticated money clip wallet combining style and functionality. Features genuine leather exterior with polished metal clip.",
        price: "$79.99",
        icon: "fas fa-money-bill-wave",
        gradient: "from-cyan-500 to-blue-500",
        whatsappMessage: "Hi there! I'm considering the Executive Money Clip wallet. What's the capacity for cards and cash?"
    },
    {
        id: 4,
        name: "Travel RFID Wallet",
        description: "Advanced security wallet with RFID blocking technology. Perfect for travel with multiple compartments and passport slot.",
        price: "$119.99",
        icon: "fas fa-shield-alt",
        gradient: "from-yellow-500 to-orange-500",
        whatsappMessage: "Hello! I'm interested in the Travel RFID Wallet for my upcoming trip. Does it come with international shipping?"
    },
    {
        id: 5,
        name: "Luxury Italian Leather",
        description: "Handcrafted from premium Italian leather. Features hand-stitched details, 10 card slots, and coin compartment.",
        price: "$149.99",
        icon: "fas fa-crown",
        gradient: "from-purple-500 to-pink-500",
        whatsappMessage: "Hi! The Luxury Italian Leather wallet looks amazing. What's the warranty coverage and care instructions?"
    },
    {
        id: 6,
        name: "Smart Digital Wallet",
        description: "Innovative design with built-in power bank and USB charging port. Modern functionality meets classic leather aesthetics.",
        price: "$199.99",
        icon: "fas fa-mobile-alt",
        gradient: "from-indigo-500 to-purple-500",
        whatsappMessage: "Hello! I'm curious about the Smart Digital Wallet. How long does the battery last and what's the charging time?"
    }
];

// WhatsApp Configuration
const WHATSAPP_PHONE = "+1234567890"; // Replace with your actual WhatsApp number

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeGSAP();
    loadProducts();
    setupNavigation();
    setupScrollEffects();
    setupParallaxEffects();
    setupMicroInteractions();
    testSmoothScrolling(); // Test smooth scrolling functionality
});

// Test smooth scrolling functionality
function testSmoothScrolling() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        console.log('✅ Products section found and ready for smooth scrolling');
    } else {
        console.error('❌ Products section not found!');
    }
    
    // Test if GSAP ScrollToPlugin is loaded
    if (typeof ScrollToPlugin !== 'undefined') {
        console.log('✅ GSAP ScrollToPlugin loaded successfully');
    } else {
        console.warn('⚠️ GSAP ScrollToPlugin not loaded, using fallback');
    }
}

// Initialize GSAP Animations
function initializeGSAP() {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from("#hero-content", { 
            duration: 1.2, 
            y: 100, 
            opacity: 0, 
            ease: "power3.out" 
        })
        .from("#hero-title", { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            ease: "power3.out" 
        }, "-=0.8")
        .from("#hero-description", { 
            duration: 0.8, 
            y: 30, 
            opacity: 0, 
            ease: "power3.out" 
        }, "-=0.6")
        .from("#hero-buttons", { 
            duration: 0.8, 
            y: 30, 
            opacity: 0, 
            ease: "power3.out" 
        }, "-=0.4");

    // Hero image animation
    gsap.from("#hero-image", {
        duration: 1.5,
        x: 100,
        opacity: 0,
        ease: "power3.out",
        delay: 0.5
    });

    // Floating wallet animation
    gsap.to("#floating-wallet", {
        duration: 3,
        y: -20,
        rotation: 5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
    });

    // Features section scroll animation
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            y: 60,
            opacity: 0,
            ease: "power3.out",
            delay: index * 0.2
        });
    });

    // Products section animation
    gsap.from("#productsGrid", {
        scrollTrigger: {
            trigger: "#products",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
        },
        duration: 1,
        y: 80,
        opacity: 0,
        ease: "power3.out"
    });

    // Contact cards animation
    gsap.utils.toArray('.contact-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            y: 60,
            opacity: 0,
            ease: "power3.out",
            delay: index * 0.2
        });
    });

    // Logo animation
    gsap.from("#logo", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power3.out"
    });

    // Navigation links animation
    gsap.from(".nav-link", {
        duration: 0.8,
        y: -30,
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3
    });
}

// Load products with GSAP animations
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    products.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(50px)';
        productsGrid.appendChild(productCard);
        
        // Animate each product card
        gsap.to(productCard, {
            duration: 0.8,
            y: 0,
            opacity: 1,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
                trigger: productCard,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Create product card with Tailwind CSS
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-primary/20 hover:-translate-y-2';
    
    card.innerHTML = `
        <div class="relative h-64 bg-gradient-to-br ${product.gradient} overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
                <i class="${product.icon} text-6xl text-white/90"></i>
            </div>
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <div class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                <i class="fas fa-heart text-white/80"></i>
            </div>
        </div>
        <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300">${product.name}</h3>
            <p class="text-gray-600 mb-4 leading-relaxed">${product.description}</p>
            <div class="flex items-center justify-between mb-4">
                <span class="text-2xl font-bold text-primary">${product.price}</span>
                <div class="flex items-center text-yellow-500">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
            </div>
            <button onclick="openWhatsApp(${product.id})" class="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group">
                <i class="fab fa-whatsapp text-lg group-hover:scale-110 transition-transform duration-300"></i>
                Buy Now
            </button>
        </div>
    `;
    
    return card;
}

// Setup navigation with GSAP animations
function setupNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        const isOpen = mobileMenu.classList.contains('opacity-100');
        
        if (isOpen) {
            gsap.to(mobileMenu, {
                duration: 0.3,
                y: -20,
                opacity: 0,
                ease: "power2.out",
                onComplete: () => {
                    mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                    mobileMenu.classList.add('opacity-0', '-translate-y-full');
                }
            });
            
            // Hamburger animation
            gsap.to('.hamburger-line:nth-child(1)', { rotation: 0, y: 0 });
            gsap.to('.hamburger-line:nth-child(2)', { opacity: 1 });
            gsap.to('.hamburger-line:nth-child(3)', { rotation: 0, y: 0 });
        } else {
            mobileMenu.classList.remove('opacity-0', '-translate-y-full');
            mobileMenu.classList.add('opacity-100', 'translate-y-0');
            
            gsap.from(mobileMenu, {
                duration: 0.3,
                y: -20,
                opacity: 0,
                ease: "power2.out"
            });
            
            // Hamburger animation
            gsap.to('.hamburger-line:nth-child(1)', { rotation: -45, y: 6 });
            gsap.to('.hamburger-line:nth-child(2)', { opacity: 0 });
            gsap.to('.hamburger-line:nth-child(3)', { rotation: 45, y: -6 });
        }
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            gsap.to(mobileMenu, {
                duration: 0.3,
                y: -20,
                opacity: 0,
                ease: "power2.out",
                onComplete: () => {
                    mobileMenu.classList.remove('opacity-100', 'translate-y-0');
                    mobileMenu.classList.add('opacity-0', '-translate-y-full');
                }
            });
        });
    });
}

// Setup scroll effects
function setupScrollEffects() {
    // Navbar scroll effect
    ScrollTrigger.create({
        trigger: "body",
        start: "top -80",
        end: 99999,
        onEnter: () => {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        },
        onLeave: () => {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        },
        onEnterBack: () => {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        },
        onLeaveBack: () => {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Parallax effect for hero background
    gsap.to(".hero-bg-elements", {
        scrollTrigger: {
            trigger: "#home",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        y: -100,
        ease: "none"
    });
}

// Setup parallax effects
function setupParallaxEffects() {
    // Floating elements parallax
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: -50 * (index % 2 === 0 ? 1 : -1),
            ease: "none"
        });
    });
}

// Setup micro-interactions
function setupMicroInteractions() {
    // Button hover effects
    document.querySelectorAll('button, .btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, { duration: 0.3, scale: 1.05, ease: "power2.out" });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, { duration: 0.3, scale: 1, ease: "power2.out" });
        });
    });
    
    // Card hover effects
    document.querySelectorAll('.feature-card, .contact-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, { duration: 0.3, y: -10, scale: 1.02, ease: "power2.out" });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, { duration: 0.3, y: 0, scale: 1, ease: "power2.out" });
        });
    });
}

// Enhanced WhatsApp integration
function openWhatsApp(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Create enhanced message with emojis and formatting
    const timestamp = new Date().toLocaleString();
    const message = `🛍️ *PREMIUM WALLETS INQUIRY* 🛍️

📱 *Product:* ${product.name}
💰 *Price:* ${product.price}
⏰ *Inquiry Time:* ${timestamp}

💬 *Message:* ${product.whatsappMessage}

━━━━━━━━━━━━━━━━━━━━━━━━
🔗 *Sent from PremiumWallets Website*
✨ *Thank you for your interest!* ✨`;

    const encodedMessage = encodeURIComponent(message);
    const phone = WHATSAPP_PHONE.replace(/[^\d]/g, '');
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    
    // Animate the button click
    const button = event.target.closest('button');
    gsap.to(button, {
        duration: 0.2,
        scale: 0.95,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            window.open(whatsappUrl, '_blank');
            showPurchaseFeedback(product.name);
        }
    });
}

// Enhanced purchase feedback with GSAP
function showPurchaseFeedback(productName) {
    // Remove existing feedback if any
    const existingFeedback = document.querySelector('.purchase-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = 'purchase-feedback fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50';
    feedback.innerHTML = `
        <div class="bg-green-500 text-white px-8 py-6 rounded-2xl shadow-2xl backdrop-blur-md border border-green-400/20">
            <div class="flex items-center gap-3">
                <i class="fab fa-whatsapp text-2xl"></i>
                <div>
                    <p class="font-semibold">Opening WhatsApp...</p>
                    <p class="text-sm opacity-90">For ${productName}</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(feedback);
    
    // Animate in
    gsap.from(feedback, {
        duration: 0.5,
        scale: 0.5,
        opacity: 0,
        ease: "back.out(1.7)"
    });
    
    // Animate out after 3 seconds
    gsap.to(feedback, {
        duration: 0.3,
        scale: 0.5,
        opacity: 0,
        ease: "back.in(1.7)",
        delay: 3,
        onComplete: () => {
            document.body.removeChild(feedback);
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            // Try GSAP scrollTo first, fallback to native smooth scroll
            try {
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: { y: offsetTop, autoKill: false },
                    ease: "power3.inOut"
                });
            } catch (error) {
                // Fallback to native smooth scrolling
                console.log('GSAP ScrollTo not available, using native scroll');
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        } else {
            console.warn(`Target element not found: ${targetId}`);
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    gsap.from('body', {
        duration: 0.5,
        opacity: 0,
        ease: "power2.out"
    });
});

// Performance optimization: Intersection Observer for lazy loading
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
        }
    });
}, observerOptions);

// Observe elements for lazy loading
document.querySelectorAll('.feature-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// Add cursor trail effect
let mouseTrail = [];
const trailLength = 20;

document.addEventListener('mousemove', function(e) {
    mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (mouseTrail.length > trailLength) {
        mouseTrail.shift();
    }
    
    // Create trail element
    const trail = document.createElement('div');
    trail.className = 'fixed w-2 h-2 bg-primary/30 rounded-full pointer-events-none z-50';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    document.body.appendChild(trail);
    
    // Animate trail
    gsap.to(trail, {
        duration: 0.8,
        scale: 0,
        opacity: 0,
        ease: "power2.out",
        onComplete: () => {
            document.body.removeChild(trail);
        }
    });
});

console.log('🚀 PremiumWallets website with GSAP animations loaded successfully!');
console.log('🎨 Tailwind CSS framework active');
console.log('✨ GSAP animations initialized');
console.log('📱 WhatsApp integration ready');