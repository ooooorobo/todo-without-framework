let template;

const createNewTodoNode = () => {
    if (!template) {
        template = document.getElementById('todo-item')
    }
    return template.content.firstElementChild.cloneNode(true)
}

const getTodoElement = (todo, index) => {
    const { text, completed } = todo
    // 문자열 방식은 이벤트 리스너를 추가하기 어렵다. 따라서 템플릿 방식으로 바꾸어 DOM 노드를 사용하도록 변경
    const element = createNewTodoNode()
    element.querySelector('input.edit').value = text
    element.querySelector('label').textContent = text
    if (completed) {
        element.classList.add('completed')
        element.querySelector('input.toggle').checked = true
    }

    element.querySelector('button.destroy').dataset.index = index

    return element
}

export default (targetElement, {todos}, events) => {
    const newList = targetElement.cloneNode(true)
    newList.innerHTML = ''
    todos.map((todo, index) => getTodoElement(todo, index)).forEach(element => newList.appendChild(element));
    /**
     * 이벤트 위임 - 이렇게 하면 각 리스트 요소가 이벤트 핸들러를 가지지 않아도 된다.
     * - 이벤트 핸들러가 하나만 있으면 된다.
     * - 이벤트 핸들러 생성과 제거 과정이 자주 일어나지 않는다
     * -> 성능과 메모리 사용성 개선 가능
     */
    newList.addEventListener('click', e => {
        if (e.target.matches('button.destroy')) {
            events.deleteItem(e.target.dataset.index)
        }
    })
    return newList
}