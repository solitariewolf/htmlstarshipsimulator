document.addEventListener("DOMContentLoaded", function() {

    const systems = ['les', 'rsls', 'tal', 'rtls', 'alps'];

    systems.forEach(system => {
        const switch1 = document.getElementById(`${system}-switch-1`);
        const switch2 = document.getElementById(`${system}-switch-2`);
        const indicator = document.getElementById(`${system}-indicator`);

        let switch1Active = false;
        let switch2Active = false;

        switch1.addEventListener("click", function() {
            switch1Active = !switch1Active;
            switch1.classList.toggle("active", switch1Active);
            updateIndicator();
        });

        switch2.addEventListener("click", function() {
            switch2Active = !switch2Active;
            switch2.classList.toggle("active", switch2Active);
            updateIndicator();
        });

        function updateIndicator() {
            if (switch1Active && switch2Active) {
                indicator.classList.add("active");
            } else {
                indicator.classList.remove("active");
            }
        }
    });

});
