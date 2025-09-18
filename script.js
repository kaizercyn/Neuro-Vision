// Cursor following effect for the eye
const eye = document.getElementById('digitalEye');
const iris = document.getElementById('eyeIris');
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    // Cursor glow position
    cursorGlow.style.left = e.clientX - 10 + 'px';
    cursorGlow.style.top = e.clientY - 10 + 'px';
    
    // Eye tracking effect
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;
    
    const deltaX = e.clientX - eyeCenterX;
    const deltaY = e.clientY - eyeCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Movement range
    const maxMovement = 15;
    const moveX = (deltaX / distance) * Math.min(distance / 10, maxMovement);
    const moveY = (deltaY / distance) * Math.min(distance / 10, maxMovement);
    
    if (distance > 0) {
        iris.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    }
});

// Eye glow on hover
eye.addEventListener('mouseenter', () => {
    eye.style.transform = 'scale(1.1)';
    iris.style.boxShadow = '0 0 50px rgba(0, 229, 255, 1)';
});

eye.addEventListener('mouseleave', () => {
    eye.style.transform = 'scale(1)';
    iris.style.boxShadow = '0 0 30px rgba(0, 229, 255, 0.8)';
    iris.style.transform = 'translate(-50%, -50%)';
});

// Blink effect
setInterval(() => {
    const eyeOuter = document.querySelector('.eye-outer');
    eyeOuter.style.animation = 'none';
    eyeOuter.style.transform = 'scaleY(0.1)';
    
    setTimeout(() => {
        eyeOuter.style.transform = 'scaleY(1)';
        setTimeout(() => {
            eyeOuter.style.animation = 'eyePulse 3s ease-in-out infinite';
        }, 100);
    }, 150);
}, 8000);

// Dynamic constellation movement
const constellationBg = document.querySelector('.constellation-bg');
let angle = 0;

setInterval(() => {
    angle += 0.5;
    constellationBg.style.transform = `rotate(${angle}deg) scale(1.1)`;
}, 100);

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Navigation background after eye section
window.addEventListener('scroll', () => {
    const navMenu = document.getElementById('navMenu');
    const eyeSection = document.querySelector('.hero-section');
    const eyeBottom = eyeSection.offsetTop + eyeSection.offsetHeight;

    if (window.scrollY > eyeBottom - 80) { // add buffer so it feels smooth
        navMenu.classList.add('scrolled');
    } else {
        navMenu.classList.remove('scrolled');
    }
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'ANALYZING...';
    submitBtn.style.background = 'linear-gradient(135deg, #FF2E63 0%, #cc0044 100%)';
    
    setTimeout(() => {
        submitBtn.textContent = 'ANALYSIS COMPLETE';
        submitBtn.style.background = 'linear-gradient(135deg, #00FF7F 0%, #00cc5f 100%)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #00E5FF 0%, #0099cc 100%)';
            document.getElementById('contactForm').reset();
        }, 2000);
    }, 3000);
});

// Threat detector status changes
const threatStatuses = [
    { text: 'SYSTEM SECURE', color: '#00FF7F' },
    { text: 'SCANNING...', color: '#FFD700' },
    { text: 'THREAT DETECTED', color: '#FF2E63' },
    { text: 'NEUTRALIZED', color: '#00FF7F' }
];

let statusIndex = 0;

function updateThreatStatus() {
  const status = threatStatuses[statusIndex];
  const threatStatus = document.querySelector('.threat-status');
  const threatText = document.querySelector('.threat-detector span');

  // update dot + glow
  threatStatus.style.backgroundColor = status.color;
  threatStatus.style.boxShadow = `0 0 10px ${status.color}`;

  // update text
  threatText.textContent = status.text;

  // cycle to next
  statusIndex = (statusIndex + 1) % threatStatuses.length;
}

setInterval(updateThreatStatus, 3000); // updates every 3 seconds

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const finalValue = stat.textContent;
                stat.textContent = '0';
                
                if (finalValue.includes('%')) {
                    animateCounter(stat, 0, parseFloat(finalValue), 2000, '%');
                } else if (finalValue.includes('s')) {
                    animateCounter(stat, 0, parseFloat(finalValue), 2000, 's');
                } else if (finalValue.includes('M+')) {
                    animateCounter(stat, 0, 1, 2000, 'M+');
                } else if (finalValue.includes('/')) {
                    stat.textContent = finalValue;
                }
            });
        }
    });
}, observerOptions);

// Animate counter function
function animateCounter(element, start, end, duration, suffix = '') {
    const startTime = performance.now();
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = start + (end - start) * easeOutQuart(progress);
        element.textContent = value.toFixed(1) + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    requestAnimationFrame(animate);
}

// Easing function
function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// Observe the about section
const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
    statObserver.observe(aboutSection);
}

// Service cards hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for constellation background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.constellation-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${angle}deg) scale(1.1)`;
    });
});

// Dynamic typing effect for tagline
const taglineElements = document.querySelectorAll('.tagline span');

function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i > text.length - 1) {
            clearInterval(timer);
        }
    }, speed);
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        taglineElements.forEach((element, index) => {
            const text = element.textContent;
            setTimeout(() => {
                typeWriter(element, text, 50);
            }, index * 1000);
        });
    }, 1000);
});

// AI Security Terms Popup System
const securityTerms = [
    "ZERO-DAY DETECTION",
    "BEHAVIORAL ANALYSIS", 
    "ENDPOINT PROTECTION",
    "THREAT INTELLIGENCE",
    "MACHINE LEARNING",
    "ANOMALY DETECTION",
    "SANDBOXING",
    "DEEP PACKET INSPECTION",
    "NEURAL NETWORKS",
    "RANSOMWARE SHIELD",
    "ADVANCED PERSISTENT THREAT",
    "INTRUSION PREVENTION", 
    "CLOUD SECURITY",
    "PREDICTIVE ANALYTICS",
    "CYBER THREAT HUNTING",
    "VULNERABILITY ASSESSMENT",
    "SECURITY ORCHESTRATION",
    "INCIDENT RESPONSE",
    "DIGITAL FORENSICS",
    "FIREWALL EVOLUTION"
];

function createSecurityPopup(text, x, y) {
    const popup = document.createElement('div');
    popup.textContent = text;
    popup.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        color: #00E5FF;
        font-family: 'Orbitron', monospace;
        font-size: 11px;
        font-weight: 600;
        background: rgba(0, 229, 255, 0.1);
        padding: 8px 12px;
        border-radius: 6px;
        border: 1px solid rgba(0, 229, 255, 0.3);
        backdrop-filter: blur(5px);
        z-index: 999;
        pointer-events: none;
        opacity: 0;
        transform: scale(0.8) translateY(10px);
        transition: all 0.4s ease;
        text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
        letter-spacing: 0.5px;
        white-space: nowrap;
        max-width: 200px;
    `;
    
    document.body.appendChild(popup);
    
    // Animate in
    requestAnimationFrame(() => {
        popup.style.opacity = '1';
        popup.style.transform = 'scale(1) translateY(0)';
    });
    
    // Remove after delay
    setTimeout(() => {
        popup.style.opacity = '0';
        popup.style.transform = 'scale(0.8) translateY(-10px)';
        setTimeout(() => {
            if (popup.parentNode) {
                document.body.removeChild(popup);
            }
        }, 400);
    }, 2800);
}

// Generate security terms around the eye
function generateSecurityTerm() {
    if (!eye) return;
    
    // Check if we're in the hero section
    const heroSection = document.querySelector('.hero-section');
    const heroRect = heroSection.getBoundingClientRect();
    
    // Only generate popups if hero section is visible
    if (heroRect.bottom < 0 || heroRect.top > window.innerHeight) {
        return;
    }
    
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;
    
    // Generate random position around the eye
    const angle = Math.random() * 2 * Math.PI;
    const distance = 180 + Math.random() * 120; // 180-300px from center
    const x = eyeCenterX + Math.cos(angle) * distance - 100; // offset for text width
    const y = eyeCenterY + Math.sin(angle) * distance - 15; // offset for text height
    
    // Make sure popup stays on screen and within hero section
    const screenX = Math.max(10, Math.min(window.innerWidth - 210, x));
    const screenY = Math.max(10, Math.min(window.innerHeight - 50, y));
    
    const randomTerm = securityTerms[Math.floor(Math.random() * securityTerms.length)];
    createSecurityPopup(randomTerm, screenX, screenY);
}

// Additional interactive effects
document.addEventListener('DOMContentLoaded', () => {
    // Add scan line effect to the eye
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00E5FF, transparent);
        opacity: 0.8;
        animation: scanMove 3s linear infinite;
        pointer-events: none;
    `;
    
    const scanAnimation = document.createElement('style');
    scanAnimation.textContent = `
        @keyframes scanMove {
            0% { transform: translateY(0) scaleX(1); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(300px) scaleX(0.3); opacity: 0; }
        }
    `;
    document.head.appendChild(scanAnimation);
    if (eye) eye.appendChild(scanLine);
    
    // Add data stream effect to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        const dataStream = document.createElement('div');
        dataStream.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(0, 229, 255, 0.03) 2px,
                rgba(0, 229, 255, 0.03) 4px
            );
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        card.style.position = 'relative';
        card.appendChild(dataStream);
        
        card.addEventListener('mouseenter', () => {
            dataStream.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            dataStream.style.opacity = '0';
        });
    });
    
    // Add matrix rain effect on logo click
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        logoText.addEventListener('mouseenter', () => {
            logoText.style.animation = 'glitch 0.5s ease-in-out';
        });
        
        logoText.addEventListener('animationend', () => {
            logoText.style.animation = '';
        });
        
        logoText.addEventListener('click', () => {
            createMatrixRain();
        });
    }
    
    // Start generating security terms after page loads
    setTimeout(() => {
        generateSecurityTerm();
        setInterval(generateSecurityTerm, 3500); // Every 3.5 seconds
    }, 3000);
    
    // Generate multiple terms on eye click
    if (eye) {
        eye.addEventListener('click', () => {
            generateSecurityTerm();
            setTimeout(() => generateSecurityTerm(), 300);
            setTimeout(() => generateSecurityTerm(), 600);
        });
    }
});

// Matrix rain effect function
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.textContent = Math.random() > 0.5 ? '1' : '0';
        drop.style.cssText = `
            position: absolute;
            color: #00E5FF;
            font-family: 'Orbitron', monospace;
            font-size: 14px;
            opacity: 0.7;
            animation: matrixFall ${2 + Math.random() * 3}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        matrixContainer.appendChild(drop);
    }
    
    const matrixStyle = document.createElement('style');
    matrixStyle.textContent = `
        @keyframes matrixFall {
            0% { transform: translateY(-100vh); opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(matrixStyle);
    document.body.appendChild(matrixContainer);
    
    setTimeout(() => {
        document.body.removeChild(matrixContainer);
        document.head.removeChild(matrixStyle);
    }, 5000);
}

// Add pulse effect to threat detector on status change
const threatDetector = document.querySelector('.threat-detector');
if (threatDetector) {
    const statusObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                threatDetector.style.animation = 'threatPulse 0.5s ease-in-out';
                setTimeout(() => {
                    threatDetector.style.animation = '';
                }, 500);
            }
        });
    });
    
    statusObserver.observe(threatDetector, { 
        childList: true, 
        subtree: true, 
        characterData: true 
    });
    
    // Add threat pulse animation
    const threatPulseStyle = document.createElement('style');
    threatPulseStyle.textContent = `
        @keyframes threatPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); box-shadow: 0 0 20px rgba(0, 229, 255, 0.5); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(threatPulseStyle);
}