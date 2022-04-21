import counterView from './view/counterView.js'
import filtersView from './view/filtersView.js'
import todosView from "./view/todosView.js"

export default (targetElement, state) => {
    /**
     * 노드를 복제 -> 이 노드 하위로 일어나는 DOM 수정은 가상이다.
     * 기존 DOM과 분리된 형태로 작업하고 있다.
     * 이렇게 하면 성능을 향상시킬 수 있다.
     * DOM에서 직접 작업하면, DOM 조작이 일어날 때마다 리플로우&렌더링이 발생할 수 있다.
     */
    const element = targetElement.cloneNode(true)
    const list = element.querySelector('.todo-list')
    const counter = element.querySelector('.todo-count')
    const filters = element.querySelector('.filters')

    /**
     * (개선) 뷰를 작은 함수로 분리했다. 이제 뷰 생성 방식이 일관적이다.
     * (한계) 함수를 수동으로 호출해서 뷰를 만들고 있다.
     * 이 방식은 매번 1) HTML에 노드를 추가하고 2) 함수를 수동 호출해줘야 해서 뷰를 만들기 번거롭고 가독성이 나쁘다.
     *
     */
    list.replaceWith(todosView(list, state))
    counter.replaceWith(counterView(counter, state))
    filters.replaceWith(filtersView(filters, state))

    // 이 시점에서 해당 DOM의 수정사항은 커밋되지 않았다.
    return element
}