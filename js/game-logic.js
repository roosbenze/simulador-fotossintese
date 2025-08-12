/**
 * Lógica Principal do Jogo
 * Coordena todos os sistemas e gerencia o ciclo dia/noite
 */

class GameLogic {
    constructor() {
        this.currentTime = 22; // Inicia à noite (22:00)
        this.isDay = false;
        this.gameStarted = false;
        this.gameComplete = false;
        
        this.timeSlider = document.getElementById('time-slider');
        this.timeDisplay = document.getElementById('time-display');
        this.dayNightIndicator = document.getElementById('day-night-indicator');
        this.restartBtn = document.getElementById('restart-btn');
        this.mainScene = document.getElementById('main-scene');
        
        this.systems = {};
        
        this.init();
    }

    init() {
        this.setupTimeControls();
        this.setupEventListeners();
        this.initializeSystems();
        this.updateTimeDisplay();
        this.updateDayNightCycle();
        this.showNightMessage();
    }

    setupTimeControls() {
        // Configurar slider de tempo
        this.timeSlider.value = this.currentTime;
        this.timeSlider.addEventListener('input', (e) => {
            this.currentTime = parseInt(e.target.value);
            this.updateTimeDisplay();
            this.updateDayNightCycle();
        });
    }

    setupEventListeners() {
        // Botão de reiniciar
        this.restartBtn.addEventListener('click', () => {
            this.restartGame();
        });

        // Eventos dos sistemas
        document.addEventListener('glucoseProduced', () => {
            this.handleGlucoseProduced();
        });

        document.addEventListener('waterDelivered', () => {
            this.handleWaterDelivered();
        });

        document.addEventListener('co2Delivered', () => {
            this.handleCO2Delivered();
        });

        // Eventos de teclado para acessibilidade
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    initializeSystems() {
        // Inicializar sistemas do jogo
        this.systems.vascular = new VascularSystem();
        this.systems.photosynthesis = new PhotosynthesisSystem();
        this.systems.molecules = new MoleculeSystem();
        
        // Tornar sistemas disponíveis globalmente
        window.vascularSystem = this.systems.vascular;
        window.photosynthesisSystem = this.systems.photosynthesis;
        window.moleculeSystem = this.systems.molecules;
    }

    updateTimeDisplay() {
        const hours = this.currentTime.toString().padStart(2, '0');
        this.timeDisplay.textContent = `${hours}:00`;
    }

    updateDayNightCycle() {
        const wasDay = this.isDay;
        this.isDay = this.currentTime >= 6 && this.currentTime <= 18;
        
        // Atualizar indicador visual
        if (this.isDay) {
            this.dayNightIndicator.textContent = '☀️ Dia';
            this.dayNightIndicator.className = 'day';
        } else {
            this.dayNightIndicator.textContent = '🌙 Noite';
            this.dayNightIndicator.className = 'night';
        }
        
        // Atualizar cenário
        this.updateSceneAppearance();
        
        // Notificar sistema de fotossíntese sobre mudança na luz solar
        if (wasDay !== this.isDay) {
            document.dispatchEvent(new CustomEvent('sunlightChanged', {
                detail: { hasSunlight: this.isDay }
            }));
            
            if (!this.isDay && !this.gameStarted) {
                this.showNightMessage();
            }
        }
    }

    updateSceneAppearance() {
        const skyLayer = document.querySelector('.sky-layer');
        const sun = document.getElementById('sun');
        const plantContainer = document.getElementById('plant-container');
        
        if (this.isDay) {
            // Aparência diurna
            skyLayer.classList.remove('night');
            sun.classList.remove('night');
            plantContainer.classList.remove('night');
            
            // Ativar raios solares
            this.activateSolarRays();
        } else {
            // Aparência noturna
            skyLayer.classList.add('night');
            sun.classList.add('night');
            plantContainer.classList.add('night');
            
            // Desativar raios solares
            this.deactivateSolarRays();
        }
    }

    activateSolarRays() {
        const solarRaysContainer = document.getElementById('solar-rays');
        
        // Limpar raios existentes
        solarRaysContainer.innerHTML = '';
        
        // Criar raios direcionados continuamente
        this.solarRayInterval = setInterval(() => {
            if (this.isDay) {
                this.createPhotonRay();
            }
        }, 300 + Math.random() * 400);
    }

    createPhotonRay() {
        const solarRaysContainer = document.getElementById('solar-rays');
        const photon = document.createElement('div');
        photon.className = 'photon-particle';
        
        // Posição inicial aleatória próxima ao sol
        photon.style.left = Math.random() * 80 + 'px';
        photon.style.top = Math.random() * 40 + 'px';
        
        solarRaysContainer.appendChild(photon);
        
        // Remover após animação
        setTimeout(() => {
            if (photon.parentNode) {
                photon.parentNode.removeChild(photon);
            }
        }, 3000);
    }

    deactivateSolarRays() {
        if (this.solarRayInterval) {
            clearInterval(this.solarRayInterval);
            this.solarRayInterval = null;
        }
        
        // Limpar raios existentes
        const solarRaysContainer = document.getElementById('solar-rays');
        solarRaysContainer.innerHTML = '';
    }

    showNightMessage() {
        // Mostrar mensagem educativa sobre a noite
        const modal = this.createModal(
            '🌙 Fase Escura da Fotossíntese',
            'Durante a noite, as plantas não fazem fotossíntese porque não há luz solar. Ajuste o horário para o período diurno (6h às 18h) para que a fotossíntese possa acontecer!',
            'Entendi!'
        );
        
        modal.classList.add('night-modal');
        document.body.appendChild(modal);
    }

    createModal(title, message, buttonText) {
        const modal = document.createElement('div');
        modal.className = 'game-modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.background = 'rgba(0, 0, 0, 0.7)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = '2000';
        
        const content = document.createElement('div');
        content.style.background = 'white';
        content.style.padding = '2rem';
        content.style.borderRadius = '15px';
        content.style.maxWidth = '500px';
        content.style.textAlign = 'center';
        content.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.3)';
        
        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        titleElement.style.color = '#2E7D32';
        titleElement.style.marginBottom = '1rem';
        
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.style.fontSize = '1.1rem';
        messageElement.style.lineHeight = '1.6';
        messageElement.style.marginBottom = '2rem';
        messageElement.style.color = '#555';
        
        const button = document.createElement('button');
        button.textContent = buttonText;
        button.style.background = '#4CAF50';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.padding = '1rem 2rem';
        button.style.borderRadius = '25px';
        button.style.fontSize = '1rem';
        button.style.fontWeight = 'bold';
        button.style.cursor = 'pointer';
        
        button.addEventListener('click', () => {
            modal.remove();
        });
        
        content.appendChild(titleElement);
        content.appendChild(messageElement);
        content.appendChild(button);
        modal.appendChild(content);
        
        return modal;
    }

    handleGlucoseProduced() {
        // Iniciar transporte de glicose no sistema vascular
        if (this.systems.vascular) {
            this.systems.vascular.startGlucoseTransport();
        }
        
        // Verificar se o jogo foi completado
        this.checkGameCompletion();
    }

    handleWaterDelivered() {
        // Água foi entregue às folhas
        console.log('Água entregue às folhas');
    }

    handleCO2Delivered() {
        // CO₂ foi entregue às folhas
        console.log('CO₂ entregue às folhas');
    }

    checkGameCompletion() {
        const filledFruits = document.querySelectorAll('.fruit.filled').length;
        
        if (filledFruits >= 3 && !this.gameComplete) {
            this.gameComplete = true;
            setTimeout(() => {
                this.showCompletionMessage();
            }, 2000);
        }
    }

    showCompletionMessage() {
        const modal = this.createModal(
            '🎉 Parabéns! Fotossíntese Completa!',
            'Você conseguiu! A planta produziu glicose suficiente para encher todos os frutos. Agora você entende como as plantas fazem seu próprio alimento usando água, gás carbônico e luz solar!',
            'Jogar Novamente'
        );
        
        modal.classList.add('completion-modal');
        
        // Adicionar efeitos de celebração
        this.createCelebrationEffects();
        
        // Modificar botão para reiniciar
        const button = modal.querySelector('button');
        button.addEventListener('click', () => {
            modal.remove();
            this.restartGame();
        });
        
        document.body.appendChild(modal);
    }

    createCelebrationEffects() {
        // Criar confetes
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createConfetti();
            }, i * 100);
        }
        
        // Efeito de brilho nas frutas
        const fruits = document.querySelectorAll('.fruit.filled');
        fruits.forEach((fruit, index) => {
            setTimeout(() => {
                fruit.style.animation = 'celebration-glow 2s ease-in-out infinite';
            }, index * 200);
        });
    }

    createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.background = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)];
        confetti.style.zIndex = '3000';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        confetti.animate([
            {
                transform: 'translateY(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
                opacity: 0
            }
        ], {
            duration: 3000 + Math.random() * 2000,
            easing: 'ease-out'
        }).onfinish = () => {
            confetti.remove();
        };
    }

    handleKeyboard(e) {
        switch (e.key) {
            case 'ArrowLeft':
                // Diminuir tempo
                this.currentTime = Math.max(0, this.currentTime - 1);
                this.timeSlider.value = this.currentTime;
                this.updateTimeDisplay();
                this.updateDayNightCycle();
                e.preventDefault();
                break;
                
            case 'ArrowRight':
                // Aumentar tempo
                this.currentTime = Math.min(23, this.currentTime + 1);
                this.timeSlider.value = this.currentTime;
                this.updateTimeDisplay();
                this.updateDayNightCycle();
                e.preventDefault();
                break;
                
            case 'r':
            case 'R':
                // Reiniciar jogo
                this.restartGame();
                e.preventDefault();
                break;
                
            case 'Escape':
                // Fechar modais
                const modals = document.querySelectorAll('.game-modal');
                modals.forEach(modal => modal.remove());
                e.preventDefault();
                break;
        }
    }

    restartGame() {
        // Resetar estado do jogo
        this.currentTime = 22;
        this.isDay = false;
        this.gameStarted = false;
        this.gameComplete = false;
        
        // Atualizar controles
        this.timeSlider.value = this.currentTime;
        this.updateTimeDisplay();
        this.updateDayNightCycle();
        
        // Resetar todos os sistemas
        Object.values(this.systems).forEach(system => {
            if (system.reset) {
                system.reset();
            }
        });
        
        // Limpar efeitos visuais
        this.clearVisualEffects();
        
        // Mostrar mensagem da noite novamente
        setTimeout(() => {
            this.showNightMessage();
        }, 500);
    }

    clearVisualEffects() {
        // Remover modais
        const modals = document.querySelectorAll('.game-modal');
        modals.forEach(modal => modal.remove());
        
        // Remover confetes
        const confetti = document.querySelectorAll('[style*="confetti"]');
        confetti.forEach(c => c.remove());
        
        // Resetar animações das frutas
        const fruits = document.querySelectorAll('.fruit');
        fruits.forEach(fruit => {
            fruit.style.animation = '';
        });
        
        // Limpar partículas
        const particles = document.querySelectorAll('.oxygen-bubble, .glucose-particle-effect, .transport-particle');
        particles.forEach(particle => particle.remove());
    }

    // Métodos de utilidade
    getCurrentTime() {
        return this.currentTime;
    }

    isCurrentlyDay() {
        return this.isDay;
    }

    getGameStats() {
        return {
            currentTime: this.currentTime,
            isDay: this.isDay,
            gameStarted: this.gameStarted,
            gameComplete: this.gameComplete,
            vascularStats: this.systems.vascular ? this.systems.vascular.getStats() : null,
            photosynthesisStats: this.systems.photosynthesis ? this.systems.photosynthesis.getStats() : null
        };
    }

    // Método para desenvolvedores (debug)
    debug() {
        console.log('Game Stats:', this.getGameStats());
    }
}

// Adicionar estilos CSS para as animações
const gameStyles = `
.night-modal .game-modal > div {
    background: linear-gradient(135deg, #1a1a2e, #16213e) !important;
    color: white !important;
}

.night-modal h2 {
    color: #FFD700 !important;
}

.completion-modal .game-modal > div {
    background: linear-gradient(135deg, #4CAF50, #45a049) !important;
    color: white !important;
}

.completion-modal h2 {
    color: #FFD700 !important;
}

@keyframes celebration-glow {
    0%, 100% { 
        transform: scale(1);
        filter: brightness(1) drop-shadow(0 0 5px rgba(255, 215, 0, 0.5));
    }
    50% { 
        transform: scale(1.1);
        filter: brightness(1.3) drop-shadow(0 0 15px rgba(255, 215, 0, 0.8));
    }
}

.plant-container.night {
    filter: brightness(0.6) saturate(0.7);
}

.plant-container.night .leaf {
    animation: none !important;
    filter: brightness(0.8) saturate(0.8) !important;
}

/* Responsividade para modais */
@media (max-width: 768px) {
    .game-modal > div {
        margin: 1rem;
        padding: 1.5rem;
    }
    
    .game-modal h2 {
        font-size: 1.5rem;
    }
    
    .game-modal p {
        font-size: 1rem;
    }
}
`;

// Adicionar estilos ao documento
if (!document.getElementById('game-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'game-styles';
    styleSheet.textContent = gameStyles;
    document.head.appendChild(styleSheet);
}

// Exportar classe para uso global
window.GameLogic = GameLogic;

