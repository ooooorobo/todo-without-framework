export default container => {
    const home = () => {
        container.textContent = '홈페이지입니다'
    }

    const list = () => {
        container.textContent = '리스트 페이지입니다'
    }

    // 매개변수 읽기 기능 추가
    const detail = (params) => {
        const {id} = params
        container.textContent = `${id}번 페이지입니다`
    }

    const moreDetail = (params) => {
        const {id, anotherId} = params
        container.textContent = `이 페이지는 ${id}번 페이지의 ${anotherId}번 페이지입니다`
    }

    const notFound = () => {
        container.textContent = '페이지를 찾을 수 없습니다'
    }

    return {home, list, detail, moreDetail, notFound}
}

