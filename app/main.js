import { createBtnContainer, createButton, createHabit } from "./components/habitItem.js";
import { createHabitStreaks } from "./components/habitStreaks.js";
import { isStreakActive } from "./utils/flag.js";
import { dateFormatter, longDateFormatter } from "./utils/formatter.js";
import { 
    removeHabit, 
    resetHabitsDaily, 
    toggleHabit, 
    updateCompletionDate 
} from "./utils/habitHelpers.js";
import { loadHabits, saveHabits } from "./utils/storage.js";

const habitInput = document.getElementById("habitInput");
const addBtn = document.getElementById("addBtn");
const habitList = document.getElementById("habitList");
const dateEl = document.getElementById("date");

const today = dateFormatter(Date.now());
const LAST_RESET_KEY = "lastResetDate";

let habits = loadHabits();

init();

function init() {
    handleEvents();

    dateEl.textContent = longDateFormatter("en-CA");

    const lastResetDate = localStorage.getItem(LAST_RESET_KEY);

    if (lastResetDate !== today) {
        resetHabitsDaily(habits, today);
        localStorage.setItem(LAST_RESET_KEY, today);
        saveHabits(habits);
    }
    
    renderHabits();
}

function handleEvents() {
    addBtn.addEventListener("click", addHabit);
    habitList.addEventListener("click", handleListClick);

    habitInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addHabit();
        }
    });
}

function addHabit() {
    const text = habitInput.value.trim();
    if (!text) return;

    const newHabit = {
        text,
        completed: false,
        lastCompletedDate: "",
        streaks: 0
    };

    habits.push(newHabit);

    habitInput.value = "";
    updateApp();
}

function handleListClick(e) {
    const li = e.target.closest("li");
    if (!li) return;

    const index = Number(li.dataset.index);
    if (isNaN(index) || !habits[index]) return;

    const habit = habits[index];

    if (e.target.classList.contains("mark-btn")) {
        toggleHabit(habits, index);

        if (habit.completed) {
            updateCompletionDate(habit, today);  
        }

        updateApp();
        return;
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

    const streakEl = createHabitStreaks(`🔥 ${habit.streaks}`);
    const isActive = isStreakActive(habit, today);
    streakEl.classList.toggle("hidden", !isActive);

    btnContainer.append(completedBtn, deleteBtn);
    li.append(streakEl, btnContainer);

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