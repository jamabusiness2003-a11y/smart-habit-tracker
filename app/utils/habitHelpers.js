import { daysDifference, parseLocalDate } from "./formatter.js";

export function removeHabit(habits, index) {
    habits.splice(index, 1);
}

export function toggleHabit(habits, index) {
    habits[index].completed = !habits[index].completed;  
}

export function resetHabitsDaily(habits, today) {
    habits.forEach(habit => {
        updateStreaks(habit, today);
        habit.completed = false;
    });     
}

export function updateCompletionDate(habit, today) {
    habit.lastCompletedDate = today;
}

export function updateStreaks(habit, today) {
    if (!habit.lastCompletedDate) {
        habit.streaks = 1;
    } else {
        const current_day = parseLocalDate(today);
        const last_day = parseLocalDate(habit.lastCompletedDate);

        const diffDays = daysDifference(current_day, last_day);

        if (diffDays === 1) {
            habit.streaks++;
        } else if (diffDays > 1) {
            habit.streaks = 1; 
        }
    }
}