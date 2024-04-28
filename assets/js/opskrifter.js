document.addEventListener('DOMContentLoaded', function () {
    var select = document.querySelector('.dropdown-select');
    var optionsContainer = document.querySelector('.dropdown-options');
    var options = document.querySelectorAll('.dropdown-option');

    select.addEventListener('click', function () {
        optionsContainer.classList.toggle('open');
    });

    options.forEach(option => {
        option.addEventListener('click', function () {
            select.textContent = this.textContent;
            select.setAttribute('data-value', this.getAttribute('data-value'));
            optionsContainer.classList.remove('open');
        });
    });

    document.addEventListener('click', function (e) {
        if (!select.contains(e.target)) {
            optionsContainer.classList.remove('open');
        }
    });
});