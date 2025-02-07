const list = document.getElementById("list");
const addBtn = document.getElementById("add");
const titleInput = document.getElementById("title");

let notes = []

function render() {
    list.innerHTML = ''
    if (notes.length > 1) {
        notes = sortNotes()
    }

    for (let i = 0; i < notes.length; i++) {
        list.insertAdjacentHTML(
            'beforeend',
            getNoteTemplate(notes[i], i)
        )
    }
}

function sortNotes() {
    let completedNotes = []
    let uncompletedNotes = []
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].completed) {
            completedNotes.push(notes[i])
        }
        else uncompletedNotes.push(notes[i])
    }
    uncompletedNotes = uncompletedNotes.concat(completedNotes)
    return uncompletedNotes
}

addBtn.onclick = function() {
    if (titleInput.value.length === 0) return;
    const newNote = {
        title: titleInput.value,
        completed : false
    }
    titleInput.value = ''
    notes.push(newNote)
    render()
}

function getNoteTemplate(note, index) {
    return (
        `
        <div class="note-container content-container">
            <span class="${note.completed ? 'text-decoration-line-through note-completed' : ''}">${note.title}</span>
            <div class="buttons-container">
                <button class="confirm-button ${note.completed ? 'unconfirm-button' : ''}" id="confirm" data-index="${index}" data-type="toggle">✓</button>
                <button class="deny-button" id="deny" data-index="${index}" data-type="delete">X</button>
            </div>
        </div>
        `
    )
}

list.onclick = function(event) {
    if (event.target.dataset.index) {
        const index = Number(event.target.dataset.index)
        const type = event.target.dataset.type

        if (type === "toggle") {
            notes[index].completed = !notes[index].completed
        }
        else if (type === "delete") {
            notes.splice(index, 1)
        }
        render()
    }
}