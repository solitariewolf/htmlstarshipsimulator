document.addEventListener("DOMContentLoaded", function() {

    // Criação da estrutura do mini-computador
    const miniComputer = document.createElement('div');
    miniComputer.classList.add('mini-computer');
    
    const miniComputerScreen = document.createElement('div');
    miniComputerScreen.classList.add('mini-computer-screen');
    
    const computerOutput = document.createElement('pre');
    computerOutput.id = 'computer-output';
    
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    
    const numericKeyboard = document.createElement('div');
    numericKeyboard.classList.add('numeric-keyboard');

    const mainEngine1Control = document.getElementById("main-engine-1-control");  
    const mainEngine2Control = document.getElementById("main-engine-2-control");  
    const auxEngine1Control = document.getElementById("aux-engine-1-control");  
    const auxEngine2Control = document.getElementById("aux-engine-2-control");
    
    miniComputerScreen.appendChild(computerOutput);
    miniComputer.appendChild(miniComputerScreen);
    miniComputer.appendChild(keyboard);
    miniComputer.appendChild(numericKeyboard);
    // Criação das teclas
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
        ['Espaço', 'Enter', 'Backspace']
    ];
    const numericKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    keys.forEach(row => {
        const keyboardRow = document.createElement('div');
        keyboardRow.classList.add('keyboard-row');
        row.forEach(key => {
            const button = document.createElement('button');
            button.textContent = key;
            if (key === 'Espaço') {
                button.classList.add('space');
            } else if (key === 'Enter') {
                button.classList.add('enter');
            } else if (key === 'Backspace') { // Modificado aqui
                button.classList.add('backspace'); // Modificado aqui
            }
            keyboardRow.appendChild(button);
        });
        keyboard.appendChild(keyboardRow);
    });
    numericKeys.forEach(key => {
        const button = document.createElement('button');
        button.textContent = key;
        numericKeyboard.appendChild(button);
    });
    // Adicionando o mini-computador ao painel de controle de voo
    const flightControlPanel = document.getElementById('flight-control-panel');
    if (flightControlPanel) {
        flightControlPanel.appendChild(miniComputer);
    }
  // Limitar número de caracteres e linhas
  let lines = [''];
  const maxCharsPerLine = 20;
  const maxLines = 10000;
  // Função para capturar cliques nos botões e exibir no mini-computador
  const buttons = miniComputer.querySelectorAll('button');
  buttons.forEach(button => {
      button.addEventListener('click', function() {
          const character = this.textContent;
          
          if (character === 'Espaço') {
              lines[lines.length - 1] += ' ';
          } else if (character === 'Enter') {
              if (lines.length < maxLines) {
                  lines.push('');
              }
          } else if (character === 'Backspace') {
              if (lines[lines.length - 1].length > 0) {
                  lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
              } else if (lines.length > 1) {
                  lines.pop();
              }
          } else {
              if (lines[lines.length - 1].length < maxCharsPerLine) {
                  lines[lines.length - 1] += character;
              } else if (lines.length < maxLines) {
                  lines.push(character);
              }
          }
          computerOutput.textContent = lines.join('\n');
      });
  });
// Criação do painel de interruptores
const switchPanel = document.createElement('div');
switchPanel.classList.add('switch-panel');
// Criação dos interruptores
const switches = [
    'Ignição',
    'Power',
    'Motor 1',
    'Motor 2',
    'Motores Aux',
    'Elétrica',
    'Hidráulica',
    'Modo Eco',
    'Modo Turbo',
    'Modo Decolagem',
    'Modo Cruzeiro'
];
switches.forEach(switchLabel => {
    const switchContainer = document.createElement('div');
    switchContainer.classList.add('switch-container');

    const button = document.createElement('button');  // Usando um botão em vez de uma caixa de seleção
    button.textContent = switchLabel;
    button.classList.add('switch');

    switchContainer.appendChild(button);
    switchPanel.appendChild(switchContainer);
});
miniComputer.appendChild(switchPanel);
        // Acionar o interruptor de ignição
        const switchButtons = switchPanel.querySelectorAll('button');
        const ignitionSwitch = switchButtons[0]; // Pegando o primeiro botão, que deve ser o de Ignição
        const electricSwitch = switchButtons[5]; //eletrica
        const hidraulicoSwitch = switchButtons[6]; //hidráulico
        const motor1Switch = switchButtons[2]; // motor 1
        const motor2Switch = switchButtons[3]; // motor 2
        const auxMotorsSwitch = switchButtons[4]; // Motores Aux
        console.log('Interruptor de ignição:', ignitionSwitch); // Novo log

        electricSwitch.disabled = true; // Os botões começam desativados
        hidraulicoSwitch.disabled = true;
        motor1Switch.disabled = true;
        motor2Switch.disabled = true
        auxMotorsSwitch.disabled = true;

        if (ignitionSwitch) {
            ignitionSwitch.addEventListener('click', function() {
                console.log('Interruptor de ignição acionado');
                this.classList.add('active');  // Adiciona a classe 'active' ao botão
                this.disabled = true;  // Desativa o botão
                // Iniciar animação de carregamento na tela do computador
                let percentage = 0;
                const loadingInterval = setInterval(() => {
                    // Atualizar texto na tela do computador
                    computerOutput.textContent = `Carregando sistemas... ${percentage}%`;
                    console.log(`Carregando sistemas... ${percentage}%`);
                    percentage++;
                    if (percentage > 100) {
                        clearInterval(loadingInterval);
                        console.log('Carregamento completo');
                        // Adicionar a mensagem na tela do computador após o carregamento ser concluído
                        lines.push('Sistemas de ignição carregados, ligue o sistema elétrico');
                        lines.push('');  // Adicionar uma nova linha vazia
                        computerOutput.textContent = lines.join('\n');
                        setTimeout(() => {
                            computerOutput.scrollTop = computerOutput.scrollHeight;
                        }, 0);
                        electricSwitch.disabled = false; // Ativa o botão Elétrica após o carregamento dos sistemas de ignição
                        localStorage.setItem('electricSwitch', 'on'); // Armazene o estado do interruptor no localStorage
                    }
                }, 10);
            });
        }
        // Acionar o interruptor Elétrica
        if (electricSwitch) {
            electricSwitch.addEventListener('click', function() {
                console.log('Interruptor Elétrica acionado');
                this.classList.add('active');  // Adicionar a classe 'active' ao botão
                this.disabled = true;  // Desativar o botão

                // Iniciar animação de carregamento na tela do computador
                let percentage = 0;
                const loadingInterval = setInterval(() => {
                    // Atualizar texto na tela do computador
                    computerOutput.textContent = `Carregando sistemas elétricos... ${percentage}%`;
                    console.log(`Carregando sistemas elétricos... ${percentage}%`);
                    percentage++;
                    if (percentage > 100) {
                        clearInterval(loadingInterval);
                        console.log('Carregamento completo');
                        // Adicionar a mensagem na tela do computador após o carregamento ser concluído
                        lines.push('Sistemas elétricos carregados, ligue o sistema hidráulico');
                        lines.push('');  // Adicionar uma nova linha vazia
                        computerOutput.textContent = lines.join('\n');
                        computerOutput.scrollTop = computerOutput.scrollHeight;
                        setTimeout(() => {
                            computerOutput.scrollTop = computerOutput.scrollHeight;
                        }, 0);
                        hidraulicoSwitch.disabled = false; // Ativa o botão Hidráulico após o carregamento dos sistemas elétricos
                        localStorage.setItem('electricSwitch', 'on'); // Armazene o estado do interruptor no localStorage
                    }
                }, 10);
            });
        }
        // Acionar o interruptor Hidraulico
        if (hidraulicoSwitch) {
            hidraulicoSwitch.addEventListener('click', function() {
                this.classList.add('active'); // Adicionar a classe 'active' ao botão
                this.disabled = true; // Desativar o botão
        
                const joystickControl = document.getElementById("joystick");
                const yawControl = document.getElementById("yaw-control");
                const pitchControl = document.getElementById("pitch-control");
        
                // Iniciar animação de carregamento na tela do computador
                let percentage = 0;
                const loadingInterval = setInterval(() => {
                    // Atualizar texto na tela do computador
                    computerOutput.textContent = `Carregando sistemas hidraulicos... ${percentage}%`;
                    console.log(`Carregando sistemas hidraulicos... ${percentage}%`);
                    percentage++;
                    if (percentage > 100) {
                        clearInterval(loadingInterval);
                        console.log('Carregamento completo');
                        // Adicionar a mensagem na tela do computador após o carregamento ser concluído
                        lines.push('Sistemas hidraulicos carregados, ligue os motores');
                        lines.push(''); // Adicionar uma nova linha vazia
                        computerOutput.textContent = lines.join('\n');
                        setTimeout(() => {
                            computerOutput.scrollTop = computerOutput.scrollHeight;
                        }, 0);
                        joystickControl.disabled = false;
                        yawControl.disabled = false;
                        pitchControl.disabled = false;
                        mainEngine1Control.disabled = false;
                        mainEngine2Control.disabled = false;
                        auxEngine1Control.disabled = false;
                        auxEngine2Control.disabled = false;
                    }
                }, 10);
            });
        }

// Acionar o interruptor do Motor 1
if (motor1Switch) {
    motor1Switch.addEventListener('click', function() {
        console.log('Interruptor Motor 1 acionado');
        this.classList.add('active');  // Adicionar a classe 'active' ao botão
        this.disabled = true;  // Desativar o botão
        lines.push('Motor 1 acionado');
        lines.push('');  // Adicionar uma nova linha vazia
        computerOutput.textContent = lines.join('\n');
        setTimeout(() => {
            computerOutput.scrollTop = computerOutput.scrollHeight;
        }, 0);
        computerOutput.scrollTop = computerOutput.scrollHeight;
    });
}
// Acionar o interruptor do Motor 2
if (motor2Switch) {
    motor2Switch.addEventListener('click', function() {
        console.log('Interruptor Motor 2 acionado');
        this.classList.add('active');  // Adicionar a classe 'active' ao botão
        this.disabled = true;  // Desativar o botão
        lines.push('Motor 2 acionado');
        lines.push('');  // Adicionar uma nova linha vazia
        computerOutput.textContent = lines.join('\n');
        setTimeout(() => {
            computerOutput.scrollTop = computerOutput.scrollHeight;
        }, 0);
        computerOutput.scrollTop = computerOutput.scrollHeight;
    });
}
// Acionar o interruptor do Motor Aux
if (auxMotorsSwitch) {
    auxMotorsSwitch.addEventListener('click', function() {
        console.log('Interruptor Motor Auxiliar acionado');
        this.classList.add('active');  // Adicionar a classe 'active' ao botão
        this.disabled = true;  // Desativar o botão
        lines.push('Motor Auxiliar acionado');
        lines.push('');  // Adicionar uma nova linha vazia
        computerOutput.textContent = lines.join('\n');
        setTimeout(() => {
            computerOutput.scrollTop = computerOutput.scrollHeight;
        }, 0);
        computerOutput.scrollTop = computerOutput.scrollHeight;
    });
}
});

document.addEventListener("DOMContentLoaded", function() {

    const mainEngine1Control = document.getElementById("main-engine-1-control");
    const mainEngine1Display = document.getElementById("main-engine-1-display");

    const mainEngine2Control = document.getElementById("main-engine-2-control");
    const mainEngine2Display = document.getElementById("main-engine-2-display");

    const auxEngine1Control = document.getElementById("aux-engine-1-control");
    const auxEngine1Display = document.getElementById("aux-engine-1-display");

    const auxEngine2Control = document.getElementById("aux-engine-2-control");
    const auxEngine2Display = document.getElementById("aux-engine-2-display");

    const lockMainEnginesButton = document.querySelector('[data-control="main-engines"]');
    const lockAuxEnginesButton = document.querySelector('[data-control="aux-engines"]');

    const joystickControl = document.getElementById("joystick");
    const yawControl = document.getElementById("yaw-control");
    const pitchControl = document.getElementById("pitch-control");

    // Desabilitar todos os controles no início
    mainEngine1Control.disabled = true;
    mainEngine2Control.disabled = true;
    auxEngine1Control.disabled = true;
    auxEngine2Control.disabled = true;
    lockMainEnginesButton.disabled = true;
    lockAuxEnginesButton.disabled = true;
    joystickControl.disabled = true;
    yawControl.disabled = true;
    pitchControl.disabled = true;

    function updateDisplay(control, display) {
        display.textContent = `${control.value}%`;
    }

    mainEngine1Control.addEventListener("input", function() {
        updateDisplay(mainEngine1Control, mainEngine1Display);
        if (lockMainEnginesButton.classList.contains('locked')) {
            mainEngine2Control.value = mainEngine1Control.value;
            updateDisplay(mainEngine2Control, mainEngine2Display);
        }
    });

    mainEngine2Control.addEventListener("input", function() {
        updateDisplay(mainEngine2Control, mainEngine2Display);
    });

    auxEngine1Control.addEventListener("input", function() {
        updateDisplay(auxEngine1Control, auxEngine1Display);
        if (lockAuxEnginesButton.classList.contains('locked')) {
            auxEngine2Control.value = auxEngine1Control.value;
            updateDisplay(auxEngine2Control, auxEngine2Display);
        }
    });

    auxEngine2Control.addEventListener("input", function() {
        updateDisplay(auxEngine2Control, auxEngine2Display);
    });

    lockMainEnginesButton.addEventListener("click", function() {
        lockMainEnginesButton.classList.toggle('locked');
    });

    lockAuxEnginesButton.addEventListener("click", function() {
        lockAuxEnginesButton.classList.toggle('locked');
    });

});