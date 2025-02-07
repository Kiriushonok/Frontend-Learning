const save = document.getElementById("save");
const elem = document.querySelector(`.twink-text`);

let strings = ["Am", "Em", "G", "H7", "C"];

// Функция получения текста из contenteditable
function get_text(selector1) {
    let text_temp = document.querySelector(selector1);
    var el = text_temp;
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);

    if (window.getSelection()) {
        var select = window.getSelection();
        text_temp = select.toString();
    }
    
    return text_temp;
}

save.onclick = function () {
    let text_temp = get_text(".twink-text");

    // Экранируем HTML
    text_temp = escapeHTML(text_temp);

    // Разбиваем текст на строки и обрабатываем каждую
    let lines = text_temp.split(/\n/).map(line => {
        let trimmedLine = line.trim(); // Убираем пробелы по краям

        // Регулярное выражение для поиска аккордов
        let regex = new RegExp(`\\b(${strings.join('|')})\\b`, 'g');

        // Проверяем, состоит ли строка ТОЛЬКО из аккордов (разделённых пробелами)
        let chordPattern = new RegExp(`^(${strings.join('|')})(\\s+(${strings.join('|')}))*$`);
        
        if (chordPattern.test(trimmedLine)) {
            // Если строка содержит только аккорды → оборачиваем в line-chords
            line = line.replace(regex, `<span class="chord">$1</span>`);
            return `<span class="line-chords">${line}</span>`;
        } else {
            // Если строка смешанная → выделяем только аккорды
            line = line.replace(regex, `<span class="chord">$1</span>`);
            return `<span class="line">${line || '<br>'}</span>`;
        }
    });

    // Вставляем обработанный текст
    elem.innerHTML = lines.join('');
};

// Функция для экранирования HTML
function escapeHTML(text) {
    return text.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;")
               .replace(/"/g, "&quot;")
               .replace(/'/g, "&#039;");
}

// Обработчик нажатия Tab в contenteditable
elem.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
        document.execCommand("insertText", false, "    "); // Вставка 4 пробелов вместо табуляции
    }
});
