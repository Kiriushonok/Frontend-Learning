const filter = document.getElementById("input");
const list = document.getElementById("people");
let people = [];

async function getData(path) {
    const response = await fetch(path);
    return data = await response.json();
}

async function start() {
    list.innerHTML = `<span style="color:white">Загрузка</span>`;
    try {
        people = await getData("https://jsonplaceholder.typicode.com/users/");
        render(people);
        filter.removeAttribute("disabled");
        filter.focus();
    } catch (error) {
        list.innerHTML = `<span style="color:red">${error.message}</span>`;
    }
}

function render(tempPeople = []) {
    if (tempPeople.length > 0) {
        const html = tempPeople.map(simpleHtml).join("");
        list.innerHTML = html;
    } else
        list.innerHTML = `<span style="color:white">Нет подходящих элементов</span>`;
}

function simpleHtml(user) {
    return `
        <div class="human-container">
            <div class="name-container">
                <span class="human-name">${user.name}</span>
                <span class="more-button" data-index=${user.id}>⏵</span>
            </div>
        </div>
    `
}

function detailedHtml(user) {
    return `
        <div class="human-container">
            <div class="name-container">
                <span class="human-name">${user.name}</span>
                <span class="hide-button" data-index=${user.id}>⏴</span>
            </div>
            <div class="details-container">
                <span class="detail-label">Почта:</span> <span class="detail-value">${user.email}</span>
                <span class="detail-label">Город:</span> <span class="detail-value">${user.address.city}</span>
                <span class="detail-label">Номер:</span> <span class="detail-value">${user.phone}</span>
            </div>
        </div>
    `
}

input.addEventListener("input", (event) => {
    let value = event.target.value.toLowerCase();
    const filteredPeople = people.filter((human) =>
        human.name.toLowerCase().includes(value)
    );
    render(filteredPeople);
});

list.onclick = function (event) {
    const index = event.target.dataset.index;
    if (!index) return;
    const oldElement = document.querySelector(`[data-index="${index}"]`).closest('.human-container');
    if (oldElement) {
        oldElement.outerHTML = event.target.className === "more-button" ? detailedHtml(people[index-1]) : simpleHtml(people[index-1])
    }
}

start();