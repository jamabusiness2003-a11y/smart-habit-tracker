import { 
    createBtnContainer, 
    createButton,  
    createHabit } from "./components/habit_item.js";

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
        completed: false,
    });

    habitInput.value = "";
    renderHabits();
}

function markAsCompleted(habit) {
    habit.completed = !habit.completed; 
    renderHabits();
}

function renderHabits() {
    habitList.replaceChildren();

    habits.forEach(habit => {
        const btnContainer = createBtnContainer(() => {
            markAsCompleted(habit);
        });
        const li = createHabit(habit.text);
        const completedBtn = createButton("✔️", "mark-btn");

        if (habit.completed) {
            li.classList.add("completed");
        }

        btnContainer.appendChild(completedBtn);
        li.appendChild(btnContainer);

        habitList.appendChild(li);
    });
}
