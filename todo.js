const toDoform = document.querySelector(".js-toDoForm"),
  toDoinput = toDoform.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; // const 였는데 deleteToDo 에서 todos = cleantodos 해줘서 let 으로 바꿈

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(todo) {
    // foreach 와 같이 array 에 function 을 각각 실행시켜주는데 boolean 처럼 체크하고 맞는 것만 return 해주는 함수
    return todo.id !== parseInt(li.id); // li.id 가 string 이야
  });
  toDos = cleanToDos; // 이 작업을 해야해서 let 형 toDos로 바꿈
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  // localstorage 즉, html은 저장소에 string 형식으로만 저장하기 때문에 stringify 해준 것이다.
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "Ð";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoinput.value;
  paintToDo(currentValue);
  toDoinput.value = "";
}
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    // stringify 해준것을 다시 array 로 parse 하여 저장
    parsedToDos.forEach(function(toDo) {
      // foreach 는 arrary 를 위한 function
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoform.addEventListener("submit", handleSubmit);
}

init();
