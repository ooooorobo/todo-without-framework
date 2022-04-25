export default container => {
    const home = () => {
        container.textContent = '홈페이지입니다'
    }

    const list = () => {
        container.textContent = '리스트 페이지입니다'
    }

    const notFound = () => {
        container.textContent = '페이지를 찾을 수 없습니다'
    }

    return {home, list, notFound}
}

