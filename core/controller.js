import getTodos from '../data/getTodos.js'
import { registry } from "./registry.js"
import todosView from "../components/functional/todosView.js"
import counterView from "../components/functional/counterView.js"
import filtersView from "../components/functional/filtersView.js"
import app from "../components/functional/app.js"
import { applyDiff } from "./diff.js"
import AppComponent from "../components/web-component/AppComponent.js"
import ListComponent from "../components/web-component/ListComponent.js"
import FooterComponent from "../components/web-component/FooterComponent.js"

// 레지스트리에 컴포넌트 등록
registry.add('app', app)
registry.add('todos', todosView)
registry.add('counter', counterView)
registry.add('filters', filtersView)

// 초기 상태 설정
const state = {
    todos: getTodos(),
    currentFilter: 'All'
}

const events = {
    deleteItem: (index) => {
        state.todos.splice(index, 1)
        render()
    },
    addItem: (text) => {
        state.todos.push({
            text,
            completed: false
        })
        render()
    }
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
        const main = document.querySelector('#root')
        const newMain = registry.renderRoot(main, state, events)
        applyDiff(document.body, main, newMain)
    })
}
// 함수형으로 렌더링할 경우
// render()

// 웹 컴포넌트를 사용하기 위해 레지스트리에 웹 컴포넌트를 등록한다
window.customElements.define('todomvc-app', AppComponent)
window.customElements.define('todomvc-list', ListComponent)
window.customElements.define('todomvc-footer', FooterComponent)

