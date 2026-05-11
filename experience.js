document.addEventListener('DOMContentLoaded', () => {
    // Trigger the strikethrough and replacement animation after a short delay
    setTimeout(() => {
        document.querySelector('.exp-hero').classList.add('animate');
    }, 500);

    // Live Counter Logic
    const counterElement = document.getElementById('live-return-counter');
    if (counterElement) {
        const ratePerSecond = 776;
        const ratePerMs = ratePerSecond / 1000;
        const startTime = Date.now();

        function updateCounter() {
            const now = Date.now();
            const elapsedMs = now - startTime;
            const count = Math.floor(elapsedMs * ratePerMs);
            counterElement.textContent = count.toLocaleString();
            requestAnimationFrame(updateCounter);
        }
        requestAnimationFrame(updateCounter);
    }

    // Modal Logic
    const startBtn = document.getElementById('start-quiz-btn');
    const modal = document.getElementById('quiz-modal');
    const closeBtn = document.getElementById('close-modal');
    const submitBtn = document.getElementById('submit-quiz-btn');
    
    const quizView = document.getElementById('quiz-view');
    const successView = document.getElementById('success-view');

    if (startBtn && modal) {
        startBtn.addEventListener('click', () => {
            modal.classList.add('active');
            quizView.style.display = 'block';
            successView.style.display = 'none';
            // Scroll to top of modal if previously scrolled
            document.querySelector('.modal-content').scrollTop = 0;
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Validation logic
        const submitTooltip = document.getElementById('submit-tooltip');

        function checkFormValidity() {
            const comfort = document.querySelector('input[name="comfort"]:checked');
            const apparel = document.querySelector('input[name="apparel"]:checked');
            const frequency = document.querySelector('input[name="frequency"]:checked');
            
            if (comfort && apparel && frequency) {
                submitBtn.classList.remove('btn-disabled');
                return true;
            } else {
                submitBtn.classList.add('btn-disabled');
                return false;
            }
        }

        const allRadios = document.querySelectorAll('input[type="radio"]');
        allRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                checkFormValidity();
                submitTooltip.classList.remove('show');
            });
        });

        submitBtn.addEventListener('click', () => {
            if (!checkFormValidity()) {
                submitTooltip.classList.add('show');
                setTimeout(() => submitTooltip.classList.remove('show'), 3000);
                return;
            }

            // Show success state
            quizView.style.display = 'none';
            successView.style.display = 'block';

            // Reset inputs for next potential open
            setTimeout(() => {
                document.querySelectorAll('input[type="radio"]').forEach(r => r.checked = false);
                const stayInLoop = document.getElementById('stay-in-loop');
                if (stayInLoop) stayInLoop.checked = false;
                checkFormValidity(); // Re-disable button for next time
            }, 1000);
        });
    }
});
