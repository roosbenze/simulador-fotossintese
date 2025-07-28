// Sistema de animações e efeitos visuais
class AnimationManager {
    constructor() {
        this.activeAnimations = new Set();
        this.init();
    }
    
    init() {
        this.setupHoverEffects();
        this.setupVisualFeedback();
        this.startBackgroundAnimations();
    }
    
    // Configurar efeitos de hover
    setupHoverEffects() {
        // Efeitos para moléculas
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.molecule')) {
                const molecule = e.target.closest('.molecule');
                if (!molecule.classList.contains('dragging')) {
                    molecule.style.transform = 'scale(1.1)';
                    molecule.style.transition = 'transform 0.2s ease';
                }
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.molecule')) {
                const molecule = e.target.closest('.molecule');
                if (!molecule.classList.contains('dragging')) {
                    molecule.style.transform = '';
                }
            }
        });
        
        // Efeitos para botões e controles
        document.querySelectorAll('button, .time-slider').forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-2px)';
                element.style.transition = 'transform 0.2s ease';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }
    
    // Configurar feedback visual
    setupVisualFeedback() {
        // Feedback para zonas de drop
        const zones = document.querySelectorAll('.water-absorption-zone, .photosynthesis-zone');
        zones.forEach(zone => {
            zone.addEventListener('mouseenter', () => {
                if (!zone.classList.contains('drop-zone-highlight')) {
                    zone.style.borderColor = '#FFD700';
                    zone.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
                    zone.style.transition = 'all 0.3s ease';
                }
            });
            
            zone.addEventListener('mouseleave', () => {
                if (!zone.classList.contains('drop-zone-highlight')) {
                    zone.style.borderColor = '';
                    zone.style.backgroundColor = '';
                }
            });
        });
    }
    
    // Iniciar animações de fundo
    startBackgroundAnimations() {
        this.animateLeaves();
        this.animateSunRays();
        this.createFloatingParticles();
    }
    
    // Animar folhas balançando
    animateLeaves() {
        const leaves = document.querySelectorAll('.leaf');
        
        leaves.forEach((leaf, index) => {
            const animationId = `leaf-sway-${index}`;
            
            if (!this.activeAnimations.has(animationId)) {
                this.activeAnimations.add(animationId);
                
                const sway = () => {
                    const duration = 3000 + Math.random() * 2000;
                    const rotation = (Math.random() - 0.5) * 10;
                    
                    leaf.style.transition = `transform ${duration}ms ease-in-out`;
                    leaf.style.transform = `rotate(${rotation}deg)`;
                    
                    setTimeout(sway, duration);
                };
                
                sway();
            }
        });
    }
    
    // Animar raios do sol
    animateSunRays() {
        const sunRays = document.querySelector('.sun-rays');
        if (sunRays) {
            sunRays.style.animation = 'rotate 10s linear infinite';
        }
    }
    
    // Criar partículas flutuantes
    createFloatingParticles() {
        const gardenScene = document.getElementById('garden-scene');
        
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.innerHTML = ['✨', '🌟', '💫'][Math.floor(Math.random() * 3)];
            particle.style.position = 'absolute';
            particle.style.fontSize = '12px';
            particle.style.opacity = '0.6';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1';
            
            // Posição inicial aleatória
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            
            gardenScene.appendChild(particle);
            
            // Animar movimento para cima
            const duration = 8000 + Math.random() * 4000;
            particle.style.transition = `all ${duration}ms linear`;
            
            setTimeout(() => {
                particle.style.top = '-50px';
                particle.style.left = (parseFloat(particle.style.left) + (Math.random() - 0.5) * 20) + '%';
                particle.style.opacity = '0';
            }, 100);
            
            // Remover após animação
            setTimeout(() => {
                particle.remove();
            }, duration + 100);
        };
        
        // Criar partículas periodicamente
        setInterval(createParticle, 3000);
    }
    
    // Animação de coleta de molécula
    animateMoleculeCollection(molecule, targetZone) {
        const startRect = molecule.getBoundingClientRect();
        const targetRect = targetZone.getBoundingClientRect();
        
        // Criar clone para animação
        const clone = molecule.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.left = startRect.left + 'px';
        clone.style.top = startRect.top + 'px';
        clone.style.zIndex = '1000';
        clone.style.pointerEvents = 'none';
        
        document.body.appendChild(clone);
        
        // Animar movimento
        setTimeout(() => {
            clone.style.transition = 'all 1s ease-out';
            clone.style.left = targetRect.left + targetRect.width / 2 + 'px';
            clone.style.top = targetRect.top + targetRect.height / 2 + 'px';
            clone.style.transform = 'scale(0.5)';
            clone.style.opacity = '0';
        }, 50);
        
        // Remover clone
        setTimeout(() => {
            clone.remove();
        }, 1050);
        
        // Ocultar molécula original
        molecule.style.display = 'none';
    }
    
    // Animação de fotossíntese
    animatePhotosynthesis() {
        const photosynthesisZone = document.getElementById('photosynthesis-zone');
        
        // Efeito de brilho intenso
        photosynthesisZone.style.boxShadow = '0 0 30px #FFD700, inset 0 0 20px rgba(255, 215, 0, 0.5)';
        photosynthesisZone.style.backgroundColor = 'rgba(255, 215, 0, 0.7)';
        
        // Criar partículas de energia
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                this.createEnergyParticle(photosynthesisZone);
            }, i * 100);
        }
        
        // Resetar após animação
        setTimeout(() => {
            photosynthesisZone.style.boxShadow = '';
            photosynthesisZone.style.backgroundColor = '';
        }, 2000);
    }
    
    // Criar partícula de energia
    createEnergyParticle(container) {
        const particle = document.createElement('div');
        particle.innerHTML = '⚡';
        particle.style.position = 'absolute';
        particle.style.fontSize = '16px';
        particle.style.color = '#FFD700';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '100';
        
        // Posição inicial no centro da zona
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.transform = 'translate(-50%, -50%)';
        
        container.appendChild(particle);
        
        // Animar explosão
        setTimeout(() => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particle.style.transition = 'all 1s ease-out';
            particle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0)`;
            particle.style.opacity = '0';
        }, 50);
        
        // Remover partícula
        setTimeout(() => {
            particle.remove();
        }, 1050);
    }
    
    // Animação de crescimento de fruto
    animateFruitGrowth(fruitSlot) {
        // Efeito de pulsação antes do crescimento
        fruitSlot.style.animation = 'fruit-pulse 0.5s ease-in-out 3';
        
        setTimeout(() => {
            fruitSlot.style.animation = '';
            fruitSlot.classList.add('filled');
            
            // Efeito de crescimento
            fruitSlot.style.transform = 'scale(0)';
            fruitSlot.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            
            setTimeout(() => {
                fruitSlot.style.transform = 'scale(1)';
            }, 50);
            
            // Criar partículas de celebração
            this.createFruitCelebration(fruitSlot);
        }, 1500);
    }
    
    // Criar celebração para fruto
    createFruitCelebration(fruitSlot) {
        const rect = fruitSlot.getBoundingClientRect();
        const gardenScene = document.getElementById('garden-scene');
        const gardenRect = gardenScene.getBoundingClientRect();
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.fontSize = '14px';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.zIndex = '200';
                
                // Posição inicial no centro do fruto
                sparkle.style.left = (rect.left - gardenRect.left + rect.width / 2) + 'px';
                sparkle.style.top = (rect.top - gardenRect.top + rect.height / 2) + 'px';
                
                gardenScene.appendChild(sparkle);
                
                // Animar explosão
                setTimeout(() => {
                    const angle = (i / 8) * Math.PI * 2;
                    const distance = 40;
                    const x = Math.cos(angle) * distance;
                    const y = Math.sin(angle) * distance;
                    
                    sparkle.style.transition = 'all 1s ease-out';
                    sparkle.style.transform = `translate(${x}px, ${y}px) scale(0)`;
                    sparkle.style.opacity = '0';
                }, 50);
                
                // Remover sparkle
                setTimeout(() => {
                    sparkle.remove();
                }, 1050);
            }, i * 50);
        }
    }
    
    // Animação de transição dia/noite
    animateDayNightTransition(isDaytime) {
        const gardenScene = document.getElementById('garden-scene');
        const sun = document.getElementById('sun');
        
        // Transição suave do cenário
        gardenScene.style.transition = 'all 1s ease-in-out';
        sun.style.transition = 'all 1s ease-in-out';
        
        if (isDaytime) {
            // Transição para dia
            setTimeout(() => {
                this.createSunriseEffect();
            }, 500);
        } else {
            // Transição para noite
            setTimeout(() => {
                this.createSunsetEffect();
            }, 500);
        }
    }
    
    // Efeito de nascer do sol
    createSunriseEffect() {
        const gardenScene = document.getElementById('garden-scene');
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const ray = document.createElement('div');
                ray.style.position = 'absolute';
                ray.style.top = '20px';
                ray.style.right = '50px';
                ray.style.width = '2px';
                ray.style.height = '100px';
                ray.style.background = 'linear-gradient(to bottom, #FFD700, transparent)';
                ray.style.transformOrigin = 'top center';
                ray.style.transform = `rotate(${(i - 2) * 30}deg)`;
                ray.style.opacity = '0';
                ray.style.pointerEvents = 'none';
                ray.style.zIndex = '5';
                
                gardenScene.appendChild(ray);
                
                // Animar aparição
                setTimeout(() => {
                    ray.style.transition = 'opacity 0.5s ease-out';
                    ray.style.opacity = '0.8';
                }, 50);
                
                // Remover após animação
                setTimeout(() => {
                    ray.style.opacity = '0';
                    setTimeout(() => ray.remove(), 500);
                }, 2000);
            }, i * 100);
        }
    }
    
    // Efeito de pôr do sol
    createSunsetEffect() {
        const gardenScene = document.getElementById('garden-scene');
        
        // Criar efeito de estrelas aparecendo
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                star.innerHTML = '⭐';
                star.style.position = 'absolute';
                star.style.fontSize = '12px';
                star.style.opacity = '0';
                star.style.pointerEvents = 'none';
                star.style.zIndex = '5';
                star.style.left = Math.random() * 80 + 10 + '%';
                star.style.top = Math.random() * 30 + 10 + '%';
                
                gardenScene.appendChild(star);
                
                // Animar aparição
                setTimeout(() => {
                    star.style.transition = 'opacity 1s ease-out';
                    star.style.opacity = '0.8';
                }, 50);
                
                // Remover quando voltar a ser dia
                const checkDaytime = () => {
                    if (window.gameLogic && window.gameLogic.isDaytime()) {
                        star.style.opacity = '0';
                        setTimeout(() => star.remove(), 1000);
                    } else {
                        setTimeout(checkDaytime, 1000);
                    }
                };
                setTimeout(checkDaytime, 2000);
            }, i * 200);
        }
    }
    
    // Parar todas as animações
    stopAllAnimations() {
        this.activeAnimations.clear();
        
        // Remover elementos animados
        document.querySelectorAll('.water-animation, .oxygen-bubble, .energy-particle').forEach(el => {
            el.remove();
        });
    }
}

// Adicionar estilos CSS para animações
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes fruit-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    
    .molecule {
        transition: transform 0.2s ease;
    }
    
    .molecule:not(.dragging):hover {
        transform: scale(1.1);
        filter: brightness(1.2);
    }
    
    .photosynthesis-zone.active {
        animation: photosynthesis-glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes photosynthesis-glow {
        0% { 
            box-shadow: 0 0 20px #FFD700;
            background-color: rgba(255, 215, 0, 0.2);
        }
        100% { 
            box-shadow: 0 0 40px #FFD700, inset 0 0 30px rgba(255, 215, 0, 0.4);
            background-color: rgba(255, 215, 0, 0.4);
        }
    }
    
    .garden-scene {
        transition: all 1s ease-in-out;
    }
    
    .sun {
        transition: all 1s ease-in-out;
    }
    
    .fruit-slot {
        transition: all 0.3s ease;
    }
    
    .fruit-slot.filled {
        animation: fruit-glow 2s ease-in-out infinite alternate;
    }
    
    @keyframes fruit-glow {
        0% { 
            box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
            transform: scale(1);
        }
        100% { 
            box-shadow: 0 0 20px rgba(255, 107, 53, 0.8);
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(animationStyles);

// Exportar para uso global
window.AnimationManager = AnimationManager;

