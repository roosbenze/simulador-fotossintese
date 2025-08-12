/**
 * Sistema de Moléculas e Drag-and-Drop
 * Gerencia as interações com moléculas de água e CO₂
 */

class MoleculeSystem {
    constructor() {
        this.waterMolecules = [];
        this.co2Molecules = [];
        
        this.draggedElement = null;
        this.dragOffset = { x: 0, y: 0 };
        
        this.absorptionZone = document.getElementById('absorption-zone');
        this.leaves = document.querySelectorAll('.leaf');
        
        this.init();
    }

    init() {
        this.setupMolecules();
        this.setupDragAndDrop();
        this.setupDropZones();
    }

    setupMolecules() {
        // Configurar moléculas de água
        const waterMolecules = document.querySelectorAll('.water-molecule');
        waterMolecules.forEach((molecule, index) => {
            this.setupWaterMolecule(molecule, index);
        });

        // Configurar moléculas de CO₂
        const co2Molecules = document.querySelectorAll('.co2-molecule');
        co2Molecules.forEach((molecule, index) => {
            this.setupCO2Molecule(molecule, index);
        });
    }

    setupWaterMolecule(molecule, index) {
        molecule.id = `water-${index}`;
        molecule.style.cursor = 'grab';
        
        // Adicionar efeito de hover
        molecule.addEventListener('mouseenter', () => {
            if (!molecule.classList.contains('dragging')) {
                molecule.style.transform = 'scale(1.1)';
                molecule.style.boxShadow = '0 4px 15px rgba(0, 191, 255, 0.4)';
            }
        });

        molecule.addEventListener('mouseleave', () => {
            if (!molecule.classList.contains('dragging')) {
                molecule.style.transform = '';
                molecule.style.boxShadow = '';
            }
        });

        this.waterMolecules.push(molecule);
    }

    setupCO2Molecule(molecule, index) {
        molecule.id = `co2-${index}`;
        molecule.style.cursor = 'grab';
        
        // Adicionar efeito de hover
        molecule.addEventListener('mouseenter', () => {
            if (!molecule.classList.contains('dragging')) {
                molecule.style.transform = 'scale(1.1)';
                molecule.style.boxShadow = '0 4px 15px rgba(128, 128, 128, 0.4)';
            }
        });

        molecule.addEventListener('mouseleave', () => {
            if (!molecule.classList.contains('dragging')) {
                molecule.style.transform = '';
                molecule.style.boxShadow = '';
            }
        });

        this.co2Molecules.push(molecule);
    }

    setupDragAndDrop() {
        // Eventos de mouse
        document.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', (e) => this.handleMouseUp(e));

        // Eventos de touch para dispositivos móveis
        document.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e));
    }

    setupDropZones() {
        // Zona de absorção para moléculas de água
        this.absorptionZone.addEventListener('dragover', (e) => e.preventDefault());
        this.absorptionZone.addEventListener('drop', (e) => this.handleWaterDrop(e));

        // Folhas para moléculas de CO₂
        this.leaves.forEach(leaf => {
            leaf.addEventListener('dragover', (e) => e.preventDefault());
            leaf.addEventListener('drop', (e) => this.handleCO2Drop(e));
        });
    }

    handleMouseDown(e) {
        const molecule = e.target.closest('.molecule');
        if (!molecule) return;

        this.startDrag(molecule, e.clientX, e.clientY);
        e.preventDefault();
    }

    handleMouseMove(e) {
        if (!this.draggedElement) return;
        
        this.updateDragPosition(e.clientX, e.clientY);
        this.highlightDropZones();
        e.preventDefault();
    }

    handleMouseUp(e) {
        if (!this.draggedElement) return;
        
        this.handleDrop(e.clientX, e.clientY);
        e.preventDefault();
    }

    handleTouchStart(e) {
        const molecule = e.target.closest('.molecule');
        if (!molecule) return;

        const touch = e.touches[0];
        this.startDrag(molecule, touch.clientX, touch.clientY);
        e.preventDefault();
    }

    handleTouchMove(e) {
        if (!this.draggedElement) return;
        
        const touch = e.touches[0];
        this.updateDragPosition(touch.clientX, touch.clientY);
        this.highlightDropZones();
        e.preventDefault();
    }

    handleTouchEnd(e) {
        if (!this.draggedElement) return;
        
        const touch = e.changedTouches[0];
        this.handleDrop(touch.clientX, touch.clientY);
        e.preventDefault();
    }

    startDrag(molecule, clientX, clientY) {
        this.draggedElement = molecule;
        
        const rect = molecule.getBoundingClientRect();
        this.dragOffset.x = clientX - rect.left;
        this.dragOffset.y = clientY - rect.top;
        
        // Estilos de arrastar
        molecule.classList.add('dragging');
        molecule.style.cursor = 'grabbing';
        molecule.style.zIndex = '1000';
        molecule.style.position = 'fixed';
        molecule.style.pointerEvents = 'none';
        
        // Efeito visual
        molecule.style.transform = 'scale(1.2) rotate(5deg)';
        molecule.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        
        // Feedback tátil (vibração em dispositivos móveis)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    updateDragPosition(clientX, clientY) {
        if (!this.draggedElement) return;
        
        const x = clientX - this.dragOffset.x;
        const y = clientY - this.dragOffset.y;
        
        this.draggedElement.style.left = x + 'px';
        this.draggedElement.style.top = y + 'px';
    }

    highlightDropZones() {
        if (!this.draggedElement) return;
        
        const moleculeType = this.draggedElement.dataset.type;
        
        if (moleculeType === 'water') {
            // Destacar zona de absorção
            this.absorptionZone.style.borderColor = '#00BFFF';
            this.absorptionZone.style.backgroundColor = 'rgba(0, 191, 255, 0.2)';
            this.absorptionZone.style.transform = 'scale(1.05)';
        } else if (moleculeType === 'co2') {
            // Destacar folhas
            this.leaves.forEach(leaf => {
                leaf.style.borderColor = '#90EE90';
                leaf.style.boxShadow = '0 0 20px rgba(144, 238, 144, 0.5)';
                leaf.style.transform = 'scale(1.05)';
            });
        }
    }

    clearDropZoneHighlights() {
        // Limpar destaque da zona de absorção
        this.absorptionZone.style.borderColor = '';
        this.absorptionZone.style.backgroundColor = '';
        this.absorptionZone.style.transform = '';
        
        // Limpar destaque das folhas
        this.leaves.forEach(leaf => {
            leaf.style.borderColor = '';
            leaf.style.boxShadow = '';
            leaf.style.transform = '';
        });
    }

    handleDrop(clientX, clientY) {
        if (!this.draggedElement) return;
        
        const elementBelow = document.elementFromPoint(clientX, clientY);
        const dropZone = this.findDropZone(elementBelow);
        
        if (dropZone) {
            this.processSuccessfulDrop(dropZone);
        } else {
            this.returnMoleculeToOriginalPosition();
        }
        
        this.endDrag();
    }

    findDropZone(element) {
        if (!element || !this.draggedElement) return null;
        
        const moleculeType = this.draggedElement.dataset.type;
        
        if (moleculeType === 'water') {
            // Verificar se está sobre a zona de absorção
            return element.closest('#absorption-zone');
        } else if (moleculeType === 'co2') {
            // Verificar se está sobre uma folha
            return element.closest('.leaf');
        }
        
        return null;
    }

    processSuccessfulDrop(dropZone) {
        const moleculeType = this.draggedElement.dataset.type;
        
        if (moleculeType === 'water') {
            this.processWaterDrop(dropZone);
        } else if (moleculeType === 'co2') {
            this.processCO2Drop(dropZone);
        }
    }

    processWaterDrop(dropZone) {
        // Efeito visual de absorção
        this.createAbsorptionEffect(this.draggedElement, dropZone);
        
        // Remover molécula da tela
        this.removeMolecule(this.draggedElement);
        
        // Iniciar transporte no sistema vascular
        setTimeout(() => {
            if (window.vascularSystem) {
                window.vascularSystem.startWaterTransport();
            }
        }, 500);
        
        // Feedback positivo
        this.showSuccessFeedback('Água absorvida pelas raízes!');
        
        // Vibração de sucesso
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }

    processCO2Drop(dropZone) {
        // Efeito visual de captura
        this.createCaptureEffect(this.draggedElement, dropZone);
        
        // Remover molécula da tela
        this.removeMolecule(this.draggedElement);
        
        // Notificar sistema de fotossíntese
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('co2Delivered'));
        }, 500);
        
        // Feedback positivo
        this.showSuccessFeedback('CO₂ capturado pelas folhas!');
        
        // Vibração de sucesso
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }

    createAbsorptionEffect(molecule, dropZone) {
        // Criar efeito de ondas de absorção
        const effect = document.createElement('div');
        effect.className = 'absorption-effect';
        effect.style.position = 'absolute';
        effect.style.left = '50%';
        effect.style.top = '50%';
        effect.style.transform = 'translate(-50%, -50%)';
        effect.style.width = '20px';
        effect.style.height = '20px';
        effect.style.border = '3px solid #00BFFF';
        effect.style.borderRadius = '50%';
        effect.style.pointerEvents = 'none';
        effect.style.zIndex = '100';
        
        dropZone.appendChild(effect);
        
        // Animar efeito
        effect.animate([
            {
                width: '20px',
                height: '20px',
                opacity: 1
            },
            {
                width: '100px',
                height: '100px',
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        };
    }

    createCaptureEffect(molecule, dropZone) {
        // Criar efeito de brilho na folha
        const originalFilter = dropZone.style.filter;
        
        dropZone.style.filter = 'brightness(1.5) saturate(1.5) drop-shadow(0 0 15px rgba(144, 238, 144, 0.8))';
        
        setTimeout(() => {
            dropZone.style.filter = originalFilter;
        }, 1000);
        
        // Criar partículas de captura
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createCaptureParticle(dropZone);
            }, i * 100);
        }
    }

    createCaptureParticle(dropZone) {
        const particle = document.createElement('div');
        particle.innerHTML = '✨';
        particle.style.position = 'absolute';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.fontSize = '12px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '100';
        
        dropZone.appendChild(particle);
        
        particle.animate([
            {
                transform: 'scale(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: 'scale(1.5) rotate(360deg)',
                opacity: 0
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        };
    }

    returnMoleculeToOriginalPosition() {
        // Animar retorno à posição original
        const molecule = this.draggedElement;
        const originalPosition = this.getOriginalPosition(molecule);
        
        molecule.animate([
            {
                left: molecule.style.left,
                top: molecule.style.top,
                transform: 'scale(1.2) rotate(5deg)'
            },
            {
                left: originalPosition.x + 'px',
                top: originalPosition.y + 'px',
                transform: 'scale(1) rotate(0deg)'
            }
        ], {
            duration: 500,
            easing: 'ease-out'
        }).onfinish = () => {
            // Restaurar posição original
            molecule.style.position = '';
            molecule.style.left = '';
            molecule.style.top = '';
        };
        
        // Feedback negativo
        this.showErrorFeedback('Solte na zona correta!');
    }

    getOriginalPosition(molecule) {
        // Retornar posição original baseada no tipo e índice
        const moleculeType = molecule.dataset.type;
        const index = parseInt(molecule.id.split('-')[1]);
        
        if (moleculeType === 'water') {
            const positions = [
                { x: 15, y: 20 }, { x: 70, y: 60 }, { x: 25, y: 40 },
                { x: 85, y: 80 }, { x: 55, y: 30 }, { x: 40, y: 70 }
            ];
            return positions[index] || { x: 50, y: 50 };
        } else {
            const positions = [
                { x: 20, y: 10 }, { x: 70, y: 30 }, { x: 15, y: 50 },
                { x: 85, y: 20 }, { x: 50, y: 60 }, { x: 35, y: 40 }
            ];
            return positions[index] || { x: 50, y: 30 };
        }
    }

    removeMolecule(molecule) {
        // Animar remoção
        molecule.animate([
            {
                transform: 'scale(1.2)',
                opacity: 1
            },
            {
                transform: 'scale(0)',
                opacity: 0
            }
        ], {
            duration: 300,
            easing: 'ease-in'
        }).onfinish = () => {
            if (molecule.parentNode) {
                molecule.parentNode.removeChild(molecule);
            }
        };
    }

    endDrag() {
        if (!this.draggedElement) return;
        
        // Limpar estilos de arrastar
        this.draggedElement.classList.remove('dragging');
        this.draggedElement.style.cursor = '';
        this.draggedElement.style.zIndex = '';
        this.draggedElement.style.pointerEvents = '';
        this.draggedElement.style.transform = '';
        this.draggedElement.style.boxShadow = '';
        
        // Limpar destaques
        this.clearDropZoneHighlights();
        
        this.draggedElement = null;
    }

    showSuccessFeedback(message) {
        this.showFeedback(message, 'success');
    }

    showErrorFeedback(message) {
        this.showFeedback(message, 'error');
    }

    showFeedback(message, type) {
        // Remover feedback anterior
        const existingFeedback = document.querySelector('.drag-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Criar novo feedback
        const feedback = document.createElement('div');
        feedback.className = `drag-feedback ${type}`;
        feedback.textContent = message;
        feedback.style.position = 'fixed';
        feedback.style.top = '20px';
        feedback.style.left = '50%';
        feedback.style.transform = 'translateX(-50%)';
        feedback.style.padding = '1rem 2rem';
        feedback.style.borderRadius = '25px';
        feedback.style.fontWeight = 'bold';
        feedback.style.zIndex = '2000';
        feedback.style.pointerEvents = 'none';
        
        if (type === 'success') {
            feedback.style.background = '#4CAF50';
            feedback.style.color = 'white';
        } else {
            feedback.style.background = '#f44336';
            feedback.style.color = 'white';
        }
        
        document.body.appendChild(feedback);
        
        // Animar entrada
        feedback.animate([
            {
                opacity: 0,
                transform: 'translateX(-50%) translateY(-20px)'
            },
            {
                opacity: 1,
                transform: 'translateX(-50%) translateY(0)'
            }
        ], {
            duration: 300,
            easing: 'ease-out'
        });
        
        // Remover após 3 segundos
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.animate([
                    {
                        opacity: 1,
                        transform: 'translateX(-50%) translateY(0)'
                    },
                    {
                        opacity: 0,
                        transform: 'translateX(-50%) translateY(-20px)'
                    }
                ], {
                    duration: 300,
                    easing: 'ease-in'
                }).onfinish = () => {
                    feedback.remove();
                };
            }
        }, 3000);
    }

    // Resetar sistema
    reset() {
        // Parar qualquer drag em andamento
        if (this.draggedElement) {
            this.endDrag();
        }
        
        // Limpar feedbacks
        const feedbacks = document.querySelectorAll('.drag-feedback');
        feedbacks.forEach(feedback => feedback.remove());
        
        // Recriar moléculas
        this.recreateMolecules();
    }

    recreateMolecules() {
        // Remover moléculas existentes
        document.querySelectorAll('.water-molecule, .co2-molecule').forEach(molecule => {
            if (molecule.parentNode) {
                molecule.parentNode.removeChild(molecule);
            }
        });
        
        // Recriar moléculas de água
        const waterContainer = document.getElementById('water-molecules');
        for (let i = 0; i < 6; i++) {
            const molecule = document.createElement('div');
            molecule.className = 'molecule water-molecule';
            molecule.dataset.type = 'water';
            molecule.innerHTML = '<span class="molecule-label">H₂O</span>';
            waterContainer.appendChild(molecule);
            this.setupWaterMolecule(molecule, i);
        }
        
        // Recriar moléculas de CO₂
        const co2Container = document.getElementById('co2-molecules');
        for (let i = 0; i < 6; i++) {
            const molecule = document.createElement('div');
            molecule.className = 'molecule co2-molecule';
            molecule.dataset.type = 'co2';
            molecule.innerHTML = '<span class="molecule-label">CO₂</span>';
            co2Container.appendChild(molecule);
            this.setupCO2Molecule(molecule, i);
        }
    }
}

// Exportar classe para uso global
window.MoleculeSystem = MoleculeSystem;

