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
window.requestAnimationFrame(() => {
    // 최초 DOM
    const main = document.querySelector('.todoapp')
    const newMain = registry.renderRoot(main, state)
    main.replaceWith(newMain)
})