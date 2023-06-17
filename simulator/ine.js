class InertialNavigationSystem {
    constructor() {
      this.position = { latitude: 0, longitude: 0 };
      this.velocity = { x: 0, y: 0, z: 0 };
      this.orientation = { pitch: 0, yaw: 0, roll: 0 };
      this.acceleration = { x: 0, y: 0, z: 0 };
      this.angularVelocity = { pitch: 0, yaw: 0, roll: 0 };
    }
  
    // Simular acelerômetro atualizando a velocidade e a posição
    updatePosition(timeDelta) {
      this.velocity.x += this.acceleration.x * timeDelta;
      this.velocity.y += this.acceleration.y * timeDelta;
      this.velocity.z += this.acceleration.z * timeDelta;
      
      // Atualizando latitude e longitude (simplificação)
      this.position.latitude += this.velocity.y * timeDelta;
      this.position.longitude += this.velocity.x * timeDelta;
    }
  
    // Simular giroscópios atualizando a orientação
    updateOrientation(timeDelta) {
      this.orientation.pitch += this.angularVelocity.pitch * timeDelta;
      this.orientation.yaw += this.angularVelocity.yaw * timeDelta;
      this.orientation.roll += this.angularVelocity.roll * timeDelta;
    }
  
    // Método para atualizar o estado do INS
    update(timeDelta) {
      this.updatePosition(timeDelta);
      this.updateOrientation(timeDelta);
    }
  
    // Métodos para configurar aceleração e velocidade angular
    setAcceleration(x, y, z) {
      this.acceleration.x = x;
      this.acceleration.y = y;
      this.acceleration.z = z;
    }
  
    setAngularVelocity(pitch, yaw, roll) {
      this.angularVelocity.pitch = pitch;
      this.angularVelocity.yaw = yaw;
      this.angularVelocity.roll = roll;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Instanciar o Sistema de Navegação Inercial
    const ins = new InertialNavigationSystem();
    
    // Selecionar elementos HTML
    const insPowerSwitch = document.getElementById('ins-power-switch');
    const positionPanel = document.createElement("div");
    const orientationPanel = document.createElement("div");
    const inertialNavigationSystemElement = document.getElementById('inertial-navigation-system');
    
    // Adicionar classes aos painéis
    positionPanel.className = "position-panel";
    orientationPanel.className = "orientation-panel";
    
    // Adicionar painéis para exibir dados
    inertialNavigationSystemElement.appendChild(positionPanel);
    inertialNavigationSystemElement.appendChild(orientationPanel);
    
    // Estado do sistema de navegação inercial
    let insPoweredOn = false;
    
    // Evento para o interruptor de alimentação
    insPowerSwitch.addEventListener('change', function() {
      insPoweredOn = this.checked;
      
      // Se o sistema está ligado, começar a atualizar os dados
      if (insPoweredOn) {
        // Loop de atualização (exemplo de 60 vezes por segundo)
        setInterval(() => {
          // Exemplo de tempo delta de 1/60 segundo
          ins.update(1 / 60);

          // Atualizando informações nos painéis
          positionPanel.innerHTML = `<strong>Position:</strong> Latitude = ${ins.position.latitude.toFixed(2)}, Longitude = ${ins.position.longitude.toFixed(2)}`;
          orientationPanel.innerHTML = `<strong>Orientation:</strong> Pitch = ${ins.orientation.pitch.toFixed(2)}, Yaw = ${ins.orientation.yaw.toFixed(2)}, Roll = ${ins.orientation.roll.toFixed(2)}`;
        }, 1000 / 60);
      } else {
        // Se o sistema está desligado, limpar os intervalos (não implementado neste exemplo)
      }
    });
});