export default () => {
    const ROUTE_PARAMETER_REGEXP = /:(\w+)/g
    const URL_FRAGMENT_REGEXP = '([^\\/]+)'

    const routes = []
    let notFound = () => {}

    const router = {}

    // fragment마다 그려줄 컴포넌트를 등록
    router.addRoute = (fragment, component) => {
        const params = []
        const parsedFragment = fragment
            .replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
                params.push(paramName)
                return URL_FRAGMENT_REGEXP
            })
            .replace(/\//g, '\\/')

        routes.push({testRegExp: new RegExp(`^${parsedFragment}$`), component, params})
        return router
    }

    const extractUrlParams = (route, windowHash) => {
        if (route.params.length === 0) {
            return {}
        }

        const params = {}

        const matches = windowHash.match(route.testRegExp)
        matches.shift()
        matches.forEach((paramValue, index) => {
            const paramName = route.params[index]
            params[paramName] = paramValue
        })

        return params
    }

    const checkRoutes = () => {
        const {hash} = window.location

        const currentRoute = routes.find(route => {
            const {testRegExp} = route
            return testRegExp.test(hash)
        })
        if (!currentRoute) {
            notFound()
            return
        }
        const urlParams = extractUrlParams(currentRoute, window.location.hash)
        // 파라미터를 포함해서 컴포넌트를 렌더링하도록 함
        currentRoute.component(urlParams)
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