export default () => {
    const routes = []
    let notFound = () => {}

    const router = {}
    const checkRoutes = () => {
        const currentRoute = routes.find(route => {
            return route.fragment === window.location.hash
        })

        if (!currentRoute) {
            notFound()
            return
        }

        currentRoute.component()
    }

    // fragment마다 그려줄 컴포넌트를 등록
    router.addRoute = (fragment, component) => {
        routes.push({fragment, component})
        return router
    }

    // 알맞은 route 찾지 못할 경우 보여줄 페이지 방식 등록
    router.setNotFound = cb => {
        notFound = cb
        return router
    }

    // 라우팅 시작
    router.start = () => {
        // hash 변경될 때마다 route 체크
        window.addEventListener('hashchange', checkRoutes)
        if (!window.location.hash) {
            window.location.hash = '#/'
        }

        // 최초 1회 체크
        checkRoutes()
    }

    // 프로그래밍 방식을 위한 메서드
    router.navigate = fragment => {
        window.location.hash = fragment
    }

    return router
}