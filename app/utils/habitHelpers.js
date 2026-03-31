export function removeHabit(habits, index) {
    habits.splice(index, 1);
}

export function toggleHabit(habits, index) {
    habits[index].completed = !habits[index].completed;  
}

export function resetHabitsDaily(habits, today) {
    habits.forEach(habit => {
        if (habit.completed && habit.lastCompletedDate !== today) {
            habit.completed = false;
            habit.lastCompletedDate = "";
        } 
    });     
}

export function updateCompletionDate(habit, formatter) {
    if (habit.completed && !habit.lastCompletedDate) {
        habit.lastCompletedDate = formatter(Date.now());
    }
}