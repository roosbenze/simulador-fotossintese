// Arquivo principal - Inicialização e coordenação do jogo
class PhotosynthesisGame {
    constructor() {
        this.isInitialized = false;
        this.gameLogic = null;
        this.moleculeManager = null;
        this.animationManager = null;
        
        this.init();
    }
    
    init() {
        // Aguardar carregamento completo do DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeGame();
            });
        } else {
            this.initializeGame();
        }
    }
    
    initializeGame() {
        try {
            console.log('🌱 Inicializando Simulador de Fotossíntese...');
            
            // Inicializar sistemas principais
            this.gameLogic = new GameLogic();
            this.moleculeManager = new MoleculeManager();
            this.animationManager = new AnimationManager();
            
            // Tornar disponível globalmente para comunicação entre classes
            window.gameLogic = this.gameLogic;
            window.moleculeManager = this.moleculeManager;
            window.animationManager = this.animationManager;
            
            // Configurar comunicação entre sistemas
            this.setupSystemCommunication();
            
            // Configurar controles de acessibilidade
            this.setupAccessibility();
            
            // Configurar eventos de janela
            this.setupWindowEvents();
            
            // Mostrar instruções iniciais
            this.showInitialInstructions();
            
            this.isInitialized = true;
            console.log('✅ Simulador inicializado com sucesso!');
            
            // Log das estatísticas iniciais
            this.logGameStats();
            
        } catch (error) {
            console.error('❌ Erro ao inicializar o simulador:', error);
            this.showErrorMessage('Erro ao carregar o jogo. Tente recarregar a página.');
        }
    }
    
    // Configurar comunicação entre sistemas
    setupSystemCommunication() {
        // Sobrescrever método de fotossíntese para incluir animações
        const originalProcessPhotosynthesis = this.gameLogic.processPhotosynthesis.bind(this.gameLogic);
        this.gameLogic.processPhotosynthesis = () => {
            // Executar lógica original
            originalProcessPhotosynthesis();
            
            // Adicionar animações
            this.animationManager.animatePhotosynthesis();
            
            // Animar crescimento do fruto se foi produzido
            const currentGlucose = this.gameLogic.glucoseProduced;
            if (currentGlucose > 0) {
                const fruitSlot = document.getElementById(`fruit-${currentGlucose}`);
                if (fruitSlot && !fruitSlot.classList.contains('filled')) {
                    setTimeout(() => {
                        this.animationManager.animateFruitGrowth(fruitSlot);
                    }, 500);
                }
            }
        };
        
        // Sobrescrever método de transição dia/noite para incluir animações
        const originalUpdateDayNight = this.gameLogic.updateDayNightCycle.bind(this.gameLogic);
        this.gameLogic.updateDayNightCycle = () => {
            const wasDaytime = this.gameLogic.isDaytime();
            originalUpdateDayNight();
            const isDaytime = this.gameLogic.isDaytime();
            
            // Animar transição se mudou
            if (wasDaytime !== isDaytime) {
                this.animationManager.animateDayNightTransition(isDaytime);
            }
        };
    }
    
    // Configurar recursos de acessibilidade
    setupAccessibility() {
        // Adicionar suporte para navegação por teclado
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    // Diminuir tempo
                    if (this.gameLogic.currentTime > 0) {
                        this.gameLogic.currentTime--;
                        this.updateTimeSlider();
                    }
                    e.preventDefault();
                    break;
                    
                case 'ArrowRight':
                    // Aumentar tempo
                    if (this.gameLogic.currentTime < 23) {
                        this.gameLogic.currentTime++;
                        this.updateTimeSlider();
                    }
                    e.preventDefault();
                    break;
                    
                case 'r':
                case 'R':
                    // Reiniciar jogo
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.gameLogic.restartGame();
                    }
                    break;
                    
                case 'h':
                case 'H':
                    // Mostrar ajuda
                    this.showHelpModal();
                    e.preventDefault();
                    break;
                    
                case 'Escape':
                    // Fechar modais
                    document.querySelectorAll('.modal.show').forEach(modal => {
                        modal.classList.remove('show');
                    });
                    break;
            }
        });
        
        // Adicionar atributos ARIA
        this.setupARIALabels();
        
        // Configurar anúncios para leitores de tela
        this.setupScreenReaderAnnouncements();
    }
    
    // Configurar labels ARIA
    setupARIALabels() {
        const timeSlider = document.getElementById('time-slider');
        timeSlider.setAttribute('aria-label', 'Controle de horário do dia');
        timeSlider.setAttribute('aria-describedby', 'time-description');
        
        // Adicionar descrição do controle de tempo
        const timeDescription = document.createElement('div');
        timeDescription.id = 'time-description';
        timeDescription.className = 'sr-only';
        timeDescription.textContent = 'Use as setas do teclado ou arraste para alterar o horário. A fotossíntese só ocorre durante o dia (6h às 18h).';
        timeSlider.parentNode.appendChild(timeDescription);
        
        // Labels para zonas de drop
        const waterZone = document.getElementById('water-zone');
        waterZone.setAttribute('aria-label', 'Zona de absorção de água pelas raízes');
        
        const photosynthesisZone = document.getElementById('photosynthesis-zone');
        photosynthesisZone.setAttribute('aria-label', 'Zona de fotossíntese nas folhas');
        
        // Labels para moléculas
        document.querySelectorAll('.molecule').forEach((molecule, index) => {
            const type = molecule.getAttribute('data-type');
            const label = type === 'water' ? 'Molécula de água (H₂O)' : 'Molécula de gás carbônico (CO₂)';
            molecule.setAttribute('aria-label', `${label} ${index + 1}`);
            molecule.setAttribute('tabindex', '0');
        });
    }
    
    // Configurar anúncios para leitores de tela
    setupScreenReaderAnnouncements() {
        // Criar elemento para anúncios
        const announcer = document.createElement('div');
        announcer.id = 'screen-reader-announcements';
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        document.body.appendChild(announcer);
        
        // Função para fazer anúncios
        window.announceToScreenReader = (message) => {
            announcer.textContent = message;
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        };
    }
    
    // Atualizar slider de tempo
    updateTimeSlider() {
        const timeSlider = document.getElementById('time-slider');
        timeSlider.value = this.gameLogic.currentTime;
        this.gameLogic.updateTimeDisplay();
        this.gameLogic.updateDayNightCycle();
        this.gameLogic.checkPhotosynthesisConditions();
    }
    
    // Configurar eventos de janela
    setupWindowEvents() {
        // Pausar animações quando a janela não está visível
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseGame();
            } else {
                this.resumeGame();
            }
        });
        
        // Redimensionamento responsivo
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Prevenir zoom acidental em dispositivos móveis
        document.addEventListener('touchstart', (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    // Mostrar instruções iniciais
    showInitialInstructions() {
        // Verificar se é a primeira visita
        const hasVisited = localStorage.getItem('photosynthesis-game-visited');
        
        if (!hasVisited) {
            setTimeout(() => {
                this.showWelcomeModal();
                localStorage.setItem('photosynthesis-game-visited', 'true');
            }, 1000);
        }
    }
    
    // Mostrar modal de boas-vindas
    showWelcomeModal() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>🌱 Bem-vindo ao Simulador de Fotossíntese!</h2>
                <p>Você vai aprender como as plantas produzem seu próprio alimento usando:</p>
                <ul style="text-align: left; margin: 1rem 0;">
                    <li>💧 <strong>Água (H₂O)</strong> - absorvida pelas raízes</li>
                    <li>💨 <strong>Gás Carbônico (CO₂)</strong> - capturado pelas folhas</li>
                    <li>☀️ <strong>Luz Solar</strong> - energia para a reação</li>
                </ul>
                <p><strong>Equação da Fotossíntese:</strong></p>
                <div style="background: rgba(76, 175, 80, 0.1); padding: 1rem; border-radius: 10px; margin: 1rem 0;">
                    6CO₂ + 6H₂O + ☀️ → C₆H₁₂O₆ + 6O₂
                </div>
                <p><small>Use as setas do teclado para controlar o tempo ou pressione 'H' para ajuda.</small></p>
                <button id="start-game" class="btn-primary">Começar a Jogar! 🚀</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('start-game').addEventListener('click', () => {
            modal.remove();
            window.announceToScreenReader('Jogo iniciado! Arraste as moléculas de água para as raízes e as de CO₂ para as folhas.');
        });
    }
    
    // Mostrar modal de ajuda
    showHelpModal() {
        const modal = document.createElement('div');
        modal.className = 'modal show';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>🆘 Ajuda - Como Jogar</h2>
                <div style="text-align: left;">
                    <h3>🎯 Objetivo:</h3>
                    <p>Formar 3 frutos de glicose completando o processo de fotossíntese.</p>
                    
                    <h3>🎮 Controles:</h3>
                    <ul>
                        <li><strong>Mouse/Touch:</strong> Arraste as moléculas</li>
                        <li><strong>Setas ←→:</strong> Controlar horário</li>
                        <li><strong>H:</strong> Mostrar esta ajuda</li>
                        <li><strong>Ctrl+R:</strong> Reiniciar jogo</li>
                        <li><strong>Esc:</strong> Fechar modais</li>
                    </ul>
                    
                    <h3>📚 Processo:</h3>
                    <ol>
                        <li>Arraste 💧 água para as raízes</li>
                        <li>Arraste 💨 CO₂ para as folhas</li>
                        <li>Ajuste para horário de sol (6h-18h)</li>
                        <li>Observe a fotossíntese acontecer!</li>
                    </ol>
                    
                    <h3>🔬 Você vai aprender:</h3>
                    <ul>
                        <li>Como as plantas fazem comida</li>
                        <li>Importância do sol para a vida</li>
                        <li>Como o oxigênio é produzido</li>
                        <li>Ciclo dia e noite</li>
                    </ul>
                </div>
                <button id="close-help" class="btn-primary">Entendi! 👍</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('close-help').addEventListener('click', () => {
            modal.remove();
        });
        
        // Fechar com clique fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Pausar jogo
    pauseGame() {
        if (this.animationManager) {
            // Pausar animações não essenciais
            document.querySelectorAll('.photon-wave').forEach(wave => {
                wave.style.animationPlayState = 'paused';
            });
        }
    }
    
    // Retomar jogo
    resumeGame() {
        if (this.animationManager) {
            // Retomar animações
            document.querySelectorAll('.photon-wave').forEach(wave => {
                wave.style.animationPlayState = 'running';
            });
        }
    }
    
    // Lidar com redimensionamento
    handleResize() {
        // Reajustar elementos se necessário
        const gameArea = document.querySelector('.game-area');
        const infoPanel = document.querySelector('.info-panel');
        
        if (window.innerWidth <= 768) {
            gameArea.style.gridTemplateColumns = '1fr';
            gameArea.style.gridTemplateRows = '1fr auto';
        } else {
            gameArea.style.gridTemplateColumns = '1fr 300px';
            gameArea.style.gridTemplateRows = 'auto';
        }
    }
    
    // Mostrar mensagem de erro
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff4444;
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 2000;
            font-weight: bold;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    // Log das estatísticas do jogo
    logGameStats() {
        if (this.gameLogic) {
            const stats = this.gameLogic.getGameStats();
            console.log('📊 Estatísticas do Jogo:', stats);
        }
    }
    
    // Método público para obter estado do jogo
    getGameState() {
        return {
            initialized: this.isInitialized,
            stats: this.gameLogic ? this.gameLogic.getGameStats() : null,
            version: '1.0.0'
        };
    }
}

// Adicionar estilos para acessibilidade
const accessibilityStyles = document.createElement('style');
accessibilityStyles.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    .molecule:focus {
        outline: 3px solid #4CAF50;
        outline-offset: 2px;
    }
    
    .time-slider:focus {
        outline: 3px solid #4CAF50;
        outline-offset: 2px;
    }
    
    button:focus {
        outline: 3px solid #4CAF50;
        outline-offset: 2px;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    @media (prefers-high-contrast: high) {
        .molecule {
            border: 2px solid currentColor;
        }
        
        .photosynthesis-zone, .water-absorption-zone {
            border-width: 3px;
        }
    }
`;
document.head.appendChild(accessibilityStyles);

// Inicializar o jogo
const game = new PhotosynthesisGame();

// Tornar disponível globalmente para debug
window.photosynthesisGame = game;

// Log de inicialização
console.log('🎮 Simulador de Fotossíntese v1.0.0');
console.log('📚 Jogo educacional para ensino de ciências');
console.log('🎯 Público-alvo: 2º ano do Ensino Fundamental');
console.log('⌨️ Pressione H para ajuda ou Ctrl+R para reiniciar');

