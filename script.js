const container = document.querySelector('.container');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const lottieContainer = document.getElementById('lottie-container');
const delaySlider = document.getElementById('delay-slider');
const speedSlider = document.getElementById('speed-slider');
const delayValue = document.getElementById('delay-value');
const speedValue = document.getElementById('speed-value');

let lottieAnimation = null;

function initLottie() {
    if (!lottieAnimation && lottieContainer) {
        lottieAnimation = lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'lottie/fire-v4.json'
        });
        
        // Set initial speed
        if (lottieAnimation) {
            lottieAnimation.setSpeed(parseFloat(speedSlider.value));
        }
    }
}

function toggleModal() {
    const isOpening = !overlay.classList.contains('active');
    
    overlay.classList.toggle('active');
    modal.classList.toggle('active');
    
    if (isOpening) {
        // Initialize Lottie if not already initialized
        initLottie();
        
        // Play animation when modal opens with delay from slider
        if (lottieAnimation) {
            const delay = parseInt(delaySlider.value);
            setTimeout(() => {
                lottieAnimation.play();
            }, delay);
        }
    } else {
        // Reset animation when modal closes so it can play again next time
        if (lottieAnimation) {
            lottieAnimation.stop();
            lottieAnimation.goToAndStop(0, true);
        }
    }
}

// Update delay value display
delaySlider.addEventListener('input', (e) => {
    delayValue.textContent = e.target.value;
});

// Update speed value display and apply to animation
speedSlider.addEventListener('input', (e) => {
    const speed = parseFloat(e.target.value);
    speedValue.textContent = speed.toFixed(1);
    if (lottieAnimation) {
        lottieAnimation.setSpeed(speed);
    }
});

container.addEventListener('click', (e) => {
    // Only toggle if clicking directly on container (not on overlay/modal)
    if (!overlay.contains(e.target)) {
        toggleModal();
    }
});

// Close modal when clicking on overlay background
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        toggleModal();
    }
    e.stopPropagation();
});

// Prevent modal clicks from closing
modal.addEventListener('click', (e) => {
    e.stopPropagation();
});
