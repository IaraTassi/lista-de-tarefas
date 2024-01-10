const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");

let tasks = [];

function renderTaskHtml(taskTitle, done = false) {
  // Adiconando a nova tarefa no HTML
  const li = document.createElement("li");

  const input = document.createElement("input"); // Criando input
  input.setAttribute("type", "checkbox");
  input.addEventListener("change", (event) => {
    const liToTogle = event.target.parentElement;

    const spanToTogle = liToTogle.querySelector("span");

    const done = event.target.checked;
    if (done) {
      spanToTogle.style.textDecoration = "line-through";
      spanToTogle.style.textDecoration = "none";
    }

    // Alterar o done
    tasks = tasks.map((t) => {
      if (t.title === spanToTogle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }

      return t;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  input.checked = done;

  const span = document.createElement("span");
  span.textContent = taskTitle;
  if (done) {
    span.style.textDecoration = "line-through";
  }

  const button = document.createElement("button");
  button.textContent = "Remover";
  button.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;

    const titleToRemove = liToRemove.querySelector("span").textContent;

    tasks = tasks.filter((t) => t.title !== titleToRemove);

    todoListUl.removeChild(liToRemove); // Tenho elemento pai que disparou o envento e removo o filho com o parentElement
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  todoListUl.appendChild(li); //Adicionar um filho dentro de uma tag li dentro ul
}

// Assim que a página carregar preciso colocar elas no HTML
window.onload = () => {
  const tasksOnLocalStorage = localStorage.getItem("tasks");

  if (!tasksOnLocalStorage) return;

  tasks = JSON.parse(tasksOnLocalStorage);

  tasks.forEach((t) => {
    renderTaskHtml(t.title, t.done);
  });
  console.log(tasksOnLocalStorage);
};

// Evento para a página não carregar ao submeter o formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskTitle = taskTitleInput.value;
  console.log(taskTitle);

  // Lógica para que o usuário não consiga add tarefa com menos de 3 caracteres
  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter, pelo menos três caracteres.");
    return;
  }

  // Adicionando a nova tarefa no array de tasks
  tasks.push({
    title: taskTitle,
    done: false,
  });
  // Salvando no localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Chamo a função
  renderTaskHtml(taskTitle);

  // Limpar o input
  taskTitleInput.value = "";
});
