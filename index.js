import view from './view.js'
import getTodos from './getTodos.js'

const state = {
    todos: getTodos(),
    currentFilter: 'All'
}

const main = document.querySelector('.todoapp')

/**
 * 모든 DOM 조작이나 애니메이션은 requestAnimationFrame을 기반으로 해야 더 효율적이다.
 * - 메인 스레드를 차단하지 않는다
 * - 다음 리페인트가 이벤트 루프에서 스케줄링되기 직전에 실행된다.
 * [브라우저 렌더링(HTML 로드) -> 다음 렌더링 대기 -> 새 가상 노드(view.js) -> DOM 조작(index.js) -> 브라우저 렌더링]
 */
window.requestAnimationFrame(() => {
    const newMain = view(main, state)
    main.replaceWith(newMain)
})