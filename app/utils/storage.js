const KEY = "habits";

export function saveHabits(habits) {
    localStorage.setItem(KEY, JSON.stringify(habits));
}

export function loadHabits() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}