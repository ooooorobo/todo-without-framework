const getTodoCount = todos => {
    const notCompleted = todos.filter(todo => !todo.completed).length;
    return `할 일이 ${notCompleted}개 남았어요`
}

export default (targetElement, {todos}) => {
    const newCounter = targetElement.cloneNode(true)
    newCounter.textContent = getTodoCount(todos)
    return newCounter
}