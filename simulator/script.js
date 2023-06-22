document.addEventListener('DOMContentLoaded', function() {
    const spaceship = document.querySelector('.spaceship-frame img');
    let rotationDegrees = 0;
    let yawDegrees = 0;
    let pitchDegrees = 0;

    const rotationDisplay = document.getElementById('rotation-display');
    const yawDisplay = document.getElementById('yaw-display');
    const pitchDisplay = document.getElementById('pitch-display');

    const joystick = document.getElementById('joystick');
    const yawControl = document.getElementById('yaw-control');
    const pitchControl = document.getElementById('pitch-control');

    joystick.addEventListener('input', updateRotation);
    yawControl.addEventListener('input', updateYaw);
    pitchControl.addEventListener('input', updatePitch);

    const lockButtons = document.querySelectorAll('.lock-button');
    lockButtons.forEach(button => {
        button.addEventListener('click', toggleLock);
    });
    

    function toggleLock(event) {
        const control = document.getElementById(event.target.dataset.control);
        const light = document.getElementById(event.target.dataset.control + '-light');

        if (control.disabled) {
            control.disabled = false;
            light.classList.remove('red');
            light.classList.add('green');
            event.target.textContent = "L";

            // Se o interruptor elétrico foi ligado, habilitar os controles de rotação, guinada e inclinação
            if (event.target.id === 'electric-switch') {
                joystick.disabled = false;
                yawControl.disabled = false;
                pitchControl.disabled = false;
            }
        } else {
            control.disabled = true;
            light.classList.remove('green');
            light.classList.add('red');
            event.target.textContent = "L";

            // Se o interruptor elétrico foi desligado, desabilitar os controles de rotação, guinada e inclinação
            if (event.target.id === 'electric-switch') {
                joystick.disabled = true;
                yawControl.disabled = true;
                pitchControl.disabled = true;
            }
        }
    }


    function updateRotation(event) {
        rotationDegrees = event.target.value - 180;
        rotationDisplay.textContent = event.target.value;
        updateTransform();
    }

    function updateYaw(event) {
        yawDegrees = event.target.value - 180;
        yawDisplay.textContent = event.target.value;
        updateTransform();
        updateArtificialHorizon();
    }

    function updatePitch(event) {
        pitchDegrees = event.target.value - 180;
        pitchDisplay.textContent = event.target.value;
        updateTransform();
        updatePointerPosition(pitchDegrees);
    }
    
    function updatePointerPosition(pitchDegrees) {
        const pointer = document.getElementById('pointer');
        const maxMovement = 40;
        const movement = (pitchDegrees / 180) * maxMovement;
        pointer.style.left = `calc(50% + ${movement}px)`;
    }

    function updateTransform() {
        spaceship.style.transform = `translate(-50%, -50%) rotate(${rotationDegrees}deg) rotateY(${yawDegrees}deg) rotateX(${pitchDegrees}deg)`;
    }
    
    function updateArtificialHorizon() {
        const artificialHorizon = document.getElementById('artificial-horizon');
        artificialHorizon.style.transform = `rotateX(${pitchDegrees}deg) rotateZ(${-yawDegrees}deg)`;
    }

    document.querySelectorAll('.increment-button').forEach(button => {
        button.addEventListener('click', function(event) {
            const control = document.getElementById(event.target.dataset.control);
            if (control.value < 360 && !control.disabled) {
                control.value = parseInt(control.value, 10) + 1;
                triggerInputEvent(control);
            }
        });
    });

    document.querySelectorAll('.decrement-button').forEach(button => {
        button.addEventListener('click', function(event) {
            const control = document.getElementById(event.target.dataset.control);
            if (control.value > 0 && !control.disabled) {
                control.value = parseInt(control.value, 10) - 1;
                triggerInputEvent(control);
            }
        });
    });

    function triggerInputEvent(element) {
        const event = new Event('input');
        element.dispatchEvent(event);
    }
});
