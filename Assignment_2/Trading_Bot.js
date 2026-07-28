// --- Core Variables for Trading Bot ---
let balance = 1000;
let stockPrice = 100;
let holdings = 0;
let currentRound = 0;

// --- History Lists to Draw the Chart ---
let priceHistory = [100];
let roundHistory = [0];

// --- Variables to Control Automated Runs ---
let isRunning = false;
let intervalId = null;
let currentAssetKey = 'stock'; // Can be: 'stock', 'gold', 'ethereum', 'bitcoin'

// Canvas element references for chart drawing
const canvas = document.getElementById('price-chart');
const ctx = canvas.getContext('2d');

// --- Start/Setup Event Listeners ---
window.addEventListener('load', () => {
  resizeCanvas();
  drawChart();
});

window.addEventListener('resize', () => {
  resizeCanvas();
  drawChart();
});

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * window.devicePixelRatio;
  canvas.height = rect.height * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}


// ===================================================
//      CORE FUNCTIONS REQUIRED BY THE ASSIGNMENT
// ===================================================

/**
 * Randomly generates a stock price depending on the selected asset.
 * For the default Stock asset, the range is strictly 80 to 120.
 */
function updatePrice() {
  if (currentAssetKey === 'stock') {
    // Generate random integer between 80 and 120
    stockPrice = Math.floor(Math.random() * (120 - 80 + 1)) + 80;
  } else if (currentAssetKey === 'gold') {
    // Generate random integer between 160 and 240
    stockPrice = Math.floor(Math.random() * (240 - 160 + 1)) + 160;
  } else if (currentAssetKey === 'ethereum') {
    // Generate random integer between 400 and 600
    stockPrice = Math.floor(Math.random() * (600 - 400 + 1)) + 400;
  } else if (currentAssetKey === 'bitcoin') {
    // Generate random integer between 800 and 1200
    stockPrice = Math.floor(Math.random() * (1200 - 800 + 1)) + 800;
  }
  
  return stockPrice;
}

/**
 * Decides whether to BUY, SELL, or HOLD.
 * For the default Stock asset, it strictly uses buy < 90 and sell > 110 thresholds.
 */
function decideAction(price) {
  if (currentAssetKey === 'stock') {
    if (price < 90) {
      if (balance >= price) {
        return 'BUY';
      }
    } else if (price > 110) {
      if (holdings > 0) {
        return 'SELL';
      }
    }
  } else if (currentAssetKey === 'gold') {
    if (price < 180) {
      if (balance >= price) {
        return 'BUY';
      }
    } else if (price > 220) {
      if (holdings > 0) {
        return 'SELL';
      }
    }
  } else if (currentAssetKey === 'ethereum') {
    if (price < 450) {
      if (balance >= price) {
        return 'BUY';
      }
    } else if (price > 550) {
      if (holdings > 0) {
        return 'SELL';
      }
    }
  } else if (currentAssetKey === 'bitcoin') {
    if (price < 900) {
      if (balance >= price) {
        return 'BUY';
      }
    } else if (price > 1100) {
      if (holdings > 0) {
        return 'SELL';
      }
    }
  }
  
  return 'HOLD';
}

/**
 * Executes a BUY or SELL action by updating balance and holdings.
 */
function trade(action) {
  if (action === 'BUY') {
    balance = balance - stockPrice;
    holdings = holdings + 1;
  } else if (action === 'SELL') {
    balance = balance + stockPrice;
    holdings = holdings - 1;
  }
  // If action is HOLD, do nothing
}


// ===================================================
//      INTERACTIVE LOGIC AND USER INTERFACE UPDATES
// ===================================================

function runSingleRound() {
  // Stop running if 10 rounds are complete
  if (currentRound >= 10) {
    logToTerminal("Simulation completed. Please reset to run again.", "hold");
    return;
  }

  currentRound = currentRound + 1;

  // 1. Keep track of old price to color-code price direction
  const oldPrice = stockPrice;

  // 2. Generate a new price
  updatePrice();

  // 3. Decide action based on current price
  const action = decideAction(stockPrice);

  // 4. Perform the trade
  trade(action);

  // 5. Record values for the chart
  priceHistory.push(stockPrice);
  roundHistory.push(currentRound);

  // 6. Update elements on the screen
  updateUI(oldPrice, action);

  // 7. Format round output line
  let formatAction = action;
  let actionClass = 'hold';
  
  if (action === 'BUY') {
    actionClass = 'buy';
  } else if (action === 'SELL') {
    actionClass = 'sell';
  }

  const portfolioValue = balance + (holdings * stockPrice);
  const logMessage = 'Round ' + currentRound + ': Stock price = <span class="highlight">' + stockPrice + '</span> → Action = <span class="log-badge ' + actionClass + '">' + formatAction + '</span> → Balance = <span class="highlight">' + balance + '</span>, Holdings = <span class="highlight">' + holdings + '</span> → Portfolio Value = <span class="highlight">$' + portfolioValue + '</span>';
  
  logToTerminal(logMessage, actionClass);

  // Redraw chart with new data point
  drawChart();

  // Disable simulation controls on round 10
  if (currentRound >= 10) {
    document.getElementById('run-btn').disabled = true;
    document.getElementById('step-btn').disabled = true;
  }
}

function triggerSimulation() {
  if (isRunning) return;
  
  if (currentRound >= 10) {
    resetSimulation();
  }

  isRunning = true;
  document.getElementById('run-btn').disabled = true;
  document.getElementById('step-btn').disabled = true;
  document.getElementById('reset-btn').disabled = true;

  // Run a round every 500ms
  intervalId = setInterval(() => {
    if (currentRound < 10) {
      runSingleRound();
    } else {
      clearInterval(intervalId);
      isRunning = false;
      document.getElementById('reset-btn').disabled = false;
    }
  }, 500);
}

function resetSimulation() {
  if (intervalId) {
    clearInterval(intervalId);
  }
  isRunning = false;

  // Reset variables to defaults
  balance = 1000;
  holdings = 0;
  currentRound = 0;

  // Define start price based on selected asset
  if (currentAssetKey === 'stock') {
    stockPrice = 100;
  } else if (currentAssetKey === 'gold') {
    stockPrice = 200;
  } else if (currentAssetKey === 'ethereum') {
    stockPrice = 500;
  } else if (currentAssetKey === 'bitcoin') {
    stockPrice = 1000;
  }

  priceHistory = [stockPrice];
  roundHistory = [0];

  // Enable buttons in UI
  document.getElementById('run-btn').disabled = false;
  document.getElementById('step-btn').disabled = false;
  document.getElementById('reset-btn').disabled = false;

  // Reset metrics values in DOM
  document.getElementById('balance-val').innerText = '$' + balance;
  document.getElementById('stock-price-val').innerText = '$' + stockPrice;
  document.getElementById('stock-price-val').className = 'metric-value';
  document.getElementById('holdings-val').innerText = holdings + ' shares';
  document.getElementById('portfolio-val').innerText = '$' + balance;
  document.getElementById('status-badge').innerText = 'Round: 0 / 10';

  // Reset titles and print welcome log message
  const terminal = document.getElementById('terminal-log');
  
  if (currentAssetKey === 'stock') {
    document.getElementById('chart-sub-title').innerText = 'Rounds 0 - 10 (Stock)';
    terminal.innerHTML = '<div class="log-line" style="border-color: var(--border-color); color: var(--text-secondary);">Bot initialized for Stock. Ready to start.</div>';
  } else if (currentAssetKey === 'gold') {
    document.getElementById('chart-sub-title').innerText = 'Rounds 0 - 10 (Gold)';
    terminal.innerHTML = '<div class="log-line" style="border-color: var(--border-color); color: var(--text-secondary);">Bot initialized for Gold. Ready to start.</div>';
  } else if (currentAssetKey === 'ethereum') {
    document.getElementById('chart-sub-title').innerText = 'Rounds 0 - 10 (Ethereum)';
    terminal.innerHTML = '<div class="log-line" style="border-color: var(--border-color); color: var(--text-secondary);">Bot initialized for Ethereum. Ready to start.</div>';
  } else if (currentAssetKey === 'bitcoin') {
    document.getElementById('chart-sub-title').innerText = 'Rounds 0 - 10 (Bitcoin)';
    terminal.innerHTML = '<div class="log-line" style="border-color: var(--border-color); color: var(--text-secondary);">Bot initialized for Bitcoin. Ready to start.</div>';
  }

  drawChart();
}

function changeAsset(value) {
  currentAssetKey = value;
  resetSimulation();
}

function updateUI(oldPrice, action) {
  // Update texts
  document.getElementById('balance-val').innerText = '$' + balance;
  document.getElementById('holdings-val').innerText = holdings + ' shares';
  
  const priceVal = document.getElementById('stock-price-val');
  priceVal.innerText = '$' + stockPrice;
  
  // Set price text color depending on price changes
  if (stockPrice > oldPrice) {
    priceVal.className = 'metric-value price-up';
  } else if (stockPrice < oldPrice) {
    priceVal.className = 'metric-value price-down';
  } else {
    priceVal.className = 'metric-value';
  }

  // Portfolio = Balance + Holdings * Current Asset Price
  const portfolioValue = balance + (holdings * stockPrice);
  document.getElementById('portfolio-val').innerText = '$' + portfolioValue;

  document.getElementById('status-badge').innerText = 'Round: ' + currentRound + ' / 10';
}

function logToTerminal(message, typeClass) {
  const terminal = document.getElementById('terminal-log');
  const logLine = document.createElement('div');
  logLine.className = 'log-line ' + typeClass;
  logLine.innerHTML = message;
  terminal.appendChild(logLine);
  terminal.scrollTop = terminal.scrollHeight;
}

// --- Custom Canvas Line Chart Drawing ---
function drawChart() {
  const rect = canvas.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  // Clear Canvas
  ctx.clearRect(0, 0, width, height);

  // Set chart padding margins
  const padding = { top: 25, right: 15, bottom: 25, left: 30 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Set chart bounds depending on selected asset
  let yMin = 80;
  let yMax = 120;

  if (currentAssetKey === 'stock') {
    yMin = 80;
    yMax = 120;
  } else if (currentAssetKey === 'gold') {
    yMin = 160;
    yMax = 240;
  } else if (currentAssetKey === 'ethereum') {
    yMin = 400;
    yMax = 600;
  } else if (currentAssetKey === 'bitcoin') {
    yMin = 800;
    yMax = 1200;
  }

  const yRange = yMax - yMin;

  // Draw grid line indicators
  ctx.strokeStyle = '#27272a';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#a1a1aa';
  ctx.font = '10px Inter';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  const step = yRange / 4;
  const gridTicks = [yMin, yMin + step, yMin + 2 * step, yMin + 3 * step, yMax];
  
  gridTicks.forEach(tick => {
    const y = padding.top + chartHeight - ((tick - yMin) / yRange) * chartHeight;
    
    // Draw horizontal grid line
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    // Draw grid tick text
    ctx.fillText(Math.round(tick), padding.left - 8, y);
  });

  // Draw X-axis ticks (Rounds 0 to 10)
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  for (let i = 0; i <= 10; i++) {
    const x = padding.left + (i / 10) * chartWidth;
    
    ctx.beginPath();
    ctx.moveTo(x, padding.top + chartHeight);
    ctx.lineTo(x, padding.top + chartHeight + 4);
    ctx.stroke();

    if (i % 2 === 0 || i === 10) {
      ctx.fillText('R' + i, x, padding.top + chartHeight + 6);
    }
  }

  // Draw historical price lines
  if (priceHistory.length > 0) {
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    
    // Gradient: White to Zinc
    const grad = ctx.createLinearGradient(padding.left, 0, width - padding.right, 0);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(1, '#a1a1aa');
    ctx.strokeStyle = grad;

    priceHistory.forEach((price, idx) => {
      const x = padding.left + (idx / 10) * chartWidth;
      const y = padding.top + chartHeight - ((price - yMin) / yRange) * chartHeight;
      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Draw dots at data points
    priceHistory.forEach((price, idx) => {
      const x = padding.left + (idx / 10) * chartWidth;
      const y = padding.top + chartHeight - ((price - yMin) / yRange) * chartHeight;
      
      ctx.beginPath();
      if (idx === priceHistory.length - 1) {
        // Last point glow (White accent)
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffffff';
      } else {
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#a1a1aa';
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    });
    ctx.shadowBlur = 0; // reset shadow
  }
}
