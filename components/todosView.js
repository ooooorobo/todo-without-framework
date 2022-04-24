let template;

const createNewTodoNode = () => {
    if (!template) {
        template = document.getElementById('todo-item')
    }
    return template.content.firstElementChild.cloneNode(true)
}

const getTodoElement = todo => {
    const { text, completed } = todo
    // 문자열 방식은 이벤트 리스너를 추가하기 어렵다. 따라서 템플릿 방식으로 바꾸어 DOM 노드를 사용하도록 변경
    const element = createNewTodoNode()
    element.querySelector('input.edit').value = text
    element.querySelector('label').textContent = text
    if (completed) {
        element.classList.add('completed')
        element.querySelector('input.toggle').checked = true
    }
    return element
}

export default (targetElement, {todos}) => {
    const newList = targetElement.cloneNode(true)
    newList.innerHTML = ''
    todos.map(getTodoElement).forEach(element => newList.appendChild(element));
    return newList
}