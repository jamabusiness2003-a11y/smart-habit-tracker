import { daysDifference, parseLocalDate } from "./formatter.js";

export function isStreakActive(habit, today) {
    const current_day = parseLocalDate(today);
    const last_day = parseLocalDate(habit.lastCompletedDate);

    if (isNaN(current_day) || isNaN(last_day)) return false;

    const diffDays = daysDifference(current_day, last_day);

    return habit.streaks > 0 && diffDays <= 1;
}