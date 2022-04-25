import createPages from './pages.js'
import createRouter from './router.js'

const container = document.querySelector('main')

const pages = createPages(container)
const router = createRouter()

// 프래그먼트 방식
router
    .addRoute('#/', pages.home)
    .addRoute('#/list', pages.list)
    .addRoute('#/list/:id', pages.detail)
    .addRoute('#/list/:id/:anotherId', pages.moreDetail)
    .setNotFound(pages.notFound)
    .start()

// 프로그래밍 방식
const NAV_BTN_SELECTOR = 'button[data-navigate]'
// body에 버튼 이벤트를 위임
document.body.addEventListener('click', e => {
    const {target} = e
    if (target.matches(NAV_BTN_SELECTOR)) {
        const {navigate} = target.dataset
        router.navigate(navigate)
    }
})