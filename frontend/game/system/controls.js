

class Controls {
    constructor() {
        this.move_key_pressed = {
            'ArrowRight': false,
            'ArrowLeft': false,
            'ArrowUp': false,
            'ArrowDown': false,
        };

        this.mouse = null;

        document.addEventListener('keydown', (event) => {
            if (
                (event.key === 'ArrowLeft') ||
                (event.key === 'ArrowRight') ||
                (event.key === 'ArrowDown') ||
                (event.key === 'ArrowUp')
                )
            {
                this.move_key_pressed[event.key] = true;
            }
        });

        document.addEventListener('keyup', (event) => {
            if (
                (event.key === 'ArrowLeft') ||
                (event.key === 'ArrowRight') ||
                (event.key === 'ArrowDown') ||
                (event.key === 'ArrowUp')
                )
            {
                this.move_key_pressed[event.key] = false;
            }
        });
    }

    set_mouse(mouse) {
        this.mouse = mouse;
    }
};

export default (new Controls);