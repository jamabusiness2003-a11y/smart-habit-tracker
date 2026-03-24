import { createBtnContainer, createButton, createHabit } from "./components/habit_item.js";
import { dateFormatter, longDateFormatter } from "./utils/formatter.js";
import { removeHabit, resetCompletedHabit, toggleHabit } from "./utils/habitHelpers.js";
import { loadHabits, saveHabits } from "./utils/storage.js";

const habitInput = document.getElementById("habitInput");
const addBtn = document.getElementById("addBtn");
const habitList = document.getElementById("habitList");
const dateEl = document.getElementById("date");

let habits = loadHabits() || [];

addBtn.addEventListener("click", addHabit);

dateEl.textContent = longDateFormatter("en-CA");

function addHabit() {
    const habitText = habitInput.value.trim();

    if (!habitText) return;

    habits.push({
        text: habitText,
        completed: false,
        lastCompletedDate: ""
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

    if (habits[index].completed && !habits[index].lastCompletedDate) {
        habits[index].lastCompletedDate = dateFormatter(Date.now());
    } else {
        habits[index].lastCompletedDate = "";
    }
    
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

        resetCompletedHabit(li, habit);

        btnContainer.append(completedBtn, deleteBtn);
        li.appendChild(btnContainer);

        habitList.appendChild(li);
    });

    console.log(habits);
}

renderHabits();
