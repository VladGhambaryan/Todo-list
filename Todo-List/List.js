const container = document.getElementById('items')
const inputReset = document.getElementById('input')
let items = []

const createListItem = ({id, isChecked, name}) => `<div class="todo" >
                 <input class="check" type="checkbox" ${isChecked ? "checked" : false} data-id="${id}" >
                 <span  class="span">${name}</span>
                <button  class="remove" type="button" data-id="${id}"> &#215</button>
          </div>`
const render = () => {
    let saveTodos = localStorage.getItem('todos')
    items = saveTodos ? JSON.parse(saveTodos) : []

    container.innerHTML = '';
    items.forEach((item) => {
        container.innerHTML += createListItem(item)
    })
}
const removeItem = (id) => {
    let saveTodos = localStorage.getItem('todos')
    items = saveTodos ? JSON.parse(saveTodos) : []
    items = items.filter(item => item.id !== id)
    localStorage.setItem('todos', JSON.stringify(items))
    render()
}
const toggleCheckItem = (id) => {
    let saveTodos = localStorage.getItem('todos')
    items = saveTodos ? JSON.parse(saveTodos) : []
    items = items.map(item => item.id === id ? {...item, isChecked: !item.isChecked} : item)
    localStorage.setItem('todos', JSON.stringify(items))
    render()
}
const clearAll = (id) => {
    let saveTodos = localStorage.getItem('todos')
    items = saveTodos ? JSON.parse(saveTodos) : []
    items.splice(id)
    localStorage.setItem('todos', JSON.stringify(items))
    render()
}
document.addEventListener("click", (e) => {
    const id = Number(e.target.getAttribute('data-id'));

    if (e.target.classList.contains('remove')) {
        removeItem(id);
    }
    if (e.target.classList.contains('check')) {
        toggleCheckItem(id);

    }
    if (e.target.classList.contains('clearBtn')) {
        clearAll(id)
    }
})
inputReset.addEventListener("keydown", function (item) {
    if (item.key === "Enter") {
        addTodoInput()
    }
})
function addTodoInput(id, name, isChecked) {
    let todoName = document.getElementById('input').value
    if (!todoName) {
        return false
    }
    items.push(({id: Math.random(), name: todoName, isChecked: false}))
    localStorage.setItem('todos', JSON.stringify(items))
    inputReset.focus()
    inputReset.value = ''
    render()
}
render()


