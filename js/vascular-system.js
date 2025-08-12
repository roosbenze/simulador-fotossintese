/**
 * Sistema Vascular da Planta
 * Gerencia o transporte de água (xilema) e glicose (floema)
 */

class VascularSystem {
    constructor() {
        this.xylem = document.getElementById('xylem');
        this.phloem = document.getElementById('phloem');
        this.xylemExtension = document.getElementById('xylem-extension');
        
        this.waterTransportActive = false;
        this.glucoseTransportActive = false;
        
        this.waterParticles = [];
        this.glucoseParticles = [];
        
        this.init();
    }

    init() {
        this.createTransportChannels();
    }

    createTransportChannels() {
        // Criar canal de transporte no xilema
        if (!this.xylem.querySelector('.transport-channel')) {
            const xylemChannel = document.createElement('div');
            xylemChannel.className = 'transport-channel xylem-channel';
            this.xylem.appendChild(xylemChannel);
        }

        // Criar canal de transporte no floema
        if (!this.phloem.querySelector('.transport-channel')) {
            const phloemChannel = document.createElement('div');
            phloemChannel.className = 'transport-channel phloem-channel';
            this.phloem.appendChild(phloemChannel);
        }
    }

    // Iniciar transporte de água das raízes para as folhas
    startWaterTransport(waterMolecule) {
        if (!this.waterTransportActive) {
            this.waterTransportActive = true;
            this.animateWaterFlow(waterMolecule);
        }
    }

    // Iniciar transporte de glicose das folhas para os frutos
    startGlucoseTransport(glucoseMolecule) {
        if (!this.glucoseTransportActive) {
            this.glucoseTransportActive = true;
            this.animateGlucoseFlow(glucoseMolecule);
        }
    }

    animateWaterFlow(waterMolecule) {
        // Criar partícula de água no sistema vascular
        const waterParticle = this.createWaterParticle();
        
        // Posição inicial: base do xilema (zona de absorção)
        const startX = this.xylem.offsetLeft + this.xylem.offsetWidth / 2;
        const startY = this.xylem.offsetTop + this.xylem.offsetHeight;
        
        // Posição final: topo do xilema (folhas)
        const endX = this.xylem.offsetLeft + this.xylem.offsetWidth / 2;
        const endY = this.xylem.offsetTop;

        waterParticle.style.left = startX + 'px';
        waterParticle.style.top = startY + 'px';

        // Animar movimento da água subindo
        waterParticle.animate([
            {
                transform: `translate(0, 0)`,
                opacity: 1
            },
            {
                transform: `translate(0, ${startY - endY}px)`,
                opacity: 0.8
            }
        ], {
            duration: 3000,
            easing: 'ease-in-out'
        }).onfinish = () => {
            // Água chegou às folhas
            this.deliverWaterToLeaves(waterParticle);
            this.waterTransportActive = false;
        };
    }

    animateGlucoseFlow(glucoseMolecule) {
        // Criar partícula de glicose no sistema vascular
        const glucoseParticle = this.createGlucoseParticle();
        
        // Posição inicial: topo do floema (folhas)
        const startX = this.phloem.offsetLeft + this.phloem.offsetWidth / 2;
        const startY = this.phloem.offsetTop;
        
        // Posição final: base do floema (frutos)
        const endX = this.phloem.offsetLeft + this.phloem.offsetWidth / 2;
        const endY = this.phloem.offsetTop + this.phloem.offsetHeight;

        glucoseParticle.style.left = startX + 'px';
        glucoseParticle.style.top = startY + 'px';

        // Animar movimento da glicose descendo
        glucoseParticle.animate([
            {
                transform: `translate(0, 0)`,
                opacity: 1
            },
            {
                transform: `translate(0, ${endY - startY}px)`,
                opacity: 0.8
            }
        ], {
            duration: 4000,
            easing: 'ease-in-out'
        }).onfinish = () => {
            // Glicose chegou aos frutos
            this.deliverGlucoseToFruits(glucoseParticle);
            this.glucoseTransportActive = false;
        };
    }

    createWaterParticle() {
        const particle = document.createElement('div');
        particle.className = 'transport-particle water-particle';
        particle.innerHTML = '💧';
        particle.style.position = 'absolute';
        particle.style.fontSize = '12px';
        particle.style.zIndex = '100';
        particle.style.pointerEvents = 'none';
        
        document.body.appendChild(particle);
        this.waterParticles.push(particle);
        
        return particle;
    }

    createGlucoseParticle() {
        const particle = document.createElement('div');
        particle.className = 'transport-particle glucose-particle';
        particle.innerHTML = '🍯';
        particle.style.position = 'absolute';
        particle.style.fontSize = '12px';
        particle.style.zIndex = '100';
        particle.style.pointerEvents = 'none';
        
        document.body.appendChild(particle);
        this.glucoseParticles.push(particle);
        
        return particle;
    }

    deliverWaterToLeaves(waterParticle) {
        // Efeito visual de entrega de água às folhas
        const leaves = document.querySelectorAll('.leaf');
        leaves.forEach(leaf => {
            leaf.style.filter = 'brightness(1.2) saturate(1.3)';
            setTimeout(() => {
                leaf.style.filter = '';
            }, 1000);
        });

        // Remover partícula
        setTimeout(() => {
            if (waterParticle.parentNode) {
                waterParticle.parentNode.removeChild(waterParticle);
            }
            this.waterParticles = this.waterParticles.filter(p => p !== waterParticle);
        }, 500);

        // Disparar evento de água entregue
        document.dispatchEvent(new CustomEvent('waterDelivered'));
    }

    deliverGlucoseToFruits(glucoseParticle) {
        // Efeito visual de entrega de glicose aos frutos
        const fruits = document.querySelectorAll('.fruit');
        const emptyFruit = Array.from(fruits).find(fruit => !fruit.classList.contains('filled'));
        
        if (emptyFruit) {
            emptyFruit.classList.add('filled');
            emptyFruit.style.transform = 'scale(1.2)';
            setTimeout(() => {
                emptyFruit.style.transform = '';
            }, 500);

            // Atualizar contador de glicose
            const glucoseCount = document.getElementById('glucose-count');
            const filledFruits = document.querySelectorAll('.fruit.filled').length;
            glucoseCount.textContent = `${filledFruits}/3`;
        }

        // Remover partícula
        setTimeout(() => {
            if (glucoseParticle.parentNode) {
                glucoseParticle.parentNode.removeChild(glucoseParticle);
            }
            this.glucoseParticles = this.glucoseParticles.filter(p => p !== glucoseParticle);
        }, 500);

        // Disparar evento de glicose entregue
        document.dispatchEvent(new CustomEvent('glucoseDelivered'));
    }

    // Ativar fluxo contínuo no xilema
    activateXylemFlow() {
        const xylemFlow = this.xylem.querySelector('.xylem-flow');
        if (xylemFlow) {
            xylemFlow.style.animationPlayState = 'running';
        }
    }

    // Ativar fluxo contínuo no floema
    activatePhloemFlow() {
        const phloemFlow = this.phloem.querySelector('.phloem-flow');
        if (phloemFlow) {
            phloemFlow.style.animationPlayState = 'running';
        }
    }

    // Desativar fluxos
    deactivateFlows() {
        const xylemFlow = this.xylem.querySelector('.xylem-flow');
        const phloemFlow = this.phloem.querySelector('.phloem-flow');
        
        if (xylemFlow) {
            xylemFlow.style.animationPlayState = 'paused';
        }
        if (phloemFlow) {
            phloemFlow.style.animationPlayState = 'paused';
        }
    }

    // Mostrar direção do fluxo com setas
    showFlowDirection() {
        this.createFlowArrows();
    }

    createFlowArrows() {
        // Seta para cima no xilema (água subindo)
        if (!this.xylem.querySelector('.flow-arrow')) {
            const xylemArrow = document.createElement('div');
            xylemArrow.className = 'flow-arrow xylem-arrow';
            xylemArrow.innerHTML = '↑';
            xylemArrow.style.position = 'absolute';
            xylemArrow.style.left = '50%';
            xylemArrow.style.top = '50%';
            xylemArrow.style.transform = 'translate(-50%, -50%)';
            xylemArrow.style.color = '#87CEEB';
            xylemArrow.style.fontSize = '16px';
            xylemArrow.style.fontWeight = 'bold';
            xylemArrow.style.animation = 'arrow-pulse 2s ease-in-out infinite';
            this.xylem.appendChild(xylemArrow);
        }

        // Seta para baixo no floema (glicose descendo)
        if (!this.phloem.querySelector('.flow-arrow')) {
            const phloemArrow = document.createElement('div');
            phloemArrow.className = 'flow-arrow phloem-arrow';
            phloemArrow.innerHTML = '↓';
            phloemArrow.style.position = 'absolute';
            phloemArrow.style.left = '50%';
            phloemArrow.style.top = '50%';
            phloemArrow.style.transform = 'translate(-50%, -50%)';
            phloemArrow.style.color = '#FFD700';
            phloemArrow.style.fontSize = '16px';
            phloemArrow.style.fontWeight = 'bold';
            phloemArrow.style.animation = 'arrow-pulse 2s ease-in-out infinite';
            this.phloem.appendChild(phloemArrow);
        }
    }

    // Limpar todas as partículas
    clearAllParticles() {
        [...this.waterParticles, ...this.glucoseParticles].forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
        
        this.waterParticles = [];
        this.glucoseParticles = [];
    }

    // Resetar sistema vascular
    reset() {
        this.waterTransportActive = false;
        this.glucoseTransportActive = false;
        this.clearAllParticles();
        this.deactivateFlows();
        
        // Resetar frutos
        const fruits = document.querySelectorAll('.fruit');
        fruits.forEach(fruit => {
            fruit.classList.remove('filled');
        });
        
        // Resetar contador
        const glucoseCount = document.getElementById('glucose-count');
        glucoseCount.textContent = '0/3';
    }

    // Verificar se o transporte está ativo
    isTransporting() {
        return this.waterTransportActive || this.glucoseTransportActive;
    }

    // Obter estatísticas do sistema
    getStats() {
        return {
            waterParticles: this.waterParticles.length,
            glucoseParticles: this.glucoseParticles.length,
            waterTransportActive: this.waterTransportActive,
            glucoseTransportActive: this.glucoseTransportActive,
            filledFruits: document.querySelectorAll('.fruit.filled').length
        };
    }
}

// Adicionar estilos CSS para as animações das setas
const arrowStyles = `
@keyframes arrow-pulse {
    0%, 100% { 
        opacity: 0.6;
        transform: translate(-50%, -50%) scale(1);
    }
    50% { 
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.2);
    }
}

.transport-particle {
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

.xylem-flow, .phloem-flow {
    animation-play-state: paused;
}
`;

// Adicionar estilos ao documento
if (!document.getElementById('vascular-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'vascular-styles';
    styleSheet.textContent = arrowStyles;
    document.head.appendChild(styleSheet);
}

// Exportar classe para uso global
window.VascularSystem = VascularSystem;

