let template;

const createNewTodoNode = () => {
    if (!template) {
        template = document.getElementById('todo-item')
    }
    return template.content.firstElementChild.cloneNode(true)
}

const getTodoElement = (todo, index, events) => {
    const { text, completed } = todo
    // 문자열 방식은 이벤트 리스너를 추가하기 어렵다. 따라서 템플릿 방식으로 바꾸어 DOM 노드를 사용하도록 변경
    const element = createNewTodoNode()
    element.querySelector('input.edit').value = text
    element.querySelector('label').textContent = text
    if (completed) {
        element.classList.add('completed')
        element.querySelector('input.toggle').checked = true
    }

    const handler = e => events.deleteItem(index)
    element.querySelector('button.destroy').addEventListener('click', handler);

    return element
}

export default (targetElement, {todos}, events) => {
    const newList = targetElement.cloneNode(true)
    newList.innerHTML = ''
    todos.map((todo, index) => getTodoElement(todo, index, events)).forEach(element => newList.appendChild(element));
    return newList
}