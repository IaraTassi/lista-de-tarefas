const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");

let tasks = [];

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
  tasks.push(taskTitle);

  // Adiconando a nova tarefa no HTML
  const li = document.createElement("li"); // Criando tag li dentro do JS

  const input = document;

  //li.textContent = taskTitle; // Criando tag <li>Tarefa 2</li> com o conteúdo em texto

  todoListUl.appendChild(li); //Adicionar um filho dentro de uma tag

  // Limpar o input
  taskTitleInput.value = "";
});
