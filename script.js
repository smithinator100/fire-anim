const container = document.querySelector('.container');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const lottieContainer = document.getElementById('lottie-container');
const delaySlider = document.getElementById('delay-slider');
const speedSlider = document.getElementById('speed-slider');
const loopInput = document.getElementById('loop-input');
const delayValue = document.getElementById('delay-value');
const speedValue = document.getElementById('speed-value');

let lottieAnimation = null;
let loopCount = 0;
let currentLoop = 0;
let loopCompleteHandler = null;

function initLottie() {
    if (!lottieAnimation && lottieContainer) {
        const loopValue = parseInt(loopInput.value);
        loopCount = loopValue;
        currentLoop = 0;
        
        lottieAnimation = lottie.loadAnimation({
            container: lottieContainer,
            renderer: 'svg',
            loop: loopValue > 0,
            autoplay: false,
            path: 'lottie/fire-v4.json'
        });
        
        // Set initial speed
        if (lottieAnimation) {
            lottieAnimation.setSpeed(parseFloat(speedSlider.value));
            
            // Handle loop completion for specific loop count
            if (loopValue > 0) {
                loopCompleteHandler = () => {
                    currentLoop++;
                    if (currentLoop >= loopCount) {
                        lottieAnimation.loop = false;
                        if (loopCompleteHandler) {
                            lottieAnimation.removeEventListener('loopComplete', loopCompleteHandler);
                        }
                    }
                };
                lottieAnimation.addEventListener('loopComplete', loopCompleteHandler);
            }
        }
    }
}

function resetLottie() {
    if (lottieAnimation) {
        // Remove event listener if it exists
        if (loopCompleteHandler) {
            lottieAnimation.removeEventListener('loopComplete', loopCompleteHandler);
            loopCompleteHandler = null;
        }
        lottieAnimation.destroy();
        lottieAnimation = null;
        currentLoop = 0;
    }
}

function toggleModal() {
    const isOpening = !overlay.classList.contains('active');
    
    overlay.classList.toggle('active');
    modal.classList.toggle('active');
    
    if (isOpening) {
        // Reset and reinitialize Lottie to apply new loop settings
        resetLottie();
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

// Update loop setting - will apply on next modal open
loopInput.addEventListener('input', (e) => {
    const value = parseInt(e.target.value);
    if (value < 0) {
        e.target.value = 0;
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
