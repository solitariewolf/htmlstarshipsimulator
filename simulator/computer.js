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
          } else if (key === '<Backspace>') {
              button.classList.add('<backspace>');
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
  const maxLines = 4;

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
});
