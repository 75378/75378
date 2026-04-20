const themeButton = document.getElementById('themeButton');
const themeLink = document.querySelector('link[rel="stylesheet"]');
themeButton.addEventListener('click', () => {
    if (themeLink.getAttribute('href') === 'green.css') {
        themeLink.setAttribute('href', 'red.css');
    } else {
        themeLink.setAttribute('href', 'green.css');
    }
});
const toggleSkillsButton = document.getElementById('toggleSkillsButton');
const Kontakt = document.getElementById('Kontakt');

toggleSkillsButton.addEventListener('click', () => {
    if (Kontakt.style.display === 'none') {
        Kontakt.style.display = 'block';
    } else {
        Kontakt.style.display = 'none';
    }
});
