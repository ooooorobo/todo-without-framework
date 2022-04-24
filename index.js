import getTodos from './getTodos.js'
import { registry } from "./registry.js"
import todosView from "./view/todosView.js"
import counterView from "./view/counterView.js"
import filtersView from "./view/filtersView.js"

// 레지스트리에 컴포넌트 등록
registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

// 초기 상태 설정
const state = {
    todos: getTodos(),
    currentFilter: 'All'
}


/**
 * 모든 DOM 조작이나 애니메이션은 requestAnimationFrame을 기반으로 해야 더 효율적이다.
 * - 메인 스레드를 차단하지 않는다
 * - 다음 리페인트가 이벤트 루프에서 스케줄링되기 직전에 실행된다.
 * [브라우저 렌더링(HTML 로드) -> 다음 렌더링 대기 -> 새 가상 노드(view.js) -> DOM 조작(index.js) -> 브라우저 렌더링]
 */
const render = () => {
    window.requestAnimationFrame(() => {
        // 최초 DOM
        const main = document.querySelector('.todoapp')
        const newMain = registry.renderRoot(main, state)
        main.replaceWith(newMain)
    })
}

/**
 * 5초마다 데이터가 변경되는 동적 데이터라고 가정하고 렌더링힌다
 * --> 데이터가 변경될 때마다 가상 루트 요소를 만든 다음 실제 요소를 대체한다
 * --> 프로젝트가 커질수록 새로 그려야 하는 요소의 양이 많아진다 --> 성능 저하 가능성 발생
 */
window.setInterval(() => {
    state.todos = getTodos()
    render()
}, 5000)

render()
