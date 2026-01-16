const container = document.querySelector('.container');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const lottieContainer = document.getElementById('lottie-container');

let lottieAnimation = null;

function initLottie() {
    if (!lottieAnimation && lottieContainer) {
        lottieAnimation = lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: 'lottie/fire-v2.json'
        });
    }
}

function toggleModal() {
    const isOpening = !overlay.classList.contains('active');
    
    overlay.classList.toggle('active');
    modal.classList.toggle('active');
    
    if (isOpening) {
        // Initialize Lottie if not already initialized
        initLottie();
        
        // Play animation when modal opens with 100ms delay
        if (lottieAnimation) {
            setTimeout(() => {
                lottieAnimation.play();
            }, 220);
        }
    } else {
        // Reset animation when modal closes so it can play again next time
        if (lottieAnimation) {
            lottieAnimation.stop();
            lottieAnimation.goToAndStop(0, true);
        }
    }
}

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
