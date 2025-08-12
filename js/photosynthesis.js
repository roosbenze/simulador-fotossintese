/**
 * Sistema de Fotossíntese
 * Gerencia o processo de fotossíntese nas folhas
 */

class PhotosynthesisSystem {
    constructor() {
        this.leaves = document.querySelectorAll('.leaf');
        this.photosynthesisZones = document.querySelectorAll('.photosynthesis-zone');
        
        this.isActive = false;
        this.hasWater = false;
        this.hasCO2 = false;
        this.hasSunlight = false;
        
        this.waterCount = 0;
        this.co2Count = 0;
        this.glucoseProduced = 0;
        
        this.requiredWater = 6;
        this.requiredCO2 = 6;
        this.maxGlucose = 3;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.createPhotosynthesisEffects();
    }

    setupEventListeners() {
        // Escutar eventos de entrega de água
        document.addEventListener('waterDelivered', () => {
            this.receiveWater();
        });

        // Escutar eventos de entrega de CO₂
        document.addEventListener('co2Delivered', () => {
            this.receiveCO2();
        });

        // Escutar mudanças na luz solar
        document.addEventListener('sunlightChanged', (event) => {
            this.setSunlight(event.detail.hasSunlight);
        });
    }

    createPhotosynthesisEffects() {
        this.photosynthesisZones.forEach(zone => {
            // Criar partículas de oxigênio
            const oxygenContainer = document.createElement('div');
            oxygenContainer.className = 'oxygen-particles';
            oxygenContainer.style.position = 'absolute';
            oxygenContainer.style.top = '0';
            oxygenContainer.style.left = '0';
            oxygenContainer.style.width = '100%';
            oxygenContainer.style.height = '100%';
            oxygenContainer.style.pointerEvents = 'none';
            zone.appendChild(oxygenContainer);
        });
    }

    receiveWater() {
        this.waterCount++;
        this.hasWater = this.waterCount >= this.requiredWater;
        
        // Atualizar contador visual
        const waterCountElement = document.getElementById('water-count');
        waterCountElement.textContent = `${this.waterCount}/${this.requiredWater}`;
        
        // Efeito visual nas folhas
        this.leaves.forEach(leaf => {
            leaf.style.filter = 'brightness(1.1) saturate(1.2)';
            setTimeout(() => {
                leaf.style.filter = '';
            }, 800);
        });

        this.checkPhotosynthesisConditions();
    }

    receiveCO2() {
        this.co2Count++;
        this.hasCO2 = this.co2Count >= this.requiredCO2;
        
        // Atualizar contador visual
        const co2CountElement = document.getElementById('co2-count');
        co2CountElement.textContent = `${this.co2Count}/${this.requiredCO2}`;
        
        // Efeito visual nas zonas de fotossíntese
        this.photosynthesisZones.forEach(zone => {
            zone.style.borderColor = '#90EE90';
            setTimeout(() => {
                zone.style.borderColor = '';
            }, 800);
        });

        this.checkPhotosynthesisConditions();
    }

    setSunlight(hasSunlight) {
        this.hasSunlight = hasSunlight;
        
        if (hasSunlight) {
            // Ativar raios solares direcionados
            this.activateSolarRays();
        } else {
            // Desativar raios solares
            this.deactivateSolarRays();
        }

        this.checkPhotosynthesisConditions();
    }

    checkPhotosynthesisConditions() {
        const canPhotosynthesize = this.hasWater && this.hasCO2 && this.hasSunlight;
        
        if (canPhotosynthesize && !this.isActive && this.glucoseProduced < this.maxGlucose) {
            this.startPhotosynthesis();
        } else if (!canPhotosynthesize && this.isActive) {
            this.stopPhotosynthesis();
        }
    }

    startPhotosynthesis() {
        this.isActive = true;
        
        // Ativar zonas de fotossíntese
        this.photosynthesisZones.forEach(zone => {
            zone.classList.add('active');
        });

        // Iniciar produção de oxigênio
        this.startOxygenProduction();
        
        // Iniciar produção de glicose
        setTimeout(() => {
            this.produceGlucose();
        }, 2000);

        // Efeito sonoro (simulado com vibração visual)
        this.createPhotosynthesisAnimation();
    }

    stopPhotosynthesis() {
        this.isActive = false;
        
        // Desativar zonas de fotossíntese
        this.photosynthesisZones.forEach(zone => {
            zone.classList.remove('active');
        });

        // Parar produção de oxigênio
        this.stopOxygenProduction();
    }

    startOxygenProduction() {
        this.photosynthesisZones.forEach((zone, index) => {
            const oxygenContainer = zone.querySelector('.oxygen-particles');
            
            // Criar bolhas de oxigênio
            const createOxygenBubble = () => {
                if (!this.isActive) return;
                
                const bubble = document.createElement('div');
                bubble.className = 'oxygen-bubble';
                bubble.innerHTML = 'O₂';
                bubble.style.position = 'absolute';
                bubble.style.left = Math.random() * 60 + 20 + '%';
                bubble.style.top = '80%';
                bubble.style.fontSize = '10px';
                bubble.style.color = '#4CAF50';
                bubble.style.fontWeight = 'bold';
                bubble.style.pointerEvents = 'none';
                bubble.style.zIndex = '50';
                
                oxygenContainer.appendChild(bubble);
                
                // Animar bolha subindo
                bubble.animate([
                    {
                        transform: 'translateY(0) scale(0.5)',
                        opacity: 1
                    },
                    {
                        transform: 'translateY(-100px) scale(1)',
                        opacity: 0
                    }
                ], {
                    duration: 3000,
                    easing: 'ease-out'
                }).onfinish = () => {
                    if (bubble.parentNode) {
                        bubble.parentNode.removeChild(bubble);
                    }
                };
                
                // Próxima bolha
                if (this.isActive) {
                    setTimeout(createOxygenBubble, 1000 + Math.random() * 2000);
                }
            };
            
            // Iniciar produção com delay diferente para cada folha
            setTimeout(createOxygenBubble, index * 500);
        });
    }

    stopOxygenProduction() {
        // A produção para automaticamente quando isActive = false
        // As bolhas existentes continuam sua animação até o fim
    }

    produceGlucose() {
        if (!this.isActive || this.glucoseProduced >= this.maxGlucose) return;
        
        // Consumir recursos
        this.waterCount = Math.max(0, this.waterCount - 6);
        this.co2Count = Math.max(0, this.co2Count - 6);
        
        // Atualizar contadores
        document.getElementById('water-count').textContent = `${this.waterCount}/${this.requiredWater}`;
        document.getElementById('co2-count').textContent = `${this.co2Count}/${this.requiredCO2}`;
        
        // Verificar se ainda tem recursos suficientes
        this.hasWater = this.waterCount >= this.requiredWater;
        this.hasCO2 = this.co2Count >= this.requiredCO2;
        
        // Produzir glicose
        this.glucoseProduced++;
        
        // Efeito visual de produção de glicose
        this.createGlucoseEffect();
        
        // Enviar glicose para o sistema vascular
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('glucoseProduced'));
        }, 1000);
        
        // Verificar condições para próxima produção
        setTimeout(() => {
            this.checkPhotosynthesisConditions();
        }, 3000);
    }

    createGlucoseEffect() {
        this.leaves.forEach(leaf => {
            // Criar partícula de glicose
            const glucoseParticle = document.createElement('div');
            glucoseParticle.className = 'glucose-particle-effect';
            glucoseParticle.innerHTML = '🍯';
            glucoseParticle.style.position = 'absolute';
            glucoseParticle.style.top = '50%';
            glucoseParticle.style.left = '50%';
            glucoseParticle.style.transform = 'translate(-50%, -50%)';
            glucoseParticle.style.fontSize = '16px';
            glucoseParticle.style.zIndex = '100';
            glucoseParticle.style.pointerEvents = 'none';
            
            leaf.appendChild(glucoseParticle);
            
            // Animar partícula
            glucoseParticle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(0)',
                    opacity: 0
                },
                {
                    transform: 'translate(-50%, -50%) scale(1.5)',
                    opacity: 1
                },
                {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 0.8
                }
            ], {
                duration: 2000,
                easing: 'ease-out'
            }).onfinish = () => {
                if (glucoseParticle.parentNode) {
                    glucoseParticle.parentNode.removeChild(glucoseParticle);
                }
            };
        });
    }

    createPhotosynthesisAnimation() {
        this.leaves.forEach((leaf, index) => {
            // Animação de "respiração" da folha
            leaf.style.animation = 'leaf-breathe 3s ease-in-out infinite';
            
            // Efeito de brilho
            setTimeout(() => {
                leaf.style.filter = 'brightness(1.3) saturate(1.4) drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))';
            }, index * 200);
        });
    }

    activateSolarRays() {
        const solarRaysContainer = document.getElementById('solar-rays');
        
        // Limpar raios existentes
        solarRaysContainer.innerHTML = '';
        
        // Criar raios direcionados
        const createPhotonRay = () => {
            const photon = document.createElement('div');
            photon.className = 'photon-particle';
            photon.style.left = Math.random() * 100 + 'px';
            photon.style.top = Math.random() * 50 + 'px';
            
            solarRaysContainer.appendChild(photon);
            
            // Remover após animação
            setTimeout(() => {
                if (photon.parentNode) {
                    photon.parentNode.removeChild(photon);
                }
            }, 3000);
        };
        
        // Criar raios continuamente durante o dia
        this.photonInterval = setInterval(() => {
            if (this.hasSunlight) {
                createPhotonRay();
            }
        }, 500);
    }

    deactivateSolarRays() {
        if (this.photonInterval) {
            clearInterval(this.photonInterval);
            this.photonInterval = null;
        }
        
        // Limpar raios existentes
        const solarRaysContainer = document.getElementById('solar-rays');
        solarRaysContainer.innerHTML = '';
    }

    // Resetar sistema
    reset() {
        this.isActive = false;
        this.hasWater = false;
        this.hasCO2 = false;
        this.hasSunlight = false;
        
        this.waterCount = 0;
        this.co2Count = 0;
        this.glucoseProduced = 0;
        
        // Resetar contadores visuais
        document.getElementById('water-count').textContent = `0/${this.requiredWater}`;
        document.getElementById('co2-count').textContent = `0/${this.requiredCO2}`;
        
        // Parar fotossíntese
        this.stopPhotosynthesis();
        this.deactivateSolarRays();
        
        // Resetar estilos das folhas
        this.leaves.forEach(leaf => {
            leaf.style.animation = '';
            leaf.style.filter = '';
        });
        
        // Limpar partículas
        document.querySelectorAll('.oxygen-bubble, .glucose-particle-effect').forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
    }

    // Verificar se a fotossíntese está completa
    isComplete() {
        return this.glucoseProduced >= this.maxGlucose;
    }

    // Obter estatísticas
    getStats() {
        return {
            isActive: this.isActive,
            hasWater: this.hasWater,
            hasCO2: this.hasCO2,
            hasSunlight: this.hasSunlight,
            waterCount: this.waterCount,
            co2Count: this.co2Count,
            glucoseProduced: this.glucoseProduced,
            isComplete: this.isComplete()
        };
    }
}

// Adicionar estilos CSS para as animações
const photosynthesisStyles = `
@keyframes leaf-breathe {
    0%, 100% { 
        transform: scale(1);
    }
    50% { 
        transform: scale(1.05);
    }
}

.oxygen-bubble {
    animation: bubble-rise 3s ease-out forwards;
}

@keyframes bubble-rise {
    0% {
        transform: translateY(0) scale(0.5);
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) scale(1);
        opacity: 0;
    }
}

.glucose-particle-effect {
    animation: glucose-sparkle 2s ease-out forwards;
}

@keyframes glucose-sparkle {
    0% {
        transform: translate(-50%, -50%) scale(0) rotate(0deg);
        opacity: 0;
    }
    50% {
        transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) scale(1) rotate(360deg);
        opacity: 0.8;
    }
}
`;

// Adicionar estilos ao documento
if (!document.getElementById('photosynthesis-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'photosynthesis-styles';
    styleSheet.textContent = photosynthesisStyles;
    document.head.appendChild(styleSheet);
}

// Exportar classe para uso global
window.PhotosynthesisSystem = PhotosynthesisSystem;

