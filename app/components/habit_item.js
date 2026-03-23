export function createHabit(habit) {
    const li = document.createElement("li");

    li.textContent = habit;
    return li;
}

export function removeHabit(habits, index) {
    habits.splice(index, 1);
}

export function createBtnContainer(onClick) {
    const btnContainer = document.createElement("div");
    
    btnContainer.addEventListener("click", onClick);
    return btnContainer;
}

export function createButton(label, cssClass) {
    const btn = document.createElement("button");

    btn.textContent = label;
    btn.classList.add(cssClass);

    return btn;
}