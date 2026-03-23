export function removeHabit(habits, index) {
    habits.splice(index, 1);
}

export function toggleHabit(habits, index) {
    habits[index].completed = !habits[index].completed;
}