/**
 * Arquivo Principal do Simulador de Fotossíntese
 * Inicializa todos os sistemas e coordena o funcionamento geral
 */

// Variáveis globais
let gameLogic = null;

// Aguardar carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌱 Iniciando Simulador de Fotossíntese v2.0...');
    
    // Verificar se todos os elementos necessários estão presentes
    if (checkRequiredElements()) {
        initializeSimulator();
    } else {
        console.error('❌ Elementos HTML necessários não encontrados');
        showErrorMessage('Erro ao carregar o simulador. Recarregue a página.');
    }
});

/**
 * Verificar se todos os elementos HTML necessários estão presentes
 */
function checkRequiredElements() {
    const requiredElements = [
        'time-slider',
        'time-display',
        'day-night-indicator',
        'restart-btn',
        'main-scene',
        'sun',
        'absorption-zone',
        'xylem',
        'phloem',
        'water-molecules',
        'co2-molecules'
    ];
    
    for (const elementId of requiredElements) {
        if (!document.getElementById(elementId)) {
            console.error(`❌ Elemento não encontrado: ${elementId}`);
            return false;
        }
    }
    
    console.log('✅ Todos os elementos HTML necessários encontrados');
    return true;
}

/**
 * Inicializar o simulador
 */
function initializeSimulator() {
    try {
        // Mostrar tela de carregamento
        showLoadingScreen();
        
        // Inicializar sistemas com delay para melhor experiência
        setTimeout(() => {
            // Inicializar lógica principal do jogo
            gameLogic = new GameLogic();
            
            // Configurar eventos globais
            setupGlobalEvents();
            
            // Configurar acessibilidade
            setupAccessibility();
            
            // Configurar responsividade
            setupResponsiveness();
            
            // Ocultar tela de carregamento
            hideLoadingScreen();
            
            console.log('✅ Simulador inicializado com sucesso!');
            
            // Mostrar mensagem de boas-vindas
            setTimeout(() => {
                showWelcomeMessage();
            }, 1000);
            
        }, 1500);
        
    } catch (error) {
        console.error('❌ Erro ao inicializar simulador:', error);
        hideLoadingScreen();
        showErrorMessage('Erro ao inicializar o simulador. Recarregue a página.');
    }
}

/**
 * Mostrar tela de carregamento
 */
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner">🌱</div>
            <h2>Carregando Simulador de Fotossíntese</h2>
            <p>Preparando a experiência educativa...</p>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    
    // Estilos da tela de carregamento
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #4CAF50, #2E7D32);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Animar barra de progresso
    const progressBar = loadingScreen.querySelector('.loading-progress');
    progressBar.style.cssText = `
        width: 0%;
        height: 4px;
        background: #FFD700;
        border-radius: 2px;
        transition: width 1.5s ease-out;
    `;
    
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);
}

/**
 * Ocultar tela de carregamento
 */
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

/**
 * Mostrar mensagem de boas-vindas
 */
function showWelcomeMessage() {
    const modal = createModal(
        '🌱 Bem-vindo ao Simulador de Fotossíntese!',
        `
        <div style="text-align: left; margin: 1rem 0;">
            <p><strong>Você vai aprender:</strong></p>
            <ul style="margin: 1rem 0; padding-left: 2rem;">
                <li>Como as plantas absorvem água pelas raízes</li>
                <li>O transporte de nutrientes pelo caule</li>
                <li>Como acontece a fotossíntese nas folhas</li>
                <li>A produção de glicose e oxigênio</li>
            </ul>
            <p><strong>Como jogar:</strong></p>
            <ol style="margin: 1rem 0; padding-left: 2rem;">
                <li>Arraste moléculas de H₂O para a zona de absorção</li>
                <li>Arraste moléculas de CO₂ para as folhas</li>
                <li>Ajuste o horário para ter luz solar (6h-18h)</li>
                <li>Observe a fotossíntese acontecer!</li>
            </ol>
        </div>
        `,
        'Começar!'
    );
    
    modal.classList.add('welcome-modal');
    document.body.appendChild(modal);
}

/**
 * Configurar eventos globais
 */
function setupGlobalEvents() {
    // Evento de redimensionamento da janela
    window.addEventListener('resize', debounce(handleWindowResize, 250));
    
    // Evento de visibilidade da página (para pausar/retomar)
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Eventos de teclado globais
    document.addEventListener('keydown', handleGlobalKeyboard);
    
    // Prevenir zoom em dispositivos móveis
    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    
    // Evento de erro global
    window.addEventListener('error', handleGlobalError);
    
    console.log('✅ Eventos globais configurados');
}

/**
 * Configurar acessibilidade
 */
function setupAccessibility() {
    // Adicionar atributos ARIA
    const timeSlider = document.getElementById('time-slider');
    timeSlider.setAttribute('aria-label', 'Controle de horário do dia');
    timeSlider.setAttribute('aria-describedby', 'time-description');
    
    // Criar descrição do controle de tempo
    const timeDescription = document.createElement('div');
    timeDescription.id = 'time-description';
    timeDescription.className = 'sr-only';
    timeDescription.textContent = 'Use as setas do teclado ou arraste para ajustar o horário entre 0 e 23 horas';
    timeSlider.parentNode.appendChild(timeDescription);
    
    // Adicionar navegação por teclado para moléculas
    const molecules = document.querySelectorAll('.molecule');
    molecules.forEach((molecule, index) => {
        molecule.setAttribute('tabindex', '0');
        molecule.setAttribute('role', 'button');
        molecule.setAttribute('aria-label', `Molécula ${molecule.dataset.type} ${index + 1}`);
    });
    
    // Adicionar instruções de teclado
    const keyboardInstructions = document.createElement('div');
    keyboardInstructions.className = 'keyboard-instructions';
    keyboardInstructions.innerHTML = `
        <h4>⌨️ Atalhos de Teclado:</h4>
        <ul>
            <li><kbd>←</kbd> <kbd>→</kbd> Ajustar horário</li>
            <li><kbd>R</kbd> Reiniciar jogo</li>
            <li><kbd>Esc</kbd> Fechar mensagens</li>
            <li><kbd>Tab</kbd> Navegar elementos</li>
        </ul>
    `;
    
    const infoPanel = document.querySelector('.info-panel');
    if (infoPanel) {
        infoPanel.appendChild(keyboardInstructions);
    }
    
    console.log('✅ Acessibilidade configurada');
}

/**
 * Configurar responsividade
 */
function setupResponsiveness() {
    // Detectar tipo de dispositivo
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        setupMobileOptimizations();
    }
    
    if (isTablet) {
        document.body.classList.add('tablet-device');
    }
    
    // Ajustar layout inicial
    handleWindowResize();
    
    console.log('✅ Responsividade configurada');
}

/**
 * Configurar otimizações para dispositivos móveis
 */
function setupMobileOptimizations() {
    // Aumentar área de toque para moléculas
    const molecules = document.querySelectorAll('.molecule');
    molecules.forEach(molecule => {
        molecule.style.minWidth = '44px';
        molecule.style.minHeight = '44px';
        molecule.style.padding = '0.5rem';
    });
    
    // Ajustar controles para toque
    const timeSlider = document.getElementById('time-slider');
    timeSlider.style.height = '12px';
    
    // Adicionar feedback tátil
    if ('vibrate' in navigator) {
        console.log('✅ Feedback tátil disponível');
    }
}

/**
 * Manipular redimensionamento da janela
 */
function handleWindowResize() {
    const mainScene = document.getElementById('main-scene');
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Ajustar altura do cenário principal
    if (windowHeight < 600) {
        mainScene.style.height = '60vh';
    } else if (windowHeight > 1000) {
        mainScene.style.height = '85vh';
    } else {
        mainScene.style.height = '80vh';
    }
    
    // Ajustar layout para telas muito pequenas
    if (windowWidth < 480) {
        document.body.classList.add('small-screen');
    } else {
        document.body.classList.remove('small-screen');
    }
}

/**
 * Manipular mudança de visibilidade da página
 */
function handleVisibilityChange() {
    if (document.hidden) {
        // Página ficou oculta - pausar animações pesadas
        console.log('📱 Página oculta - pausando animações');
        document.body.classList.add('page-hidden');
    } else {
        // Página ficou visível - retomar animações
        console.log('📱 Página visível - retomando animações');
        document.body.classList.remove('page-hidden');
    }
}

/**
 * Manipular teclado global
 */
function handleGlobalKeyboard(e) {
    // Atalhos globais que funcionam mesmo quando o jogo não tem foco
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'r':
            case 'R':
                // Ctrl+R ou Cmd+R - permitir recarregar página
                return;
        }
    }
    
    // Prevenir ações padrão para certas teclas
    if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
        e.preventDefault();
    }
}

/**
 * Manipular início de toque (prevenir zoom)
 */
function handleTouchStart(e) {
    if (e.touches.length > 1) {
        e.preventDefault(); // Prevenir zoom com dois dedos
    }
}

/**
 * Manipular erros globais
 */
function handleGlobalError(e) {
    console.error('❌ Erro global capturado:', e.error);
    
    // Mostrar mensagem de erro amigável
    showErrorMessage('Ocorreu um erro inesperado. Tente recarregar a página.');
}

/**
 * Criar modal genérico
 */
function createModal(title, content, buttonText) {
    const modal = document.createElement('div');
    modal.className = 'game-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${title}</h2>
            <div class="modal-body">${content}</div>
            <button class="modal-button">${buttonText}</button>
        </div>
    `;
    
    // Estilos do modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;
    
    // Configurar botão
    const button = modal.querySelector('.modal-button');
    button.addEventListener('click', () => {
        modal.remove();
    });
    
    // Fechar com Escape
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    return modal;
}

/**
 * Mostrar mensagem de erro
 */
function showErrorMessage(message) {
    const errorModal = createModal(
        '❌ Erro',
        `<p style="color: #f44336;">${message}</p>`,
        'OK'
    );
    
    errorModal.classList.add('error-modal');
    document.body.appendChild(errorModal);
}

/**
 * Função utilitária para debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Função utilitária para logging com timestamp
 */
function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const emoji = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
    };
    
    console.log(`${emoji[type]} [${timestamp}] ${message}`);
}

// Exportar funções para uso global (desenvolvimento/debug)
window.simulatorDebug = {
    gameLogic: () => gameLogic,
    restart: () => gameLogic?.restartGame(),
    stats: () => gameLogic?.getGameStats(),
    log: log
};

// Adicionar estilos CSS para os elementos criados dinamicamente
const mainStyles = `
/* Estilos para tela de carregamento */
.loading-content {
    text-align: center;
    max-width: 400px;
    padding: 2rem;
}

.loading-spinner {
    font-size: 4rem;
    animation: spin 2s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.loading-bar {
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    margin-top: 2rem;
    overflow: hidden;
}

/* Estilos para modais */
.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    margin: 1rem;
}

.modal-content h2 {
    color: #2E7D32;
    margin-bottom: 1rem;
    font-size: 1.8rem;
}

.modal-body {
    margin-bottom: 2rem;
    line-height: 1.6;
}

.modal-button {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.modal-button:hover {
    background: #45a049;
    transform: translateY(-2px);
}

/* Instruções de teclado */
.keyboard-instructions {
    background: rgba(0, 0, 0, 0.05);
    padding: 1rem;
    border-radius: 10px;
    margin-top: 2rem;
    text-align: left;
}

.keyboard-instructions h4 {
    margin-bottom: 0.5rem;
    color: #2E7D32;
}

.keyboard-instructions ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.keyboard-instructions li {
    margin-bottom: 0.3rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

kbd {
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 0.2rem 0.4rem;
    font-size: 0.8rem;
    font-family: monospace;
}

/* Classe para tela oculta */
.page-hidden * {
    animation-play-state: paused !important;
}

/* Otimizações para dispositivos móveis */
.mobile-device .controls-panel {
    padding: 0.5rem 1rem;
}

.mobile-device .game-stats {
    font-size: 0.9rem;
}

.small-screen .info-panel {
    display: none;
}

.small-screen .vascular-legend {
    position: static;
    transform: none;
    margin: 0.5rem;
    font-size: 0.8rem;
}

/* Classe para acessibilidade */
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

/* Animações de entrada */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.game-modal {
    animation: fadeInUp 0.3s ease-out;
}
`;

// Adicionar estilos ao documento
if (!document.getElementById('main-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'main-styles';
    styleSheet.textContent = mainStyles;
    document.head.appendChild(styleSheet);
}

console.log('📄 Arquivo principal carregado - aguardando DOM...');

