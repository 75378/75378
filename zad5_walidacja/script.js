document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    document.querySelectorAll('.error-message').forEach(function(el) {
        el.style.display = 'none';
        el.textContent = '';
    });
    const resultMessage = document.getElementById('result-message');
    resultMessage.textContent = '';
    resultMessage.className = '';
    let hasErrors = false;
    const imie = document.getElementById('imie').value.trim();
    const nazwisko = document.getElementById('nazwisko').value.trim();
    const email = document.getElementById('email').value.trim();
    const wiadomosc = document.getElementById('wiadomosc').value.trim();
    const digitRegex = /\d/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!imie) {
        showError('error-imie', 'To pole jest wymagane.');
        hasErrors = true;
    } else if (digitRegex.test(imie)) {
        showError('error-imie', 'Imię nie może zawierać cyfr.');
        hasErrors = true;
    }
    if (!nazwisko) {
        showError('error-nazwisko', 'To pole jest wymagane.');
        hasErrors = true;
    } else if (digitRegex.test(nazwisko)) {
        showError('error-nazwisko', 'Nazwisko nie może zawierać cyfr.');
        hasErrors = true;
    }
    if (!email) {
        showError('error-email', 'To pole jest wymagane.');
        hasErrors = true;
    } else if (!emailRegex.test(email)) {
        showError('error-email', 'Podaj poprawny adres e-mail (np. test@domena.pl).');
        hasErrors = true;
    }
    if (!wiadomosc) {
        showError('error-wiadomosc', 'To pole jest wymagane.');
        hasErrors = true;
    }
    if (!hasErrors) {
        resultMessage.textContent = 'Sukces walidacji';
        resultMessage.className = 'success-message';
    }
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
});
