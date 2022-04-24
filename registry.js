// 고차 함수 형태로 작성 - 순수 함수 형태를 유지하기 위해서
// 이렇게 하면 순수 함수 형태를 유지하며 어떤 컴포넌트가 다른 컴포넌트에 포함될 수 있다
const renderWrapper = component => {
    return (targetElement, state) => {
        const element = component(targetElement, state)
        const childComponents = element.querySelectorAll('[data-component]')
        // 이렇게 재귀적으로 탐색하면서, 마지막 컴포넌트까지 탐색한다
        Array.from(childComponents).forEach(target => {
            const name = target.dataset.component
            const child = registry[name]
            if (!child) return

            target.replaceWith(child(target, state))
        })
        return element
    }
}

/**
 * 레지스트리에 컴포넌트를 추가한다
 * @param name
 * @param component
 */
const add = (name, component) => {
    registry[name] = renderWrapper(component)
}

/**
 * 최초 DOM 요소부터 렌더링을 시작한다
 * @param root
 * @param state
 * @returns {*}
 */
const renderRoot = (root, state) => {
    const cloneComponent = root => {
        return root.cloneNode(true)
    }

    return renderWrapper(cloneComponent)(root, state)
}

/**
 * 키 - data-component 속성값
 * 값 - 매칭되는 뷰 함수
 */
export const registry = {
    add,
    renderRoot
}