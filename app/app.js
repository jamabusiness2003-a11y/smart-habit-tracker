import { createHabit } from "./components/habit_item.js";

const habitInput = document.getElementById("habitInput");
const addBtn = document.getElementById("addBtn");
const habitList = document.getElementById("habitList");

let habits = [];

addBtn.addEventListener("click", addHabit);

function addHabit() {
    const habitText = habitInput.value.trim();

    if (!habitText) return;

    habits.push({
        text: habitText,
        completed: false
    });

    habitInput.value = "";
    renderHabits();
}

function renderHabits() {
    habitList.replaceChildren();

    habits.forEach(habit => {
        createHabit(habitList, habit.text);
    });
}
