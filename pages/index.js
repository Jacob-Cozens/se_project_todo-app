import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import ImportedTodo from "../components/Todo.js";
import ImportedFormValidator from "../components/FormValidator.js";
import ImportedSection from "../components/Section.js";
import ImportedPopupWithForm from "../components/PopupWithForm.js";
import ImportedTodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const todoCounter = new ImportedTodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new ImportedPopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    renderTodo(values);
    todoCounter.updateTotal(true);
    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const generateTodo = (data) => {
  const todo = new ImportedTodo(
    data,
    "#todo-template",
    handleCheck,
    handleDelete
  );
  const todoElement = todo.getView();
  return todoElement;
};

function renderTodo(item) {
  const todo = generateTodo(item);
  section.addItem(todo);
}

const section = new ImportedSection({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newFormValidator = new ImportedFormValidator(
  validationConfig,
  addTodoForm
);
newFormValidator.enableValidation();
