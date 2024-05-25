class CS_MenuFilter {
    constructor() {
        this.filtersSelector = '.cs-button';
        this.menuSelector = '.cs-menu-group';
        this.activeClass = 'cs-active';
        this.hiddenClass = 'cs-hidden';
        this.$menus = document.querySelectorAll(this.menuSelector);
        const $filters = document.querySelectorAll(this.filtersSelector);

        this.onClick($filters[0]);

        for (const $filter of $filters) {
            $filter.addEventListener('click', () => this.onClick($filter));
        }
    }

    onClick($filter) {
        this.filter($filter.dataset.filter);

        const { activeClass } = this;

        this.$activeFilter?.classList.remove(activeClass);
        $filter.classList.add(activeClass);

        this.$activeFilter = $filter;
    }

    filter(filter) {
        const showAll = filter == 'all';
        const { hiddenClass } = this;

        for (const $menu of this.$menus) {
            const show = showAll || $menu.dataset.category == filter;
            $menu.classList.toggle(hiddenClass, !show);
        }
    }
}

let currentSlide = 0;

document.querySelector('.next').addEventListener('click', () => {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    currentSlide = (currentSlide + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
});

document.querySelector('.prev').addEventListener('click', () => {
    const slides = document.querySelector('.slides');
    const totalSlides = slides.children.length;
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
});

new CS_MenuFilter();
