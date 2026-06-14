/* Global State */
let gameState = {
    studentName: '',
    currentScreen: 'screen1',
    placedComponents: {},
    connections: [],
    systemTested: false,
    experimentComponent: null,
};

const componentOrder = ['panel-surya', 'scc', 'baterai', 'inverter', 'lampu'];
const energyPath = ['matahari-out', 'panel-in', 'panel-out', 'scc-in', 'scc-out', 'baterai-in', 'baterai-out', 'inverter-in', 'inverter-out', 'lampu-in'];

/* Navigation */
function goToScreen(screenId) {
    const currentScreen = document.querySelector('.screen.active');
    if (currentScreen) {
        currentScreen.classList.remove('active');
    }
    document.getElementById(screenId).classList.add('active');
    gameState.currentScreen = screenId;
}

function startSimulation() {
    const nameInput = document.getElementById('studentName');
    if (!nameInput.value.trim()) {
        alert('Mohon masukkan nama terlebih dahulu!');
        return;
    }
    gameState.studentName = nameInput.value.trim();
    goToScreen('screen4');
}

function exitSimulation() {
    gameState = {
        studentName: '',
        currentScreen: 'screen1',
        placedComponents: {},
        connections: [],
        systemTested: false,
        experimentComponent: null,
    };
    goToScreen('screen1');
}

/* Screen 4: Drag and Drop */
let draggedComponent = null;
let dragSource = null;

document.addEventListener('dragstart', (e) => {
    if (e.target.classList.contains('draggable-component')) {
        draggedComponent = e.target.dataset.component;
        dragSource = 'panel';
        e.dataTransfer.effectAllowed = 'move';
    }
});

document.addEventListener('dragover', (e) => {
    if (draggedComponent && e.target.classList.contains('drop-zone')) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        e.target.style.backgroundColor = 'rgba(244, 197, 66, 0.3)';
    }
});

document.addEventListener('dragleave', (e) => {
    if (e.target.classList.contains('drop-zone')) {
        e.target.style.backgroundColor = '';
    }
});

document.addEventListener('drop', (e) => {
    if (e.target.classList.contains('drop-zone')) {
        e.preventDefault();
        const zone = e.target.closest('.drop-zone');
        if (zone) {
            placeComponent(draggedComponent, zone);
        }
    }
    draggedComponent = null;
    dragSource = null;
});

function placeComponent(componentName, zone) {
    const expectedComponent = zone.dataset.component;

    if (componentName === expectedComponent) {
        zone.classList.add('filled');
        zone.style.borderColor = '#6D8F2E';
        gameState.placedComponents[componentName] = true;

        showFeedback('✓ Benar', 'success', 'feedback-message');
        playSound('success');

        if (Object.keys(gameState.placedComponents).length === componentOrder.length) {
            setTimeout(() => {
                goToScreen('screen5');
            }, 1000);
        }
    } else {
        zone.classList.add('error');
        showFeedback('✗ Coba Lagi', 'error', 'feedback-message');
        playSound('error');

        setTimeout(() => {
            zone.classList.remove('error');
        }, 400);
    }
}

function showFeedback(message, type, elementId) {
    const feedback = document.getElementById(elementId);
    feedback.textContent = message;
    feedback.className = `feedback-message ${type}`;

    setTimeout(() => {
        feedback.textContent = '';
        feedback.className = 'feedback-message';
    }, 2000);
}

/* Screen 5: Cable Connections */
let connectionMode = null;
let selectedNode = null;
let canvas = null;
let ctx = null;

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('connectionCanvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
    }
});

function resizeCanvas() {
    if (!canvas) return;
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    redrawConnections();
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('connection-node')) {
        selectNode(e.target);
    }
});

function selectNode(node) {
    const nodeId = node.dataset.node;

    if (!selectedNode) {
        selectedNode = node;
        node.style.boxShadow = '0 0 15px rgba(244, 197, 66, 0.8)';
    } else if (selectedNode === node) {
        selectedNode.style.boxShadow = '';
        selectedNode = null;
    } else {
        createConnection(selectedNode.dataset.node, nodeId);
        selectedNode.style.boxShadow = '';
        selectedNode = null;
    }
}

function createConnection(fromNode, toNode) {
    // Validate connection
    const fromIndex = energyPath.indexOf(fromNode);
    const toIndex = energyPath.indexOf(toNode);

    if (fromIndex >= 0 && toIndex > fromIndex && toIndex === fromIndex + 1) {
        gameState.connections.push({ from: fromNode, to: toNode });
        redrawConnections();
        showFeedback('✓ Kabel Terhubung', 'success', 'feedback-message-5');
        playSound('success');
    } else {
        showFeedback('✗ Sambungan Salah', 'error', 'feedback-message-5');
        playSound('error');
    }
}

function redrawConnections() {
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    gameState.connections.forEach((conn, index) => {
        const fromNode = document.querySelector(`[data-node="${conn.from}"]`);
        const toNode = document.querySelector(`[data-node="${conn.to}"]`);

        if (fromNode && toNode) {
            const fromRect = fromNode.getBoundingClientRect();
            const toRect = toNode.getBoundingClientRect();
            const canvasRect = canvas.getBoundingClientRect();

            const fromX = fromRect.left - canvasRect.left + fromRect.width / 2;
            const fromY = fromRect.top - canvasRect.top + fromRect.height / 2;
            const toX = toRect.left - canvasRect.left + toRect.width / 2;
            const toY = toRect.top - canvasRect.top + toRect.height / 2;

            // Determine cable color based on whether it's positive or negative
            const isPositive = index % 2 === 0;
            ctx.strokeStyle = isPositive ? '#e74c3c' : '#2c3e50';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            ctx.beginPath();
            ctx.moveTo(fromX, fromY);
            ctx.quadraticCurveTo((fromX + toX) / 2, (fromY + toY) / 2 + 30, toX, toY);
            ctx.stroke();
        }
    });
}

function checkConnections() {
    if (gameState.connections.length === energyPath.length - 1) {
        showFeedback('✓ Semua Kabel Terhubung', 'success', 'feedback-message-5');
        playSound('success');
        setTimeout(() => {
            goToScreen('screen6');
        }, 1000);
    } else {
        showFeedback('✗ Belum Semua Kabel Terhubung', 'error', 'feedback-message-5');
        playSound('error');
    }
}

function resetConnections() {
    gameState.connections = [];
    selectedNode = null;
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    showFeedback('Kabel Direset', 'success', 'feedback-message-5');
}

window.addEventListener('resize', resizeCanvas);

/* Screen 6: Test System */
function testSystem() {
    const sequenceItems = document.querySelectorAll('.sequence-item');
    let delay = 500;

    sequenceItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('active');
            playSound('success');

            if (index === sequenceItems.length - 1) {
                setTimeout(() => {
                    goToScreen('screen7');
                }, 1000);
            }
        }, delay + index * 400);
    });
}

/* Screen 8: Experiment */
function removeComponent() {
    const selected = document.querySelector('input[name="component-remove"]:checked');
    if (!selected) {
        alert('Pilih komponen terlebih dahulu');
        return;
    }

    gameState.experimentComponent = selected.value;
    updateExperimentResult();
}

function updateExperimentResult() {
    const component = gameState.experimentComponent;
    const house = document.getElementById('experiment-house');
    const observation = document.getElementById('observation-result');

    const results = {
        'panel-surya': {
            text: 'Lampu tidak menyala saat siang hari.\nTanpa panel surya, tidak ada energi yang dihasilkan dari matahari.\nSistem berhenti bekerja sepenuhnya.',
            dark: false
        },
        'scc': {
            text: 'Arus listrik dari panel surya menjadi tidak stabil.\nBaterai tidak terisi dengan optimal.\nLampu berkedip-kedip atau tidak menyala dengan terang.',
            dark: true
        },
        'baterai': {
            text: 'Lampu tidak menyala saat malam hari.\nEnergian tidak tersimpan tanpa baterai.\nSistem hanya bekerja ketika ada sinar matahari langsung.',
            dark: true
        },
        'inverter': {
            text: 'Lampu tidak dapat menyala karena tegangan tidak dikonversi.\nDC tidak dapat diubah menjadi AC.\nEnergian tidak dapat digunakan untuk alat rumah tangga biasa.',
            dark: true
        }
    };

    if (results[component]) {
        observation.textContent = results[component].text;
        if (results[component].dark) {
            house.classList.add('dark');
        } else {
            house.classList.remove('dark');
        }
        playSound('success');
    }
}

/* Screen 9: Completion */
document.addEventListener('DOMContentLoaded', () => {
    const completionNameEl = document.getElementById('completion-name');
    if (completionNameEl && gameState.studentName) {
        completionNameEl.textContent = gameState.studentName;
    }
});

/* Sound Effects */
function playSound(type) {
    // Placeholder for sound effects
    // In production, use Web Audio API or <audio> elements
    console.log(`Playing sound: ${type}`);
}

/* Animations */
function createParticles() {
    const container = document.querySelector('.success-animation');
    if (!container) return;

    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
        container.appendChild(particle);

        setTimeout(() => particle.remove(), 3000);
    }
}

// Hook into screen 7 to create particles
const originalGoToScreen = goToScreen;
goToScreen = function(screenId) {
    if (screenId === 'screen7') {
        createParticles();
    }
    originalGoToScreen(screenId);
};

/* Initialize */
document.addEventListener('DOMContentLoaded', () => {
    // Set completion name when navigating to screen 9
    document.addEventListener('click', (e) => {
        if (e.target.textContent === 'SELESAI' && gameState.currentScreen === 'screen8') {
            const completionName = document.getElementById('completion-name');
            if (completionName && gameState.studentName) {
                completionName.textContent = gameState.studentName;
            }
        }
    });
});
