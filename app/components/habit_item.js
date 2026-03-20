export function createHabit(element, habit) {
    const li = document.createElement("li");

    li.textContent = habit;
    element.appendChild(li);
}