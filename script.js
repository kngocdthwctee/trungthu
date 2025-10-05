// ========================================
// TẠO NGÔI SAO NGẪU NHIÊN
// ========================================
function createStars() {
    const starsContainer = document.getElementById('starsContainer');
    const numberOfStars = 60;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        const size = Math.random() * 20 + 10;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        starsContainer.appendChild(star);
    }
}

// ========================================
// TẠO MÂY BAY
// ========================================
function createClouds() {
    const cloudsContainer = document.getElementById('cloudsContainer');
    const cloudImages = ['imgs/cloud1.png', 'imgs/cloud2.png', 'imgs/cloud3.png'];
    const numberOfClouds = 6;

    for (let i = 0; i < numberOfClouds; i++) {
        const cloud = document.createElement('img');
        cloud.className = 'cloud';
        cloud.src = cloudImages[Math.floor(Math.random() * cloudImages.length)];
        cloud.alt = 'Cloud';
        
        // Random vị trí Y
        const topPosition = Math.random() * 70;
        cloud.style.top = topPosition + '%';
        
        // Random vị trí X ban đầu từ -20% đến 100%
        const startX = Math.random() * 120 - 20;
        cloud.style.left = startX + '%';
        
        cloud.style.width = (Math.random() * 150 + 200) + 'px';
        
        // Tạo animation riêng cho mỗi đám mây
        const duration = Math.random() * 20 + 30; // 30-50s
        const animationName = `floatCloud${i}`;
        
        // Tạo keyframe động cho từng đám mây
        const keyframes = `
            @keyframes ${animationName} {
                from { left: ${startX}%; }
                to { left: 110%; }
            }
        `;
        
        // Thêm keyframe vào stylesheet
        const styleSheet = document.styleSheets[0];
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
        
        // Apply animation
        cloud.style.animation = `${animationName} ${duration}s linear infinite`;
        
        cloudsContainer.appendChild(cloud);
    }
}

// ========================================
// TẠO LỒNG ĐÈN BAY LÊN LIÊN TỤC
// ========================================
function createFloatingLantern() {
    const lanternsContainer = document.getElementById('floatingLanterns');
    
    // Các hình ảnh lồng đèn
    const lanternImages = [
        'imgs/lantern1.png',
        'imgs/lantern2.png',
        'imgs/lantern3.png',
        'imgs/lantern4.png'
    ];
    
    const lantern = document.createElement('img');
    lantern.className = 'floating-lantern';
    lantern.src = lanternImages[Math.floor(Math.random() * lanternImages.length)];
    lantern.alt = 'Lồng đèn';
    
    // Vị trí bắt đầu ngẫu nhiên ở dưới màn hình
    const startX = Math.random() * 100;
    lantern.style.left = startX + '%';
    lantern.style.bottom = '-150px';
    
    // Kích thước ngẫu nhiên
    const size = Math.random() * 80 + 100; // 100-180px
    lantern.style.width = size + 'px';
    lantern.style.height = 'auto';
    
    // Thời gian bay lên ngẫu nhiên
    const duration = Math.random() * 15 + 20; // 20-35 giây
    lantern.style.animationDuration = duration + 's';
    
    // Độ lệch ngang khi bay lên
    const drift = (Math.random() - 0.5) * 200; // -100 đến 100px
    lantern.style.setProperty('--drift', drift + 'px');
    
    // Độ xoay ngẫu nhiên
    const rotation = (Math.random() - 0.5) * 60; // -30 đến 30 độ
    lantern.style.setProperty('--rotation', rotation + 'deg');
    
    lantern.style.animation = `floatUp ${duration}s linear`;
    
    // Click effect
    lantern.addEventListener('click', function(e) {
        e.stopPropagation();
        createSparkles(this);
    });
    
    lanternsContainer.appendChild(lantern);
    
    // Xóa lồng đèn sau khi bay xong
    setTimeout(() => {
        lantern.remove();
    }, duration * 1000);
}

// ========================================
// LIÊN TỤC TẠO LỒNG ĐÈN MỚI
// ========================================
function startLanternGeneration() {
    // Tạo lồng đèn ban đầu
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFloatingLantern();
        }, i * 2000); // Mỗi 2 giây tạo 1 lồng đèn
    }
    
    // Liên tục tạo lồng đèn mới
    setInterval(() => {
        createFloatingLantern();
    }, 3000); // Mỗi 3 giây tạo 1 lồng đèn mới
}

// ========================================
// HIỆU ỨNG SPARKLE KHI CLICK
// ========================================
function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = centerX + 'px';
        sparkle.style.top = centerY + 'px';
        sparkle.style.width = '12px';
        sparkle.style.height = '12px';
        sparkle.style.background = '#ffd700';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.boxShadow = '0 0 15px #ffd700';
        
        document.body.appendChild(sparkle);
        
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 120;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        animateSparkle(sparkle, vx, vy);
    }
}

function animateSparkle(element, vx, vy) {
    let x = 0;
    let y = 0;
    let opacity = 1;
    
    const animate = () => {
        x += vx * 0.02;
        y += vy * 0.02;
        opacity -= 0.025;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
        element.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            element.remove();
        }
    };
    
    animate();
}

// ========================================
// HIỆU ỨNG CHO MẶT TRĂNG
// ========================================
function setupMoonEffects() {
    const moon = document.querySelector('.moon');
    
    if (moon) {
        moon.addEventListener('click', function() {
            this.style.filter = 'drop-shadow(0 0 100px rgba(255, 215, 0, 1))';
            
            setTimeout(() => {
                this.style.filter = 'drop-shadow(0 0 50px rgba(255, 215, 0, 0.9))';
            }, 500);
            
            createMoonParticles(this);
        });
    }
}

function createMoonParticles(moon) {
    const rect = moon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.background = '#ffeb3b';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.boxShadow = '0 0 15px #ffd700';
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 180 + 80;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        animateParticle(particle, vx, vy);
    }
}

function animateParticle(particle, vx, vy) {
    let x = 0;
    let y = 0;
    let opacity = 1;
    let gravity = 2;
    
    const animate = () => {
        x += vx * 0.015;
        y += vy * 0.015;
        vy += gravity;
        opacity -= 0.015;
        
        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };
    
    animate();
}

// ========================================
// HIỆU ỨNG CHO THỎ
// ========================================
function setupRabbitEffects() {
    const rabbit = document.querySelector('.rabbit');
    
    if (rabbit) {
        rabbit.addEventListener('click', function() {
            createHearts(this);
        });
    }
}

function createHearts(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💗';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            animateHeart(heart, i);
        }, i * 100);
    }
}

function animateHeart(heart, index) {
    let y = 0;
    let x = (index - 3) * 35;
    let opacity = 1;
    
    const animate = () => {
        y -= 2.5;
        opacity -= 0.02;
        
        heart.style.transform = `translate(${x}px, ${y}px)`;
        heart.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            heart.remove();
        }
    };
    
    animate();
}

// ========================================
// HIỆU ỨNG CHO BÁNH TRUNG THU
// ========================================
function setupMooncakeEffects() {
    const mooncakes = document.querySelectorAll('.mooncake-item');
    
    mooncakes.forEach((mooncake, index) => {
        mooncake.addEventListener('mouseenter', function() {
            const img = this.querySelector('.mooncake-img');
            if (img) {
                img.style.transform = 'rotate(360deg) scale(1.2)';
                img.style.filter = 'drop-shadow(0 10px 30px rgba(255, 215, 0, 0.6))';
            }
        });
        
        mooncake.addEventListener('mouseleave', function() {
            const img = this.querySelector('.mooncake-img');
            if (img) {
                img.style.transform = 'rotate(0deg) scale(1)';
                img.style.filter = 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))';
            }
        });
        
        mooncake.addEventListener('click', function() {
            createConfetti(this);
        });
    });
}

// ========================================
// TẠO CONFETTI KHI CLICK BÁNH
// ========================================
function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
    
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = centerX + 'px';
        confetti.style.top = centerY + 'px';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const angle = (Math.PI * 2 * i) / 15;
        const velocity = Math.random() * 100 + 80;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        animateConfetti(confetti, vx, vy);
    }
}

function animateConfetti(confetti, vx, vy) {
    let x = 0;
    let y = 0;
    let opacity = 1;
    let gravity = 2.5;
    
    const animate = () => {
        x += vx * 0.02;
        y += vy * 0.02;
        vy += gravity;
        opacity -= 0.02;
        
        confetti.style.transform = `translate(${x}px, ${y}px)`;
        confetti.style.opacity = opacity;
        
        if (opacity > 0 && y < 300) {
            requestAnimationFrame(animate);
        } else {
            confetti.remove();
        }
    };
    
    animate();
}

// ========================================
// HIỆU ỨNG CHO WISH CARDS
// ========================================
function setupWishCardEffects() {
    const wishCards = document.querySelectorAll('.wish-card');
    
    wishCards.forEach((card) => {
        card.addEventListener('click', function() {
            // Tạo ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255, 215, 0, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.top = '50%';
            ripple.style.left = '50%';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Tạo stars
            createWishStars(this);
        });
    });
}

function createWishStars(card) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.textContent = '⭐';
        star.style.position = 'fixed';
        star.style.left = centerX + 'px';
        star.style.top = centerY + 'px';
        star.style.fontSize = '20px';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '9999';
        
        document.body.appendChild(star);
        
        const angle = (Math.PI * 2 * i) / 5;
        const distance = 100;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        
        animateWishStar(star, targetX, targetY);
    }
}

function animateWishStar(star, targetX, targetY) {
    let progress = 0;
    let opacity = 1;
    
    const animate = () => {
        progress += 0.03;
        opacity -= 0.02;
        
        const currentX = targetX * progress;
        const currentY = targetY * progress;
        
        star.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${progress * 360}deg)`;
        star.style.opacity = opacity;
        
        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            star.remove();
        }
    };
    
    animate();
}

// ========================================
// THÊM CSS ANIMATION CHO RIPPLE
// ========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -50%) scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// PARALLAX EFFECT KHI SCROLL
// ========================================
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Parallax cho mặt trăng
        const moon = document.querySelector('.moon');
        if (moon) {
            moon.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Parallax cho thỏ
        const rabbit = document.querySelector('.rabbit');
        if (rabbit) {
            rabbit.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    });
}

// ========================================
// KHỞI TẠO TẤT CẢ HIỆU ỨNG
// ========================================
function init() {
    createStars();
    createClouds();
    startLanternGeneration();
    setupMoonEffects();
    setupRabbitEffects();
    setupMooncakeEffects();
    setupWishCardEffects();
    setupParallax();
    
    console.log('🌕 Trang web Trung Thu đã sẵn sàng! 🏮');
}

// ========================================
// CHẠY KHI TRANG WEB LOAD XONG
// ========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}