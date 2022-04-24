const TEMPLATE = '<ul class="todo-list"></ul>'

export const EVENTS = {
    DELETE_ITEM: 'DELETE_ITEM'
}

export default class ListComponent extends HTMLElement {
    static get observedAttributes() {
        return ['todos']
    }

    get todos() {
        if (!this.hasAttribute('todos')) {
            return []
        }

        return JSON.parse(this.getAttribute('todos'))
    }

    set todos(value) {
        this.setAttribute('todos', JSON.stringify(value))
    }

    onDeleteClick(index) {
        // 이벤트를 컴포넌트 안에서 처리하지 않는다. 커스텀 이벤트를 통해 외부로 알린다.
        const event = new CustomEvent(EVENTS.DELETE_ITEM, {detail: {index}})
        this.dispatchEvent(event)
    }

    createNewTodoNode() {
        return this.itemTemplate.content.firstElementChild.cloneNode(true)
    }

    getTodoElement(todo, index) {
        const {text, completed} = todo
        const element = this.createNewTodoNode()
        element.querySelector('input.edit').value = text
        element.querySelector('label').textContent = text
        if (completed) {
            element.classList.add('completed')
            element.querySelector('input.toggle').checked = true
        }

        element.querySelector('button.destroy').dataset.index = index
        return element
    }

    updateList() {
        this.list.innerHTML = ''
        /**
         * 이거 constructor에서 this 바인딩을 해줘도 getTodoElement 안에서 this가 undefined라고 하는데
         * 도대체 왜 그러는 건지 ?????????
         * 근데 또 (todo, index) => this.getTodoElement(todo, index)
         * 이렇게 넣어주면 this가 잘 붙어 있음.. (?????)
         */
        this.todos.map(this.getTodoElement.bind(this)).forEach(element => this.list.appendChild(element))
    }

    connectedCallback() {
        this.innerHTML = TEMPLATE
        this.itemTemplate = document.getElementById('todo-item')
        this.list = this.querySelector('ul')
        this.list.addEventListener('click', e => {
            if (e.target.matches('button.destroy')) {
                this.onDeleteClick(e.target.dataset.index)
            }
        })
        this.updateList()
    }

    attributeChangedCallback() {
        this.updateList()
    }
}