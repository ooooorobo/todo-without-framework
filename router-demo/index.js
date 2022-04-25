import createPages from './pages.js'
import createRouter from './router.js'

const container = document.querySelector('main')

const pages = createPages(container)
const router = createRouter()

router
    .addRoute('#/', pages.home)
    .addRoute('#/list', pages.list)
    .setNotFound(pages.notFound)
    .start()