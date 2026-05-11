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



//local storage
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoButton = document.getElementById('addTodoButton');
    const todoList = document.getElementById('todoList');
    function loadTodos() {
        const savedTodos = JSON.parse(localStorage.getItem('myCvTodos')) || [];
        todoList.innerHTML = '';
        savedTodos.forEach((text, index) => {
            renderTodo(text, index);
        });
    }
    function renderTodo(text, index) {
        const li = document.createElement('li');
        li.style.marginBottom = "5px";
        li.innerHTML = `
            <span>${text}</span>
            <button onclick="deleteTodo(${index})" style="margin-left: 10px; color: red; cursor: pointer;">Usuń</button>
        `;
        todoList.appendChild(li);
    }
    addTodoButton.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
            const savedTodos = JSON.parse(localStorage.getItem('myCvTodos')) || [];
            savedTodos.push(text);
            localStorage.setItem('myCvTodos', JSON.stringify(savedTodos));
            todoInput.value = '';
            loadTodos();
        }
    });
    window.deleteTodo = (index) => {
        const savedTodos = JSON.parse(localStorage.getItem('myCvTodos')) || [];
        savedTodos.splice(index, 1);
        localStorage.setItem('myCvTodos', JSON.stringify(savedTodos));
        loadTodos();
    };
    loadTodos();
});

//ZAD8
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        const formData = {
            name: document.getElementById('senderName').value,
            email: document.getElementById('senderEmail').value,
            message: document.getElementById('message').value
        };
        formStatus.style.color = 'blue';
        formStatus.textContent = 'Wysyłanie...';
        formStatus.style.display = 'block';
        fetch('https://bohdan12345.pythonanywhere.com/api/messages', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(formData)
            })
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd sieci');
            }
            return response.json();
        })
        .then(data => {
            console.log('Odpowiedź z serwera (dane zapisane):', data);
            formStatus.style.color = 'green';
            formStatus.textContent = 'Wiadomość została wysłana pomyślnie!';
            contactForm.reset(); 
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 4000);
        })
        .catch(error => {
            console.error('Błąd:', error);
            formStatus.style.color = 'red';
            formStatus.textContent = 'Wystąpił błąd podczas wysyłania wiadomości.';
        });
    });
}