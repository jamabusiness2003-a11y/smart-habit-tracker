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

function deleteHabit(index) {
    habits.splice(index, 1);
    renderHabits();
}

function markAsCompleted(index) {
    habits[index].completed = !habits[index].completed; 
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
