export function saveHabits(habits) {
    localStorage.setItem("habits", JSON.stringify(habits));
}

export function loadHabits() {
    return JSON.parse(localStorage.getItem("habits"));
}