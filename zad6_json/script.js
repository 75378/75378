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

document.addEventListener("DOMContentLoaded", () => {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd ładowania pliku JSON');
            }
            return response.json();
        })
        .then(data => {
            const skillsList = document.getElementById('skills-list');
            data.skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsList.appendChild(li);
            });

            const projectsList = document.getElementById('projects-list');
            data.projects.forEach(project => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${project.title}:</strong> ${project.description}`;
                projectsList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Wystąpił problem z operacją fetch:', error);
        });
});