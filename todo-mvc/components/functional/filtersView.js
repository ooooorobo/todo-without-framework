export default (targetElement, { currentFilter }, events) => {
    const newFilter = targetElement.cloneNode(true)
    Array
        .from(newFilter.querySelectorAll('li a'))
        .forEach(a => {
            a.addEventListener('click', e => {
                events.changeFilter(e.target.dataset.filter)
            })
            if (a.textContent === currentFilter) {
                a.classList.add('selected')
            } else {
                a.classList.remove('selected')
            }
        })
    return newFilter
}