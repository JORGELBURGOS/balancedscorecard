// Configuración de la API de Google Sheets
const SHEET_ID = '1MOUt-fhusC7z3F0axUmglV4r500IaJuerdngvVJSJ5E';
const API_KEY = 'AIzaSyD4F0D5q5n3Qz5q5n3Qz5q5n3Qz5q5n3Qz'; // Reemplaza con tu API key
const SHEET_NAME = 'Datos BSC';

// Mapeo de perspectivas y polaridad
const PERSPECTIVES_MAP = {
  // ================== FINANCIAL (13 indicadores) ==================
  "Margen Neto": { perspectiva: "Financial", polaridad: "positivo" },
  "ROI": { perspectiva: "Financial", polaridad: "positivo" },
  "ROE": { perspectiva: "Financial", polaridad: "positivo" },
  "Liquidez Corriente": { perspectiva: "Financial", polaridad: "positivo" },
  "Endeudamiento Total": { perspectiva: "Financial", polaridad: "negativo" },
  "Rotación de Inventarios": { perspectiva: "Financial", polaridad: "positivo" },
  "EBITDA": { perspectiva: "Financial", polaridad: "positivo" },
  "Flujo de Caja Operativo": { perspectiva: "Financial", polaridad: "positivo" },
  "Rentabilidad sobre Ventas": { perspectiva: "Financial", polaridad: "positivo" },
  "Días de Cobranza Promedio": { perspectiva: "Financial", polaridad: "negativo" },
  "Margen Bruto": { perspectiva: "Financial", polaridad: "positivo" },
  "Costos Fijos/Variables": { perspectiva: "Financial", polaridad: "negativo" },
  "Crecimiento de Ingresos": { perspectiva: "Financial", polaridad: "positivo" },

  // ================== CUSTOMER (18 indicadores) ==================
  "Satisfacción del Cliente": { perspectiva: "Customer", polaridad: "positivo" },
  "NPS (Net Promoter Score)": { perspectiva: "Customer", polaridad: "positivo" },
  "Tasa de Retención de Clientes": { perspectiva: "Customer", polaridad: "positivo" },
  "Tasa de Recompra": { perspectiva: "Customer", polaridad: "positivo" },
  "Market Share": { perspectiva: "Customer", polaridad: "positivo" },
  "Tiempo de Respuesta a Consultas": { perspectiva: "Customer", polaridad: "negativo" },
  "Quejas Mensuales": { perspectiva: "Customer", polaridad: "negativo" },
  "Clientes Nuevos Adquiridos": { perspectiva: "Customer", polaridad: "positivo" },
  "Ticket Promedio": { perspectiva: "Customer", polaridad: "positivo" },
  "Índice de Fidelización": { perspectiva: "Customer", polaridad: "positivo" },
  "Encuestas de Satisfacción Resueltas": { perspectiva: "Customer", polaridad: "positivo" },
  "Reclamos Resueltos en Tiempo": { perspectiva: "Customer", polaridad: "positivo" },
  "Tiempo de Espera en Atención": { perspectiva: "Customer", polaridad: "negativo" },
  "Efectividad de Soporte Técnico": { perspectiva: "Customer", polaridad: "positivo" },
  "Clientes Referidos": { perspectiva: "Customer", polaridad: "positivo" },
  "Tasa de Uso de App/Plataforma": { perspectiva: "Customer", polaridad: "positivo" },
  "Satisfacción Post-Venta": { perspectiva: "Customer", polaridad: "positivo" },
  "Tasa de Cancelación": { perspectiva: "Customer", polaridad: "negativo" },

  // ================== INTERNAL PROCESSES (22 indicadores) ==================
  "Eficiencia de Producción": { perspectiva: "InternalProcesses", polaridad: "positivo" },
  "Tiempo de Ciclo de Fabricación": { perspectiva: "InternalProcesses", polaridad: "negativo" },
  "Defectos por Millón de Unidades": { perspectiva: "InternalProcesses", polaridad: "negativo" },
  "Tiempo de Entrega Promedio": { perspectiva: "InternalProcesses", polaridad: "negativo" },
  "Órdenes Completadas Correctamente": { perspectiva: "InternalProcesses", polaridad: "positivo" },
  "Utilización de Maquinaria": { perspectiva: "InternalProcesses", polaridad: "positivo" },
  "Nivel de Inventario de Seguridad": { perspectiva: "InternalProcesses", polaridad: "positivo" },
  "Tiempo Medio de Reparación": { perspectiva: "InternalProcesses", polaridad: "negativo" },
  "Porcentaje de Desperdicios": { perspectiva: "InternalProcesses", polaridad: "negativo" },
  "Entregas Tardías": { perspectiva: "InternalProcesses", polaridad: "negativo" },
  "Proyectos Completados en Tiempo": { perspectiva: "InternalProcesses", polaridad: "positivo" },
  "Requisitos Cumplidos en Productos": { perspectiva: "InternalProcesses", polaridad: "positivo" },
  "Tiempo de Desarrollo de Nuevos Productos": { perspectiva: "InternalProcesses", polaridad: "negativo" },
  "Estandarización de Procesos": { perspectiva: "InternalProcesses", polaridad: "positivo" },
  "Documentación de Procesos Actualizada": { perspectiva: "InternalProcesses", polaridad: "positivo" },
  "Nivel de Automatización": { perspectiva: "InternalProcesses", polaridad: "positivo" },
  "Capacidad Ociosa": { perspectiva: "InternalProcesses", polaridad: "negativo" },
  "Reclamos Internos Resueltos": { perspectiva: "InternalProcesses", polaridad: "positivo" },
  "Efectividad de Reuniones": { perspectiva: "InternalProcesses", polaridad: "positivo" },
  "Procesos Optimizados": { perspectiva: "InternalProcesses", polaridad: "positivo" },
  "Tasa de Accidentes Laborales": { perspectiva: "InternalProcesses", polaridad: "negativo" },
  "Cumplimiento de Normativas": { perspectiva: "InternalProcesses", polaridad: "positivo" },

  // ================== LEARNING & GROWTH (7 indicadores) ==================
  "Horas de Capacitación por Empleado": { perspectiva: "LearningGrowth", polaridad: "positivo" },
  "Retención de Talento Clave": { perspectiva: "LearningGrowth", polaridad: "positivo" },
  "Índice de Satisfacción Laboral": { perspectiva: "LearningGrowth", polaridad: "positivo" },
  "Ideas Implementadas por Empleado": { perspectiva: "LearningGrowth", polaridad: "positivo" },
  "Tasa de Promoción Interna": { perspectiva: "LearningGrowth", polaridad: "positivo" },
  "Adopción de Nuevas Tecnologías": { perspectiva: "LearningGrowth", polaridad: "positivo" },
  "Participación en Programas de Desarrollo": { perspectiva: "LearningGrowth", polaridad: "positivo" },

  // ================== SUSTAINABILITY (4 indicadores) ==================
  "Huella de Carbono": { perspectiva: "Sustainability", polaridad: "negativo" },
  "Porcentaje de Energía Renovable": { perspectiva: "Sustainability", polaridad: "positivo" },
  "Diversidad en Puestos Gerenciales": { perspectiva: "Sustainability", polaridad: "positivo" },
  "Horas de Voluntariado Corporativo": { perspectiva: "Sustainability", polaridad: "positivo" }
};

// Función para cargar datos de Google Sheets
async function fetchSheetData() {
  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`);
    const data = await response.json();
    return data.values;
  } catch (error) {
    console.error('Error fetching data:', error);
    showError('Error al cargar datos de Google Sheets');
    return null;
  }
}

// Función principal para cargar datos
async function loadData() {
  const periodo = document.getElementById("periodo").value;
  const comparacion = document.getElementById("comparacion").value;
  
  // Mostrar loading con animación
  document.querySelectorAll(".metrics-container").forEach(el => {
    if (el) {
      el.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i> Cargando datos...</div>';
    }
  });
  
  // Ocultar resumen y período hasta tener nuevos datos
  const periodDisplay = document.getElementById("periodDisplay");
  const errorContainer = document.getElementById("errorContainer");
  
  if (periodDisplay) periodDisplay.style.display = "none";
  if (errorContainer) errorContainer.style.display = "none";
  
  // Mostrar animación de carga en las tarjetas de resumen
  document.querySelectorAll('.summary-value').forEach(el => {
    el.textContent = '...';
    el.className = 'summary-value';
  });
  
  try {
    const sheetData = await fetchSheetData();
    if (!sheetData) return;
    
    const headers = sheetData[0];
    const rows = sheetData.slice(1);
    
    // Procesar parámetros de fecha
    const periodoActual = periodo;
    let periodoComparacion = "";
    
    // Determinar período de comparación
    if (comparacion === "Año Anterior") {
      const [mes, anio] = periodoActual.split('-');
      periodoComparacion = `${mes}-${parseInt(anio)-1}`;
    } 
    else if (comparacion === "Trimestre Anterior") {
      const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const [mesActual, anioActual] = periodoActual.split('-');
      const mesIndex = meses.indexOf(mesActual);
      let mesComparacion = meses[(mesIndex - 3 + 12) % 12];
      let anioComparacion = anioActual;
      if (mesIndex - 3 < 0) {
        anioComparacion = parseInt(anioActual) - 1;
      }
      periodoComparacion = `${mesComparacion}-${anioComparacion}`;
    }
    else if (comparacion === "Budget") {
      periodoComparacion = `Budget ${periodoActual}`;
    }
    
    // Encontrar columnas
    const actualCol = headers.findIndex(h => h.includes(`Actual ${periodoActual}`));
    const compareCol = headers.findIndex(h => h.includes(periodoComparacion));
    const metaCol = headers.indexOf("Meta");
    const polaridadCol = headers.indexOf("Polaridad");
    
    if (actualCol === -1) {
      showError(`Período actual '${periodoActual}' no encontrado.`);
      return;
    }
    
    if (compareCol === -1) {
      showError(`Período de comparación '${periodoComparacion}' no encontrado.`);
      return;
    }
    
    // Procesar datos
    const results = [];
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const actualValue = parseFloat(row[actualCol]);
      const compareValue = parseFloat(row[compareCol]);
      const metaValue = metaCol !== -1 ? parseFloat(row[metaCol]) : null;
      const polaridad = polaridadCol !== -1 ? row[polaridadCol] : "positivo";
      
      // Calcular diferencia absoluta
      const diferenciaAbsoluta = actualValue - compareValue;
      
      // Determinar si es favorable según la polaridad
      let esFavorable;
      if (polaridad === "negativo") {
        esFavorable = actualValue < compareValue; // Menor es mejor
      } else {
        esFavorable = actualValue > compareValue; // Mayor es mejor
      }
      
      // Calcular diferencia para mostrar (siempre valor absoluto)
      const diferenciaMostrar = Math.abs(diferenciaAbsoluta);
      
      // Calcular cumplimiento dinámico según comparación seleccionada
      let cumplimiento = null;
      if (compareValue !== 0 && !isNaN(compareValue)) {
        if (polaridad === "negativo") {
          // Para indicadores "menor es mejor"
          if (actualValue <= compareValue) {
            // Mejor que el valor de comparación
            cumplimiento = 100 + ((compareValue - actualValue) / compareValue) * 100;
          } else {
            // Peor que el valor de comparación
            cumplimiento = 100 - ((actualValue - compareValue) / compareValue) * 100;
          }
        } else {
          // Para indicadores "mayor es mejor"
          if (actualValue >= compareValue) {
            // Mejor que el valor de comparación
            cumplimiento = 100 + ((actualValue - compareValue) / compareValue) * 100;
          } else {
            // Peor que el valor de comparación
            cumplimiento = (actualValue / compareValue) * 100;
          }
        }
        
        // Limitar el cumplimiento a un rango razonable (0-200%)
        cumplimiento = Math.max(0, Math.min(cumplimiento, 200));
      }
      
      results.push({
        id: row[0],
        indicador: row[1],
        perspectiva: PERSPECTIVES_MAP[row[1]]?.perspectiva || row[2],
        formula: row[3],
        unidad: row[4],
        responsable: row[5],
        meta: metaValue,
        actual: actualValue,
        comparacion: compareValue,
        diferencia: diferenciaMostrar.toFixed(2),
        esFavorable: esFavorable,
        cumplimiento: cumplimiento !== null ? Number(cumplimiento.toFixed(2)) : null,
        polaridad: polaridad
      });
    }
    
    // Mostrar información del período
    const currentPeriod = document.getElementById("currentPeriod");
    const comparePeriod = document.getElementById("comparePeriod");
    
    if (currentPeriod) currentPeriod.textContent = periodoActual;
    if (comparePeriod) comparePeriod.textContent = periodoComparacion;
    if (periodDisplay) {
      periodDisplay.style.display = "flex";
      periodDisplay.classList.add('animate-fade');
    }
    
    // Agrupar por perspectiva y calcular resúmenes
    const groupedData = {};
    const summaryStats = {
      "Financial": { total: 0, favorable: 0 },
      "Customer": { total: 0, favorable: 0 },
      "InternalProcesses": { total: 0, favorable: 0 },
      "LearningGrowth": { total: 0, favorable: 0 },
      "Sustainability": { total: 0, favorable: 0 }
    };
    
    results.forEach(item => {
      if (!groupedData[item.perspectiva]) {
        groupedData[item.perspectiva] = [];
      }
      groupedData[item.perspectiva].push(item);
      
      // Estadísticas para resumen
      if (summaryStats[item.perspectiva]) {
        summaryStats[item.perspectiva].total++;
        if (item.esFavorable) {
          summaryStats[item.perspectiva].favorable++;
        }
      }
    });
    
    // Actualizar resúmenes
    updateSummaryCards(summaryStats);
    
    // Actualizar cada sección
    renderPerspective("financial", groupedData["Financial"] || []);
    renderPerspective("customer", groupedData["Customer"] || []);
    renderPerspective("internalProcesses", groupedData["InternalProcesses"] || []);
    renderPerspective("learningGrowth", groupedData["LearningGrowth"] || []);
    renderPerspective("sustainability", groupedData["Sustainability"] || []);
    
  } catch (error) {
    showError("Error al cargar los datos: " + error.message);
  }
}

// Mostrar error
function showError(message) {
  const errorContainer = document.getElementById("errorContainer");
  if (errorContainer) {
    errorContainer.innerHTML = `
      <div class="error">
        <i class="fas fa-exclamation-triangle"></i>
        <div class="error-content">
          <strong>Error</strong>
          <div>${message}</div>
        </div>
      </div>
    `;
    errorContainer.style.display = "block";
    errorContainer.classList.add('animate-pop');
  }
}

// Actualizar tarjetas de resumen
function updateSummaryCards(stats) {
  for (const [perspective, data] of Object.entries(stats)) {
    const elementId = perspective + "Summary";
    const element = document.getElementById(elementId);
    
    if (element && data.total > 0) {
      const percentage = Math.round((data.favorable / data.total) * 100);
      element.textContent = `${percentage}%`;
      
      // Actualizar clase CSS según el porcentaje
      if (percentage >= 70) {
        element.className = "summary-value positive";
      } else if (percentage >= 40) {
        element.className = "summary-value neutral";
      } else {
        element.className = "summary-value negative";
      }
      
      // Actualizar contador de KPI en el header
      const countElement = document.getElementById(perspective + "Count");
      if (countElement) {
        countElement.textContent = `${data.total} KPI`;
      }
    }
  }
}

// Renderizar una perspectiva completa
function renderPerspective(perspective, data) {
  const containerId = perspective + "Metrics";
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Contenedor no encontrado: ${containerId}`);
    return;
  }
  
  if (!data || data.length === 0) {
    container.innerHTML = '<div class="no-data">No hay datos disponibles para esta perspectiva</div>';
    return;
  }
  
  let html = `
    <div class="metric-header">
      <div>Indicador</div>
      <div>Actual</div>
      <div>Comparación</div>
      <div>Diferencia</div>
      <div>Cumplimiento</div>
    </div>
  `;
  
  // Ordenar por favorabilidad (favorables primero)
  data.sort((a, b) => {
    // Primero por favorabilidad
    if (a.esFavorable !== b.esFavorable) {
      return b.esFavorable - a.esFavorable;
    }
    // Luego por magnitud de la diferencia
    return parseFloat(b.diferencia) - parseFloat(a.diferencia);
  });
  
  data.forEach(item => {
    const diferencia = parseFloat(item.diferencia);
    const cumplimiento = item.cumplimiento ? parseFloat(item.cumplimiento) : null;
    
    // Determinar icono y clase según favorabilidad
    let trendIcon, trendClass;
    if (item.esFavorable) {
      trendIcon = '<i class="fas fa-arrow-up icon-up"></i>';
      trendClass = "positive";
    } else {
      trendIcon = '<i class="fas fa-arrow-down icon-down"></i>';
      trendClass = "negative";
    }
    
    // Barra de progreso para cumplimiento
    let progressBar = '';
    let cumplimientoText = 'N/A';
    let progressWidth = 0;
    let progressColor = "var(--neutral)";
    
    if (cumplimiento !== null) {
      progressWidth = Math.min(Math.max(cumplimiento, 0), 100);
      cumplimientoText = `${cumplimiento.toFixed(0)}%`;
      
      if (cumplimiento >= 90) {
        progressColor = "var(--positive)";
      } else if (cumplimiento >= 70) {
        progressColor = "var(--neutral)";
      } else {
        progressColor = "var(--negative)";
      }
      
      progressBar = `
        <div class="progress-container">
          <div class="progress-text">${cumplimientoText}</div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressWidth}%; background: ${progressColor};"></div>
          </div>
        </div>
      `;
    } else {
      progressBar = '<div class="progress-text">N/A</div>';
    }
    
    // Formatear valores según su unidad
    const actualFormatted = formatNumber(item.actual, item.unidad);
    const comparacionFormatted = formatNumber(item.comparacion, item.unidad);
    const diferenciaFormatted = formatNumber(diferencia, item.unidad);
    
    // Mostrar polaridad del indicador
    const polaridadText = item.polaridad === "negativo" ? 
      '<i class="fas fa-arrow-down"></i> Menor valor es mejor' : 
      '<i class="fas fa-arrow-up"></i> Mayor valor es mejor';
    
    // Icono según perspectiva
    let perspectiveIcon = '';
    switch(item.perspectiva) {
      case "Financial": perspectiveIcon = '<i class="fas fa-chart-line"></i>'; break;
      case "Customer": perspectiveIcon = '<i class="fas fa-users"></i>'; break;
      case "InternalProcesses": perspectiveIcon = '<i class="fas fa-cogs"></i>'; break;
      case "LearningGrowth": perspectiveIcon = '<i class="fas fa-graduation-cap"></i>'; break;
      case "Sustainability": perspectiveIcon = '<i class="fas fa-leaf"></i>'; break;
      default: perspectiveIcon = '<i class="fas fa-chart-pie"></i>';
    }
    
    html += `
      <div class="metric-card" onclick="showMetricModal(${JSON.stringify(item).replace(/"/g, '&quot;')})">
        <div class="metric-name">
          <strong>${item.indicador}</strong>
          <div class="metric-responsable">
            ${perspectiveIcon} ${item.responsable} | ${item.unidad}
          </div>
          <div class="formula-info">${item.formula.replace(/^'=/, "")}</div>
          <div class="polarity-info">${polaridadText}</div>
        </div>
        <div class="metric-value">${actualFormatted}</div>
        <div class="metric-value">${comparacionFormatted}</div>
        <div class="metric-comparison ${trendClass}">
          ${trendIcon} ${diferenciaFormatted}
        </div>
        <div class="metric-meta">
          ${progressBar}
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Añadir animación a las tarjetas
  setTimeout(() => {
    const cards = container.querySelectorAll('.metric-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-pop');
      }, index * 50);
    });
  }, 100);
}

// Función para formatear números según su unidad
function formatNumber(value, unidad) {
  if (value === null || value === undefined) return "N/A";
  
  // Convertir a número si es string
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) return value;
  
  // Formatear según la unidad
  if (unidad === "USD") {
    return `$${numValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  } 
  else if (unidad === "%" || unidad === "puntos" || unidad === "ratio" || 
           unidad === "veces/año" || unidad === "DPMO" || 
           unidad === "accidentes/200k horas" || unidad === "horas/empleado" || 
           unidad === "ideas/empleado") {
    return `${numValue.toFixed(2).replace(".", ",")}${unidad === "%" ? "%" : ""}`;
  }
  else if (unidad === "puntos (1-10)") {
    return `${numValue.toFixed(1).replace(".", ",")}`;
  }
  else if (unidad === "ton CO2" || unidad === "horas") {
    return `${numValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} ${unidad}`;
  }
  else if (unidad === "días" || unidad === "minutos") {
    return `${numValue.toFixed(0)} ${unidad}`;
  }
  else {
    // Para unidades genéricas
    if (Number.isInteger(numValue)) {
      return numValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return numValue.toFixed(2).replace(".", ",");
    }
  }
}

// Función para mostrar el modal
function showMetricModal(metric) {
  const modal = document.getElementById("metricModal");
  const title = document.getElementById("modalTitle");
  const currentValue = document.getElementById("modalCurrentValue");
  const comparisonValue = document.getElementById("modalComparisonValue");
  const differenceValue = document.getElementById("modalDifferenceValue");
  const targetValue = document.getElementById("modalTargetValue");
  const perspective = document.getElementById("modalPerspective");
  const responsable = document.getElementById("modalResponsable");
  const unit = document.getElementById("modalUnit");
  const polarity = document.getElementById("modalPolarity");
  const formula = document.getElementById("modalFormula");
  const status = document.getElementById("modalStatus");
  const completion = document.getElementById("modalCompletion");
  
  // Actualizar contenido del modal
  title.textContent = metric.indicador;
  currentValue.textContent = formatNumber(metric.actual, metric.unidad);
  comparisonValue.textContent = formatNumber(metric.comparacion, metric.unidad);
  differenceValue.textContent = formatNumber(metric.diferencia, metric.unidad);
  targetValue.textContent = formatNumber(metric.meta, metric.unidad);
  
  // Determinar perspectiva en español
  const perspectiveMap = {
    "Financial": "Financiero",
    "Customer": "Clientes",
    "InternalProcesses": "Procesos Internos",
    "LearningGrowth": "Aprendizaje y Crecimiento",
    "Sustainability": "Sostenibilidad"
  };
  
  perspective.textContent = perspectiveMap[metric.perspectiva] || metric.perspectiva;
  responsable.textContent = metric.responsable;
  unit.textContent = metric.unidad;
  polarity.textContent = metric.polaridad === "negativo" ? "Menor es mejor" : "Mayor es mejor";
  formula.textContent = metric.formula.replace(/^'=/, "");
  
  // Estado y cumplimiento
  if (metric.esFavorable) {
    status.innerHTML = '<span class="positive">Favorable</span>';
  } else {
    status.innerHTML = '<span class="negative">Desfavorable</span>';
  }
  
  if (metric.cumplimiento !== null) {
    completion.textContent = `${metric.cumplimiento.toFixed(2)}%`;
  } else {
    completion.textContent = "N/A";
  }
  
  // Mostrar modal
  modal.classList.add("active");
  
  // Aquí podrías agregar el gráfico con Chart.js
  // renderModalChart(metric);
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById("metricModal");
  modal.classList.remove("active");
}

// Función para navegar a una perspectiva
function scrollToPerspective(perspective) {
  const element = document.getElementById(`${perspective}Container`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    
    // Expandir la perspectiva si está colapsada
    if (element.classList.contains('collapsed')) {
      element.classList.remove('collapsed');
    }
  }
}

// Función para alternar la visualización de una perspectiva
function togglePerspective(perspective) {
  const container = document.getElementById(`${perspective}Container`);
  container.classList.toggle('collapsed');
}

// Inicializar la aplicación
async function initApp() {
  // Inicializar partículas
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#00b4d8" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#00b4d8", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" }
      }
    }
  });
  
  // Configurar eventos
  document.getElementById('refreshBtn').addEventListener('click', loadData);
  document.getElementById('closeBtn').addEventListener('click', () => {
    window.close(); // Esto solo funciona si la ventana fue abierta con window.open()
  });
  
  // Obtener períodos disponibles
  try {
    const sheetData = await fetchSheetData();
    if (!sheetData) return;
    
    const headers = sheetData[0];
    const periodColumns = headers.filter(h => h.startsWith('Actual '));
    const periods = periodColumns.map(col => col.replace('Actual ', ''));
    
    const periodoSelect = document.getElementById('periodo');
    periodoSelect.innerHTML = periods.map(period => 
      `<option value="${period}">${formatPeriodName(period)}</option>`
    ).join('');
    
    // Establecer el último período como predeterminado
    if (periods.length > 0) {
      periodoSelect.value = periods[periods.length - 1];
    }
    
    // Inicializar todas las perspectivas como expandidas
    document.querySelectorAll('.perspective-container').forEach(container => {
      container.classList.add('expanded');
    });
    
    // Cargar datos iniciales
    loadData();
  } catch (error) {
    showError('Error al inicializar la aplicación: ' + error.message);
  }
}

// Función para formatear el nombre del período
function formatPeriodName(period) {
  const [month, year] = period.split('-');
  const monthNames = {
    'Jan': 'Enero', 'Feb': 'Febrero', 'Mar': 'Marzo', 'Apr': 'Abril',
    'May': 'Mayo', 'Jun': 'Junio', 'Jul': 'Julio', 'Aug': 'Agosto',
    'Sep': 'Septiembre', 'Oct': 'Octubre', 'Nov': 'Noviembre', 'Dec': 'Diciembre'
  };
  return `${monthNames[month]} 20${year}`;
}

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);