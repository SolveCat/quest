// Stałe i zmienne globalne
let currentStep = 1;
const totalSteps = 6;
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzSYei1DVy4yRctavPGt53Smi34qpM4JQwvTCPRQl6N-StItCvyRwA_fW5z5LWZI34FdQ/exec';

// Obsługa radio buttons
document.querySelectorAll('.radio-label').forEach(label => {
    label.addEventListener('click', function() {
        const radioGroup = this.closest('.radio-group');
        radioGroup.querySelectorAll('.radio-label').forEach(l => l.classList.remove('selected'));
        this.classList.add('selected');
        
        if (this.querySelector('input[name="brakuje"]')) {
            const textarea = document.getElementById('brakujeComment');
            textarea.style.display = this.querySelector('input').value === 'tak' ? 'block' : 'none';
        }
    });
});

// Funkcje pomocnicze
function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.style.display = currentStep === 1 ? 'none' : 'block';
    nextBtn.textContent = currentStep === totalSteps ? 'Zakończ' : 'Dalej';
}

function updateProgress() {
    const progress = ((currentStep - 1) / totalSteps)ps) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function validateStep(step) {
    switch(step) {
        case 1:
            return document.getElementById('badgeId').value.trim() !== '';
        case 2:
            return document.getElementById('cowNumber').value.trim() !== '';
        case 3:
            const brakujeChecked = document.querySelector('input[name="brakuje"]:checked');
            if (!brakujeChecked) return false;
            if (brakujeChecked.value === 'tak') {
                return document.getElementById('brakujeComment').value.trim() !== '';
            }
            return true;
        case 4:
            return document.querySelector('input[name="laptop"]:checked');
        case 5:
            return document.querySelector('input[name="skaner"]:checked');
        case 6:
            return document.querySelector('input[name="ladowarka"]:checked');
        default:
            return true;
    }
}

function showStep(step) {) {
    document.querySelectorAll('.question-container').forEach(q => {
        q.classList.remove('active');
    });
    document.getElementById(`question${step}`).classList.add('active');
    updateButtons();
    updateProgress();
}

// Funkcje nawigacji
function nextStep() {
    if (!validateStep(currentStep)) {
        alert('Proszę wypełnić wszystkie wymagane pola.');
        return;
    }

    if (currentStep === totalSteps) {
        submitForm();
        return;
    }

    currentStep++;
    showStep(currentStep);
}

function previousStep() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
}

// Obsługa formularza
async function submitForm() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'flex';

    const formData = {
        badgeId: document.getElementById('badgeId').value,
        cowNumber: document.getElementById('cowNumber').value,
        brakuje: document.querySelector('input[name="brakuje"]:checked').value,
        brakujeComment: document.querySelector('input[name="brakuje"]:checked').value === 'tak' 
            ? document.getElementById('brakujeComment').value 
            : 'N/D',
        laptop: document.querySelector('input[name="laptop"]:checked').value,
        skaner: document.querySelector('input[name="skaner"]:checked').value,
        ladowarka: document.querySelector('input[name="ladowarka"]:checked').value
    };

    try {
        // Minimalne opóźnienie dla lepszego UX
        await new Promise(resolve => setTimeout(resolve, 1500));

        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        loadingOverlay.style.display = 'none';
        alert('Formularz został wysłany pomyślnie!');
        window.location.reload();
    } catch (error) {
        console.error('Błąd:', error);
        loadingOverlay.style.display = 'none';
        alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie.');
    }
}

// Obsługa klawisza Enter
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        nextStep();
    }
});

// Autofocus na pierwszym polu przy załadowaniu
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('badgeId').focus();
});

// Inicjalizacja
updateButtons();
updateProgress();
