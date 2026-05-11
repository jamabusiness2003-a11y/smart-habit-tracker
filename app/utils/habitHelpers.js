import { daysDifference, parseLocalDate } from "./formatter.js";

export function removeHabit(habits, index) {
    habits.splice(index, 1);
}

export function toggleHabit(habits, index) {
    habits[index].completed = !habits[index].completed;  
}

export function resetHabitsDaily(habits, today, title) {
    const message = {
        recovery: "Missed a few days? No problem. Start small today."
    };

    habits.forEach(habit => {
        updateStreaks(habit, today, title, message);
        habit.completed = false;
    });     
}

export function updateCompletionDate(habit, today) {
    habit.lastCompletedDate = today;
}

export function updateStreaks(habit, today, title, message) {
    if (!habit.lastCompletedDate) {
        habit.streaks = 1;
    } else {
        const current_day = parseLocalDate(today);
        const last_day = parseLocalDate(habit.lastCompletedDate);

        const diffDays = daysDifference(current_day, last_day);

        if (diffDays === 1) {
            habit.streaks++;
        } else if (diffDays > 1) {
            title.textContent = message.recovery;
            habit.streaks = 1; 
        }
    }
}