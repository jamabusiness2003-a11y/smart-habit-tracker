import { createBtnContainer, createButton, createHabit } from "./components/habit_item.js";
import { removeHabit, toggleHabit } from "./utils/habitHelpers.js";
import { loadHabits, saveHabits } from "./utils/storage.js";

const habitInput = document.getElementById("habitInput");
const addBtn = document.getElementById("addBtn");
const habitList = document.getElementById("habitList");

let habits = loadHabits() || [];

addBtn.addEventListener("click", addHabit);

function addHabit() {
    const habitText = habitInput.value.trim();

    if (!habitText) return;

    habits.push({
        text: habitText,
        completed: false,
    });

    habitInput.value = "";

    saveHabits(habits);
    renderHabits();
}

function deleteHabit(index) {
    removeHabit(habits, index);

    saveHabits(habits);
    renderHabits();
}

function markAsCompleted(index) {
    toggleHabit(habits, index);

    saveHabits(habits);
    renderHabits();
}

function renderHabits() {
    habitList.replaceChildren();

    habits.forEach((habit, index) => {
        const btnContainer = createBtnContainer((e) => {
            if (e.target.classList.contains("mark-btn"))
                markAsCompleted(index);
            
            if (e.target.classList.contains("delete-btn")) 
                deleteHabit(index);
        });
        const li = createHabit(habit.text);
        const completedBtn = createButton("✔️", "mark-btn");
        const deleteBtn = createButton("❌", "delete-btn");

        if (habit.completed) {
            li.classList.add("completed");
        }

        btnContainer.append(completedBtn, deleteBtn);
        li.appendChild(btnContainer);

        habitList.appendChild(li);
    });
}

renderHabits();
