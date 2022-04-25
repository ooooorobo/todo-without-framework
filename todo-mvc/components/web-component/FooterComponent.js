export default class FooterComponent extends HTMLElement {
    static get observedAttributes() {
        return ['filter']
    }
    get filter() {
        return this.getAttribute('filter')
    }
    set filter(value) {
        this.setAttribute('filter', value);
    }
    updateFooter() {
        this.innerHTML = ''
        const newFilter = this.template.content.firstElementChild.cloneNode(true)
        Array
            .from(newFilter.querySelectorAll('li a'))
            .forEach(a => {
                if (a.textContent === this.filter) {
                    a.classList.add('selected')
                } else {
                    a.classList.remove('selected')
                }
            })
        this.appendChild(newFilter)
    }
    connectedCallback() {
        this.template = document.getElementById('footer');
        this.updateFooter()
    }
    attributeChangedCallback() {
        this.updateFooter()
    }
}