/**
 * DOM이 갱신될 때, 기존 DOM을 갱신된 DOM으로 변경하는 가장 빠른 방법을 찾아낸다.
 * diff 알고리즘을 구현
 * @param parentNode - 현재 DOM 노드의 부모
 * @param realNode - 실제 DOM 노드 부모
 * @param virtualNode - 새로운 가상 DOM 노드 부모
 */
export const applyDiff = (parentNode, realNode, virtualNode) => {
    // 새 노드가 정의되지 않았을 경우 실제 노드 삭제
    if (realNode && !virtualNode) {
        realNode.remove()
        return
    }
    // 실제 노드가 정의되지 않았지만 가상 노드가 있으면 부모 노드에 추가
    if (!realNode && virtualNode) {
        parentNode.append(virtualNode)
        return
    }
    // 두 노드가 모두 정의된 경우 두 노드 간의 차이를 확인
    // 변경이 있다면 virtualNode를 사용
    if (isNodeChanged(virtualNode, realNode)) {
        realNode.replaceWith(virtualNode)
        return
    }

    // 두 노드 모두 있지만 변경이 없었던 경우
    // 두 노드의 자식을 하나씩 비교한다
    const realChildren = Array.from(realNode.children)
    const virtualChildren = Array.from(virtualNode.children)

    const max = Math.max(
        realChildren.length,
        virtualChildren.length
    )
    for (let i = 0; i < max; i++) {
        applyDiff(
            realNode,
            realChildren[i],
            virtualChildren[i]
        )
    }
}

const isNodeChanged = (node1, node2) => {
    const n1Atrs = node1.attributes
    const n2Atrs = node2.attributes
    // 속성 개수 비교
    if (n1Atrs.length !== n2Atrs.length) {
        return true
    }
    // 속성값 비교
    const differentAtr = Array
        .from(n1Atrs)
        .find(atr => {
            const {name} = atr
            const atr1 = node1.getAttribute(name)
            const atr2 = node2.getAttribute(name)
            return atr1 !== atr2
        })
    if (differentAtr) {
        return true
    }
    // 노드 자식 개수 & 내용 비교
    if (node1.children.length === 0 && node2.children.length === 0
    && node1.textContent !== node2.textContent) {
        return true
    }
    return false
}