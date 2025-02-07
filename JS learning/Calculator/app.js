const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const result = document.getElementById("result");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const apply = document.getElementById("apply");
let sum = true;

function operations(inp1, inp2, sumFlag) {
    if (sumFlag)
        result.textContent = Number(inp1.value) + Number(inp2.value);
    else
        result.textContent = Number(inp1.value) - Number(inp2.value);
}

function minusClick() {
    sum = false;
    minus.classList.add('active-button')
    plus.classList.remove('active-button')
}

function plusClick() {
    sum = true;
    plus.classList.add('active-button')
    minus.classList.remove('active-button')
}

plus.onclick = function() {
    plusClick();
}

minus.onclick = function() {
    minusClick();
}

apply.onclick = function() {
    operations(input1, input2, sum)
}