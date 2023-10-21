class PulseButtons {
    constructor() {
        this.execute();
    }

    execute() {
        const btns = document.querySelectorAll('.pulse-btn');

        btns.forEach(btn => {
            btn.addEventListener('mousedown', function(e) {
                let div         = document.createElement('div'),
                    maxValue    = Math.max(this.clientWidth, this.clientHeight),
                    rect        = this.getBoundingClientRect(),
                    divStyle    = div.style;

                divStyle.width = divStyle.height = maxValue + 'px';
                divStyle.left = e.clientX - rect.left - (maxValue / 2) + 'px';
                divStyle.top = e.clientY - rect.top - (maxValue / 2) + 'px';

                div.classList.add('pulse');
                this.appendChild(div);

                setTimeout(() => {
                    div.remove();
                }, 800);
            });
        });
    }
}

new PulseButtons();
