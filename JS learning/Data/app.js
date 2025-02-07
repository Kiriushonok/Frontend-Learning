const output = document.getElementById("output")
const date = document.getElementById("date")
const time = document.getElementById("time")
const full = document.getElementById("full")
let mode = "всё"
render()
setInterval(render, 1000)

function render() {
    let curDate = new Date()
    switch (mode) {
        case "дата":
            output.textContent = curDate.toLocaleDateString()
            break;
        case "время":
            output.textContent = curDate.toLocaleTimeString()
            break;
        case "всё":
            output.textContent = curDate.toLocaleDateString() + "  " +  curDate.toLocaleTimeString()
            break;
        default:
            output.textContent = "Ошибка"
            break;
    }
}

function bindMode(name) {
    mode = "name"
    render()
}

date.onclick = function () {
    bindMode("дата")
}

time.onclick = function () {
    bindMode("время")
}

full.onclick = function () {
    bindMode("всё")
}