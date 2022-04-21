const getTodoElement = todo => {
    const { text, completed } = todo
    return `
        <li ${completed ? 'class="completed"' : ''}>
            <div class="view">
                <input ${completed ? 'checked' : ''} class="toggle" type="checkbox">
                <label>${text}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${text}">
        </li>
    `
}

const getTodoCountElement = todos => {
    const notCompleted = todos.filter(todo => !todo.completed).length;
    return `할 일이 ${notCompleted}개 남았어요`
}

export default (targetElement, state) => {
    const {
        currentFilter, todos
    } = state

    /**
     * 노드를 복제 -> 이 노드 하위로 일어나는 DOM 수정은 가상이다.
     * 기존 DOM과 분리된 형태로 작업하고 있다.
     * 이렇게 하면 성능을 향상시킬 수 있다.
     * DOM에서 직접 작업하면, DOM 조작이 일어날 때마다 리플로우&렌더링이 발생할 수 있다.
     */
    /**
     * 한계)
     * 1. DOM 조작이 이 함수 하나에서만 일어나고 있다. 복잡성이 높아질 수 있다.
     * 2. 리스트, 카운터, 필터가 요소를 만들기 위해 각각 다른 방법을 사용하고 있다. 뷰 생성에 일관성이 없다.
     */
    const element = targetElement.cloneNode(true)
    const list = element.querySelector('.todo-list')
    const counter = element.querySelector('.todo-count')
    const filters = element.querySelector('.filters')

    list.innerHTML = todos.map(getTodoElement).join('');
    counter.textContent = getTodoCountElement(todos)
    Array
        .from(filters.querySelectorAll('li a'))
        .forEach(a => {
            if (a.textContent === currentFilter) {
                a.classList.add('selected')
            } else {
                a.classList.remove('selected')
            }
        })

    // 이 시점에서 해당 DOM의 수정사항은 커밋되지 않았다.
    return element
}