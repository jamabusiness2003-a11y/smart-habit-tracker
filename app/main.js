import { createBtnContainer, createButton, createHabit } from "./components/habit_item.js";
import { dateFormatter, longDateFormatter } from "./utils/formatter.js";
import { removeHabit, resetHabitsDaily, toggleHabit, updateCompletionDate } from "./utils/habitHelpers.js";
import { loadHabits, saveHabits } from "./utils/storage.js";

const habitInput = document.getElementById("habitInput");
const addBtn = document.getElementById("addBtn");
const habitList = document.getElementById("habitList");
const dateEl = document.getElementById("date");

let habits = loadHabits();

init();

function init() {
    const today = dateFormatter(Date.now());

    addBtn.addEventListener("click", addHabit);
    habitList.addEventListener("click", handleListClick);

    dateEl.textContent = longDateFormatter("en-CA");
    resetHabitsDaily(habits, today);

    renderHabits();
}

function addHabit() {
    const habitText = habitInput.value.trim();

    if (!habitText) return;

    habits.push({
        text: habitText,
        completed: false,
        lastCompletedDate: ""
    });

    habitInput.value = "";
    updateApp();
}

function handleListClick(e) {
    const li = e.target.closest("li");
    if (!li) return;

    const index = Number(li.dataset.index);

    if (e.target.classList.contains("mark-btn")) {
        toggleHabit(habits, index);
        updateCompletionDate(habits[index], dateFormatter);
        updateApp();
    }
                   
    if (e.target.classList.contains("delete-btn")) {
        removeHabit(habits, index);
        updateApp();
    }      
}

function buildHabitItem(habit, index) {
    const li = createHabit(habit.text);
    li.dataset.index = index;

    li.classList.toggle("completed", habit.completed);

    const btnContainer = createBtnContainer();
    const completedBtn = createButton("✔️", "mark-btn");
    const deleteBtn = createButton("❌", "delete-btn");

    btnContainer.append(completedBtn, deleteBtn);
    li.appendChild(btnContainer);

    return li;
}

function renderHabits() {
    habitList.replaceChildren();

    habits.forEach((habit, index) => {
        const li = buildHabitItem(habit, index);
        habitList.appendChild(li);
    });

    console.log(habits);
}

function updateApp() {
    saveHabits(habits);
    renderHabits();
}