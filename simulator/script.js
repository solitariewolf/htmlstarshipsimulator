document.addEventListener('DOMContentLoaded', function() {
    // elementos iniciais
    const spaceship = document.querySelector('.spaceship-frame img');
    let rotationDegrees = 0;
    let yawDegrees = 0;
    let pitchDegrees = 0;

    //  listeners de eventos para o joystick e controles de guinada/inclinação
    document.getElementById('joystick').addEventListener('input', function(event) {
        rotationDegrees = event.target.value - 180;
        updateTransform();
    });

    document.getElementById('yaw-control').addEventListener('input', function(event) {
        yawDegrees = event.target.value - 180;
        updateTransform();
    });

    document.getElementById('pitch-control').addEventListener('input', function(event) {
        pitchDegrees = event.target.value - 180;
        updateTransform();
    });

    // delay
    function updateTransform() {
        spaceship.style.transform = `translate(-50%, -50%) rotate(${rotationDegrees}deg) rotateY(${yawDegrees}deg) rotateX(${pitchDegrees}deg)`;
    }
});
// display multifuncional
document.addEventListener('DOMContentLoaded', function() {
    const spaceship = document.querySelector('.spaceship-frame img');
    let rotationDegrees = 0;
    let yawDegrees = 0;
    let pitchDegrees = 0;

    const rotationDisplay = document.getElementById('rotation-display');
    const yawDisplay = document.getElementById('yaw-display');
    const pitchDisplay = document.getElementById('pitch-display');
    
    document.getElementById('joystick').addEventListener('input', function(event) {
        rotationDegrees = event.target.value - 180;
        rotationDisplay.textContent = event.target.value;
        updateTransform();
    });

    document.getElementById('yaw-control').addEventListener('input', function(event) {
        yawDegrees = event.target.value - 180;
        yawDisplay.textContent = event.target.value;
        updateTransform();
    });

    document.getElementById('pitch-control').addEventListener('input', function(event) {
        pitchDegrees = event.target.value - 180;
        pitchDisplay.textContent = event.target.value;
        updateTransform();
    });

    function updateTransform() {
        spaceship.style.transform = `translate(-50%, -50%) rotate(${rotationDegrees}deg) rotateY(${yawDegrees}deg) rotateX(${pitchDegrees}deg)`;
    }
});

