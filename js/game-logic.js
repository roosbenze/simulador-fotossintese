// Lógica principal do jogo
class GameLogic {
    constructor() {
        this.currentTime = 22; // Hora atual (0-23) - INICIA À NOITE para forçar observação
        this.glucoseProduced = 0;
        this.maxGlucose = 3;
        this.isGameComplete = false;
        this.photosynthesisActive = false;
        this.hasSeenNightMessage = false; // Para mostrar mensagem educativa
        
        this.init();
    }
    
    init() {
        this.setupTimeControls();
        this.updateTimeDisplay();
        this.updateDayNightCycle();
        this.setupModalControls();
    }
    
    // Configurar controles de tempo
    setupTimeControls() {
        const timeSlider = document.getElementById('time-slider');
        
        timeSlider.addEventListener('input', (e) => {
            this.currentTime = parseInt(e.target.value);
            this.updateTimeDisplay();
            this.updateDayNightCycle();
            this.checkPhotosynthesisConditions();
        });
    }
    
    // Atualizar display de tempo
    updateTimeDisplay() {
        const timeDisplay = document.getElementById('time-display');
        const periodIndicator = document.getElementById('period-indicator');
        
        const hours = this.currentTime.toString().padStart(2, '0');
        timeDisplay.textContent = `${hours}:00`;
        
        if (this.isDaytime()) {
            periodIndicator.textContent = '☀️ Dia';
            periodIndicator.parentElement.classList.remove('night');
        } else {
            periodIndicator.textContent = '🌙 Noite';
            periodIndicator.parentElement.classList.add('night');
        }
    }
    
    // Verificar se é dia
    isDaytime() {
        return this.currentTime >= 6 && this.currentTime <= 18;
    }
    
    // Atualizar ciclo dia/noite
    updateDayNightCycle() {
        const gardenScene = document.getElementById('garden-scene');
        const sun = document.getElementById('sun');
        const photonWaves = document.getElementById('photon-waves');
        
        if (this.isDaytime()) {
            // FASE CLARA - Fotossíntese ativa
            gardenScene.classList.remove('night');
            gardenScene.classList.add('day');
            sun.classList.remove('night');
            this.activatePhotonWaves();
            
            // Ajustar intensidade do sol baseado na hora
            const intensity = this.getSunIntensity();
            sun.style.opacity = intensity;
            
            // Remover mensagem de noite se existir
            this.hideNightMessage();
            
        } else {
            // FASE ESCURA - Sem fotossíntese
            gardenScene.classList.add('night');
            gardenScene.classList.remove('day');
            sun.classList.add('night');
            this.deactivatePhotonWaves();
            sun.style.opacity = '0.2';
            
            // Mostrar mensagem educativa sobre a noite
            this.showNightMessage();
        }
        
        // Atualizar indicador visual da planta
        this.updatePlantState();
    }
    
    // Calcular intensidade do sol
    getSunIntensity() {
        if (!this.isDaytime()) return 0.3;
        
        // Intensidade máxima ao meio-dia (12h)
        const distanceFromNoon = Math.abs(this.currentTime - 12);
        const maxDistance = 6; // 6h de distância do meio-dia (6h ou 18h)
        
        // Intensidade varia de 0.6 (manhã/tarde) a 1.0 (meio-dia)
        return 0.6 + (0.4 * (1 - distanceFromNoon / maxDistance));
    }
    
    // Ativar ondas de fótons direcionadas
    activatePhotonWaves() {
        const photonWaves = document.getElementById('photon-waves');
        
        // Limpar ondas existentes
        photonWaves.innerHTML = '';
        
        // Criar ondas direcionadas baseadas na intensidade
        const intensity = this.getSunIntensity();
        const waveCount = Math.floor(intensity * 8);
        
        for (let i = 0; i < waveCount; i++) {
            setTimeout(() => {
                this.createDirectedPhotonWave();
            }, i * 300);
        }
        
        // Continuar criando ondas enquanto for dia
        if (this.isDaytime()) {
            setTimeout(() => {
                this.activatePhotonWaves();
            }, 2500);
        }
    }
    
    // Criar onda de fóton direcionada para a planta
    createDirectedPhotonWave() {
        const photonWaves = document.getElementById('photon-waves');
        const wave = document.createElement('div');
        wave.className = 'photon-wave-directed';
        
        // Posição inicial (do sol)
        const startX = 40; // Posição do sol
        const startY = 0;
        
        // Posição final (planta)
        const endX = 150; // Posição da planta
        const endY = 180;
        
        // Criar múltiplas partículas para formar a onda
        for (let j = 0; j < 5; j++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'photon-particle';
                particle.innerHTML = '✦';
                
                // Posição inicial com pequena variação
                particle.style.left = (startX + Math.random() * 20 - 10) + 'px';
                particle.style.top = (startY + j * 5) + 'px';
                
                photonWaves.appendChild(particle);
                
                // Animar movimento em onda para a planta
                setTimeout(() => {
                    particle.style.transition = 'all 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    particle.style.left = (endX + Math.random() * 40 - 20) + 'px';
                    particle.style.top = (endY + Math.random() * 30 - 15) + 'px';
                    particle.style.opacity = '0';
                    particle.style.transform = 'scale(0.5)';
                }, 50);
                
                // Remover após animação
                setTimeout(() => {
                    particle.remove();
                }, 2100);
            }, j * 100);
        }
    }
    
    // Desativar ondas de fótons
    deactivatePhotonWaves() {
        const photonWaves = document.getElementById('photon-waves');
        photonWaves.innerHTML = '';
    }
    
    // Mostrar mensagem educativa sobre a noite
    showNightMessage() {
        if (this.hasSeenNightMessage) return;
        
        const existingMessage = document.getElementById('night-message');
        if (existingMessage) return;
        
        const message = document.createElement('div');
        message.id = 'night-message';
        message.className = 'educational-message night-message';
        message.innerHTML = `
            <div class="message-content">
                <h3>🌙 FASE ESCURA (NOITE)</h3>
                <p><strong>A fotossíntese não acontece à noite!</strong></p>
                <p>As plantas precisam da luz do sol para produzir seu alimento.</p>
                <p>💡 <em>Ajuste o relógio para o período do dia (6h às 18h)</em></p>
                <button onclick="this.parentElement.parentElement.remove()" class="close-message">Entendi! ✓</button>
            </div>
        `;
        
        document.body.appendChild(message);
        this.hasSeenNightMessage = true;
    }
    
    // Esconder mensagem da noite
    hideNightMessage() {
        const message = document.getElementById('night-message');
        if (message) {
            message.remove();
        }
    }
    
    // Atualizar estado visual da planta
    updatePlantState() {
        const plant = document.querySelector('.plant-container');
        const leaves = document.querySelectorAll('.leaf');
        
        if (this.isDaytime()) {
            // Planta ativa durante o dia
            plant.classList.remove('sleeping');
            plant.classList.add('active');
            leaves.forEach(leaf => {
                leaf.style.filter = 'brightness(1.1) saturate(1.2)';
            });
        } else {
            // Planta "dormindo" à noite
            plant.classList.add('sleeping');
            plant.classList.remove('active');
            leaves.forEach(leaf => {
                leaf.style.filter = 'brightness(0.7) saturate(0.8)';
            });
        }
    }
    
    // Verificar condições para fotossíntese
    checkPhotosynthesisConditions() {
        const hasWater = window.moleculeManager && window.moleculeManager.waterCollected > 0;
        const hasCO2 = window.moleculeManager && window.moleculeManager.co2Collected > 0;
        const hasSunlight = this.isDaytime();
        
        const photosynthesisZone = document.getElementById('photosynthesis-zone');
        
        if (hasWater && hasCO2 && hasSunlight) {
            photosynthesisZone.classList.add('active');
            this.photosynthesisActive = true;
            
            // Trigger automático da fotossíntese se todas as condições estão atendidas
            if (window.moleculeManager) {
                window.moleculeManager.checkPhotosynthesisConditions();
            }
        } else {
            photosynthesisZone.classList.remove('active');
            this.photosynthesisActive = false;
        }
    }
    
    // Processar fotossíntese
    processPhotosynthesis() {
        if (this.glucoseProduced < this.maxGlucose) {
            this.glucoseProduced++;
            this.updateGlucoseDisplay();
            this.createGlucoseFruit();
            
            // Verificar vitória
            if (this.glucoseProduced >= this.maxGlucose) {
                setTimeout(() => {
                    this.showVictoryModal();
                }, 1000);
            }
        }
    }
    
    // Atualizar display de glicose
    updateGlucoseDisplay() {
        document.getElementById('glucose-count').textContent = `${this.glucoseProduced}/${this.maxGlucose}`;
    }
    
    // Criar fruto de glicose
    createGlucoseFruit() {
        const fruitSlot = document.getElementById(`fruit-${this.glucoseProduced}`);
        if (fruitSlot) {
            fruitSlot.classList.add('filled');
            
            // Animação de crescimento
            fruitSlot.style.transform = 'scale(0)';
            setTimeout(() => {
                fruitSlot.style.transition = 'transform 0.5s ease-out';
                fruitSlot.style.transform = 'scale(1)';
            }, 100);
        }
    }
    
    // Configurar controles do modal
    setupModalControls() {
        const modal = document.getElementById('victory-modal');
        const restartBtn = document.getElementById('restart-btn');
        const closeBtn = document.getElementById('close-modal');
        
        restartBtn.addEventListener('click', () => {
            this.restartGame();
            modal.classList.remove('show');
        });
        
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });
        
        // Fechar modal clicando fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    // Mostrar modal de vitória
    showVictoryModal() {
        const modal = document.getElementById('victory-modal');
        modal.classList.add('show');
        this.isGameComplete = true;
        
        // Adicionar efeito de celebração
        this.createCelebrationEffect();
    }
    
    // Criar efeito de celebração
    createCelebrationEffect() {
        const gardenScene = document.getElementById('garden-scene');
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.innerHTML = ['🎉', '✨', '🌟', '🎊'][Math.floor(Math.random() * 4)];
                confetti.style.position = 'absolute';
                confetti.style.fontSize = '24px';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '0px';
                confetti.style.zIndex = '1500';
                confetti.style.animation = 'confetti-fall 3s ease-out forwards';
                
                gardenScene.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 100);
        }
    }
    
    // Reiniciar jogo
    restartGame() {
        this.glucoseProduced = 0;
        this.isGameComplete = false;
        this.photosynthesisActive = false;
        this.currentTime = 22; // SEMPRE REINICIA À NOITE
        this.hasSeenNightMessage = false; // Reset da mensagem educativa
        
        // Resetar displays
        this.updateGlucoseDisplay();
        this.updateTimeDisplay();
        this.updateDayNightCycle();
        
        // Resetar slider
        document.getElementById('time-slider').value = 22;
        
        // Resetar frutos
        for (let i = 1; i <= this.maxGlucose; i++) {
            const fruitSlot = document.getElementById(`fruit-${i}`);
            if (fruitSlot) {
                fruitSlot.classList.remove('filled');
                fruitSlot.style.transform = '';
                fruitSlot.style.transition = '';
            }
        }
        
        // Resetar moléculas
        if (window.moleculeManager) {
            window.moleculeManager.reset();
        }
        
        // Limpar efeitos visuais
        document.querySelectorAll('.water-animation, .oxygen-bubble').forEach(el => el.remove());
        
        // Resetar zona de fotossíntese
        document.getElementById('photosynthesis-zone').classList.remove('active');
        
        // Remover mensagens educativas
        this.hideNightMessage();
    }
    
    // Obter estatísticas do jogo
    getGameStats() {
        return {
            currentTime: this.currentTime,
            glucoseProduced: this.glucoseProduced,
            isComplete: this.isGameComplete,
            isDaytime: this.isDaytime(),
            photosynthesisActive: this.photosynthesisActive,
            waterCollected: window.moleculeManager ? window.moleculeManager.waterCollected : 0,
            co2Collected: window.moleculeManager ? window.moleculeManager.co2Collected : 0
        };
    }
}

// Adicionar estilos CSS para animação de confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(500px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .drop-zone-highlight {
        background-color: rgba(255, 215, 0, 0.4) !important;
        border-color: #FFD700 !important;
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.6) !important;
        animation: zone-pulse 1s ease-in-out infinite alternate;
    }
    
    @keyframes zone-pulse {
        0% { transform: scale(1); }
        100% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);

// Exportar para uso global
window.GameLogic = GameLogic;

