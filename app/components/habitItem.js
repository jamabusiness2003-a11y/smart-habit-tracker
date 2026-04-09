export function createHabit(habit) {
    const li = document.createElement("li");

    li.textContent = habit;
    return li;
}

export function createBtnContainer() {
    const btnContainer = document.createElement("div");
    return btnContainer;
}

export function createButton(label, className) {
    const btn = document.createElement("button");

    btn.textContent = label;
    btn.classList.add(className);

    return btn;
}