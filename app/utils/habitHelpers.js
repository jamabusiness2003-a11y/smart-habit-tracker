export function removeHabit(habits, index) {
    habits.splice(index, 1);
}

export function toggleHabit(habits, index) {
    habits[index].completed = !habits[index].completed;  
}

export function resetCompletedHabit(element, habit) {
    const today = new Date().toLocaleDateString();

    if (habit.lastCompletedDate !== today) {
        habit.completed = false;
        habit.lastCompletedDate = "";
        element.classList.remove("completed");
    }   
}