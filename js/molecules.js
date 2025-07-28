// Sistema de gerenciamento de moléculas
class MoleculeManager {
    constructor() {
        this.molecules = [];
        this.draggedMolecule = null;
        this.dragOffset = { x: 0, y: 0 };
        this.waterCollected = 0;
        this.co2Collected = 0;
        this.maxWater = 6;
        this.maxCO2 = 6;
        
        this.init();
    }
    
    init() {
        this.createWaterMolecules();
        this.createCO2Molecules();
        this.setupEventListeners();
    }
    
    // Criar moléculas de água (H2O)
    createWaterMolecules() {
        const waterContainer = document.getElementById('water-molecules');
        
        for (let i = 0; i < this.maxWater; i++) {
            const molecule = this.createWaterMolecule(i);
            waterContainer.appendChild(molecule);
            this.molecules.push({
                element: molecule,
                type: 'water',
                collected: false,
                id: i
            });
        }
    }
    
    createWaterMolecule(id) {
        const molecule = document.createElement('div');
        molecule.className = 'molecule water-molecule';
        molecule.setAttribute('data-type', 'water');
        molecule.setAttribute('data-id', id);
        molecule.draggable = true;
        
        // Criar estrutura H2O (H-O-H)
        const hydrogen1 = document.createElement('div');
        hydrogen1.className = 'water-atom hydrogen';
        hydrogen1.textContent = 'H';
        
        const oxygen = document.createElement('div');
        oxygen.className = 'water-atom oxygen';
        oxygen.textContent = 'O';
        
        const hydrogen2 = document.createElement('div');
        hydrogen2.className = 'water-atom hydrogen';
        hydrogen2.textContent = 'H';
        
        molecule.appendChild(hydrogen1);
        molecule.appendChild(oxygen);
        molecule.appendChild(hydrogen2);
        
        return molecule;
    }
    
    // Criar moléculas de CO2
    createCO2Molecules() {
        const co2Container = document.getElementById('co2-molecules');
        
        for (let i = 0; i < this.maxCO2; i++) {
            const molecule = this.createCO2Molecule(i);
            co2Container.appendChild(molecule);
            this.molecules.push({
                element: molecule,
                type: 'co2',
                collected: false,
                id: i
            });
        }
    }
    
    createCO2Molecule(id) {
        const molecule = document.createElement('div');
        molecule.className = 'molecule co2-molecule';
        molecule.setAttribute('data-type', 'co2');
        molecule.setAttribute('data-id', id);
        molecule.draggable = true;
        
        // Criar estrutura CO2 (O-C-O)
        const oxygen1 = document.createElement('div');
        oxygen1.className = 'water-atom co2-oxygen';
        oxygen1.textContent = 'O';
        
        const carbon = document.createElement('div');
        carbon.className = 'water-atom carbon';
        carbon.textContent = 'C';
        
        const oxygen2 = document.createElement('div');
        oxygen2.className = 'water-atom co2-oxygen';
        oxygen2.textContent = 'O';
        
        molecule.appendChild(oxygen1);
        molecule.appendChild(carbon);
        molecule.appendChild(oxygen2);
        
        return molecule;
    }
    
    // Configurar event listeners para drag and drop
    setupEventListeners() {
        // Mouse events para desktop
        document.addEventListener('mousedown', this.handleMouseDown.bind(this));
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this));
        
        // Touch events para mobile
        document.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Prevenir comportamento padrão de drag
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('molecule')) {
                e.preventDefault();
            }
        });
    }
    
    // Handlers para mouse
    handleMouseDown(e) {
        if (e.target.closest('.molecule')) {
            this.startDrag(e.target.closest('.molecule'), e.clientX, e.clientY);
            e.preventDefault();
        }
    }
    
    handleMouseMove(e) {
        if (this.draggedMolecule) {
            this.updateDragPosition(e.clientX, e.clientY);
            e.preventDefault();
        }
    }
    
    handleMouseUp(e) {
        if (this.draggedMolecule) {
            this.endDrag(e.clientX, e.clientY);
        }
    }
    
    // Handlers para touch
    handleTouchStart(e) {
        if (e.target.closest('.molecule')) {
            const touch = e.touches[0];
            this.startDrag(e.target.closest('.molecule'), touch.clientX, touch.clientY);
            e.preventDefault();
        }
    }
    
    handleTouchMove(e) {
        if (this.draggedMolecule) {
            const touch = e.touches[0];
            this.updateDragPosition(touch.clientX, touch.clientY);
            e.preventDefault();
        }
    }
    
    handleTouchEnd(e) {
        if (this.draggedMolecule) {
            const touch = e.changedTouches[0];
            this.endDrag(touch.clientX, touch.clientY);
        }
    }
    
    // Iniciar arraste
    startDrag(moleculeElement, clientX, clientY) {
        const moleculeData = this.molecules.find(m => m.element === moleculeElement);
        
        if (!moleculeData || moleculeData.collected) {
            return;
        }
        
        this.draggedMolecule = moleculeData;
        
        const rect = moleculeElement.getBoundingClientRect();
        this.dragOffset.x = clientX - rect.left;
        this.dragOffset.y = clientY - rect.top;
        
        moleculeElement.classList.add('dragging');
        moleculeElement.style.position = 'fixed';
        moleculeElement.style.zIndex = '1000';
        moleculeElement.style.pointerEvents = 'none';
        
        this.updateDragPosition(clientX, clientY);
    }
    
    // Atualizar posição durante arraste
    updateDragPosition(clientX, clientY) {
        if (!this.draggedMolecule) return;
        
        const element = this.draggedMolecule.element;
        element.style.left = (clientX - this.dragOffset.x) + 'px';
        element.style.top = (clientY - this.dragOffset.y) + 'px';
        
        // Verificar se está sobre uma zona de drop válida
        this.checkDropZones(clientX, clientY);
    }
    
    // Verificar zonas de drop
    checkDropZones(clientX, clientY) {
        const elementBelow = document.elementFromPoint(clientX, clientY);
        
        // Remover highlight de todas as zonas
        document.querySelectorAll('.drop-zone-highlight').forEach(zone => {
            zone.classList.remove('drop-zone-highlight');
        });
        
        if (!elementBelow) return;
        
        const dropZone = elementBelow.closest('.water-absorption-zone, .photosynthesis-zone');
        if (dropZone) {
            const moleculeType = this.draggedMolecule.type;
            
            // Verificar se é a zona correta para o tipo de molécula
            if ((moleculeType === 'water' && dropZone.classList.contains('water-absorption-zone')) ||
                (moleculeType === 'co2' && dropZone.classList.contains('photosynthesis-zone'))) {
                dropZone.classList.add('drop-zone-highlight');
            }
        }
    }
    
    // Finalizar arraste
    endDrag(clientX, clientY) {
        if (!this.draggedMolecule) return;
        
        const element = this.draggedMolecule.element;
        const elementBelow = document.elementFromPoint(clientX, clientY);
        
        // Remover classes de arraste
        element.classList.remove('dragging');
        element.style.position = '';
        element.style.zIndex = '';
        element.style.pointerEvents = '';
        element.style.left = '';
        element.style.top = '';
        
        // Verificar se foi solto em uma zona válida
        if (elementBelow) {
            const dropZone = elementBelow.closest('.water-absorption-zone, .photosynthesis-zone');
            if (dropZone) {
                this.handleDrop(dropZone);
            }
        }
        
        // Remover highlight de todas as zonas
        document.querySelectorAll('.drop-zone-highlight').forEach(zone => {
            zone.classList.remove('drop-zone-highlight');
        });
        
        this.draggedMolecule = null;
    }
    
    // Processar drop em zona válida
    handleDrop(dropZone) {
        const moleculeType = this.draggedMolecule.type;
        
        // Verificar se é a zona correta e se ainda há espaço
        if (moleculeType === 'water' && dropZone.classList.contains('water-absorption-zone') && this.waterCollected < this.maxWater) {
            this.collectWaterMolecule();
        } else if (moleculeType === 'co2' && dropZone.classList.contains('photosynthesis-zone') && this.co2Collected < this.maxCO2) {
            this.collectCO2Molecule();
        }
    }
    
    // Coletar molécula de água
    collectWaterMolecule() {
        this.draggedMolecule.collected = true;
        this.draggedMolecule.element.style.display = 'none';
        this.waterCollected++;
        
        this.updateProgressDisplay();
        this.animateWaterToLeaf();
        
        // Verificar se pode iniciar fotossíntese
        this.checkPhotosynthesisConditions();
    }
    
    // Coletar molécula de CO2
    collectCO2Molecule() {
        this.draggedMolecule.collected = true;
        this.draggedMolecule.element.style.display = 'none';
        this.co2Collected++;
        
        this.updateProgressDisplay();
        
        // Verificar se pode iniciar fotossíntese
        this.checkPhotosynthesisConditions();
    }
    
    // Atualizar display de progresso
    updateProgressDisplay() {
        document.getElementById('water-count').textContent = `${this.waterCollected}/${this.maxWater}`;
        document.getElementById('co2-count').textContent = `${this.co2Collected}/${this.maxCO2}`;
    }
    
    // Animar água subindo para a folha
    animateWaterToLeaf() {
        const waterDrop = document.createElement('div');
        waterDrop.className = 'water-animation';
        waterDrop.innerHTML = '💧';
        waterDrop.style.position = 'absolute';
        waterDrop.style.fontSize = '20px';
        waterDrop.style.zIndex = '100';
        
        const roots = document.querySelector('.roots-container');
        const leaf = document.querySelector('.photosynthesis-zone');
        
        if (roots && leaf) {
            const rootsRect = roots.getBoundingClientRect();
            const leafRect = leaf.getBoundingClientRect();
            const gardenRect = document.querySelector('.garden-scene').getBoundingClientRect();
            
            waterDrop.style.left = (rootsRect.left - gardenRect.left + 20) + 'px';
            waterDrop.style.bottom = '20px';
            
            document.querySelector('.garden-scene').appendChild(waterDrop);
            
            // Animar movimento para cima
            setTimeout(() => {
                waterDrop.style.transition = 'all 2s ease-in-out';
                waterDrop.style.left = (leafRect.left - gardenRect.left + 30) + 'px';
                waterDrop.style.bottom = (gardenRect.height - leafRect.top + gardenRect.top - 50) + 'px';
                waterDrop.style.opacity = '0';
                
                setTimeout(() => {
                    waterDrop.remove();
                }, 2000);
            }, 100);
        }
    }
    
    // Verificar condições para fotossíntese
    checkPhotosynthesisConditions() {
        const hasWater = this.waterCollected > 0;
        const hasCO2 = this.co2Collected > 0;
        const hasSunlight = window.gameLogic && window.gameLogic.isDaytime();
        
        if (hasWater && hasCO2 && hasSunlight) {
            this.triggerPhotosynthesis();
        }
    }
    
    // Disparar processo de fotossíntese
    triggerPhotosynthesis() {
        if (this.waterCollected > 0 && this.co2Collected > 0) {
            // Consumir uma molécula de cada
            this.waterCollected--;
            this.co2Collected--;
            this.updateProgressDisplay();
            
            // Notificar o sistema de jogo
            if (window.gameLogic) {
                window.gameLogic.processPhotosynthesis();
            }
            
            // Criar bolhas de oxigênio
            this.createOxygenBubbles();
        }
    }
    
    // Criar bolhas de oxigênio
    createOxygenBubbles() {
        const oxygenContainer = document.querySelector('.oxygen-bubbles');
        
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const bubble = document.createElement('div');
                bubble.className = 'oxygen-bubble';
                bubble.style.animationDelay = (i * 0.5) + 's';
                oxygenContainer.appendChild(bubble);
                
                setTimeout(() => {
                    bubble.remove();
                }, 3000);
            }, i * 200);
        }
    }
    
    // Resetar moléculas
    reset() {
        this.waterCollected = 0;
        this.co2Collected = 0;
        
        this.molecules.forEach(molecule => {
            molecule.collected = false;
            molecule.element.style.display = '';
        });
        
        this.updateProgressDisplay();
        
        // Limpar animações
        document.querySelectorAll('.water-animation').forEach(el => el.remove());
        document.querySelectorAll('.oxygen-bubble').forEach(el => el.remove());
    }
}

// Exportar para uso global
window.MoleculeManager = MoleculeManager;

