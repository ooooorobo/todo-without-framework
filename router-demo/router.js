export default () => {
    const ROUTE_PARAMETER_REGEXP = /:(\w+)/g
    const URL_FRAGMENT_REGEXP = '([^\\/]+)'
    const TICKTIME = 250
    const NAV_A_SELECTOR = 'a[data-navigation]'

    const routes = []
    let notFound = () => {}
    let lastPathname

    const router = {}

    const extractUrlParams = (route, pathname) => {
        if (route.params.length === 0) {
            return {}
        }

        const params = {}

        const matches = pathname.match(route.testRegExp)
        matches.shift()
        matches.forEach((paramValue, index) => {
            const paramName = route.params[index]
            params[paramName] = paramValue
        })

        return params
    }

    const checkRoutes = () => {
        const {pathname} = window.location
        if (lastPathname === pathname) {
            return
        }
        lastPathname = pathname;

        const currentRoute = routes.find(route => {
            const {testRegExp} = route
            return testRegExp.test(pathname)
        })
        if (!currentRoute) {
            notFound()
            return
        }
        const urlParams = extractUrlParams(currentRoute, pathname)
        // 파라미터를 포함해서 컴포넌트를 렌더링하도록 함
        currentRoute.component(urlParams)
    }

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

    // 알맞은 route 찾지 못할 경우 보여줄 페이지 방식 등록
    router.setNotFound = cb => {
        notFound = cb
        return router
    }

    // 라우팅 시작
    router.start = () => {
        // 최초 1회 체크
        checkRoutes()
        // 일정 시간마다 경로 이름이 변경되었는지 알아서 확인
        window.setInterval(checkRoutes, TICKTIME)

        document.body.addEventListener('click', e => {
            const {target} = e
            if (target.matches(NAV_A_SELECTOR)) {
                // a 태그 기본 동작때문에 의도한 링크로 이동하지 않는다. preventDefault 해줘야 함
                e.preventDefault()
                router.navigate(target.href)
            }
        })
    }

    // 프로그래밍 방식을 위한 메서드
    router.navigate = path => {
        // pushState - 새 URL로 이동
        window.history.pushState(null, null, path)
    }

    return router
}