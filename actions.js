// ============================================
// FINANCEPRO - LÓGICA DE LA APLICACIÓN
// ============================================

// Estado de la aplicación
const appState = {
    language: "es",
    amortizationData: [],
    loanData: null,
    hasCalculation: false
};

// ============================================
// TRADUCCIONES
// ============================================

const translations = {
    es: {
        simulator: "Simulador",
        results: "Resultados",
        schedule: "Amortización",
        secure: "Simulación segura",
        pageTitle: "Simulador de préstamos",
        pageSubtitle: "Calcula y analiza las condiciones de tu préstamo.",
        loanConfig: "Configuración del préstamo",
        loanConfigDesc: "Ingresa los datos para realizar la simulación.",
        loanAmount: "Monto del préstamo",
        interestRate: "Tasa de interés (%)",
        interestType: "Tipo de interés",
        effectiveAnnual: "Efectiva anual (EA)",
        monthly: "Mensual",
        loanTerm: "Plazo del préstamo",
        months: "meses",
        calculate: "Calcular préstamo",
        clear: "Limpiar",
        resultsTitle: "Resumen del préstamo",
        resultsDesc: "Estos son los resultados de tu simulación.",
        monthlyPayment: "Cuota mensual",
        fixedPayment: "Pago mensual estimado",
        monthlyRate: "Tasa mensual",
        equivalentRate: "Tasa equivalente",
        totalInterest: "Intereses totales",
        interestCost: "Costo de intereses",
        totalPayment: "Total a pagar",
        capitalInterest: "Capital más intereses",
        amortizationTitle: "Tabla de amortización",
        amortizationDesc: "Detalle de los pagos durante el plazo del préstamo.",
        print: "Imprimir",
        exportPdf: "Exportar PDF",
        exportCsv: "Exportar CSV",
        period: "Período",
        initialBalance: "Saldo inicial",
        payment: "Cuota",
        principal: "Capital",
        interest: "Interés",
        finalBalance: "Saldo final",
        emptyTable: "Realiza una simulación para visualizar la tabla.",
        noCalculation: "No hay una simulación calculada.",
        footer: "FinancePro © 2026 - Simulador financiero",
        disclaimer: "Los valores son estimaciones y no constituyen una oferta bancaria.",
        invalidAmount: "Ingresa un monto del préstamo mayor que cero.",
        invalidRate: "Ingresa una tasa de interés válida (cero o mayor).",
        invalidTerm: "El plazo debe estar entre 1 y 600 meses.",
        calculateFirst: "Primero debes calcular un préstamo.",
        scheduleInfo: "Número de cuotas: ",
        pdfTitle: "Reporte de simulación de préstamo",
        pdfDate: "Fecha de generación",
        pdfAmount: "Monto del préstamo",
        pdfRate: "Tasa mensual",
        pdfTerm: "Plazo",
        pdfPayment: "Cuota mensual",
        pdfInterest: "Intereses totales",
        pdfTotal: "Total a pagar"
    },

    en: {
        simulator: "Simulator",
        results: "Results",
        schedule: "Amortization",
        secure: "Secure simulation",
        pageTitle: "Loan Simulator",
        pageSubtitle: "Calculate and analyze your loan conditions.",
        loanConfig: "Loan configuration",
        loanConfigDesc: "Enter the information to calculate your loan.",
        loanAmount: "Loan amount",
        interestRate: "Interest rate (%)",
        interestType: "Interest type",
        effectiveAnnual: "Effective annual (EAR)",
        monthly: "Monthly",
        loanTerm: "Loan term",
        months: "months",
        calculate: "Calculate loan",
        clear: "Clear",
        resultsTitle: "Loan summary",
        resultsDesc: "Here are the results of your simulation.",
        monthlyPayment: "Monthly payment",
        fixedPayment: "Estimated monthly payment",
        monthlyRate: "Monthly rate",
        equivalentRate: "Equivalent rate",
        totalInterest: "Total interest",
        interestCost: "Interest cost",
        totalPayment: "Total payment",
        capitalInterest: "Principal plus interest",
        amortizationTitle: "Amortization schedule",
        amortizationDesc: "Payment details throughout the loan term.",
        print: "Print",
        exportPdf: "Export PDF",
        exportCsv: "Export CSV",
        period: "Period",
        initialBalance: "Initial balance",
        payment: "Payment",
        principal: "Principal",
        interest: "Interest",
        finalBalance: "Final balance",
        emptyTable: "Calculate a loan to view the amortization schedule.",
        noCalculation: "No calculation available.",
        footer: "FinancePro © 2026 - Financial simulator",
        disclaimer: "Values are estimates and do not constitute a bank offer.",
        invalidAmount: "Enter a loan amount greater than zero.",
        invalidRate: "Enter a valid interest rate (zero or greater).",
        invalidTerm: "The term must be between 1 and 600 months.",
        calculateFirst: "You must calculate a loan first.",
        scheduleInfo: "Number of payments: ",
        pdfTitle: "Loan simulation report",
        pdfDate: "Generation date",
        pdfAmount: "Loan amount",
        pdfRate: "Monthly rate",
        pdfTerm: "Term",
        pdfPayment: "Monthly payment",
        pdfInterest: "Total interest",
        pdfTotal: "Total payment"
    }
};

// ============================================
// ELEMENTOS DEL DOM
// ============================================

const elements = {
    form: document.getElementById("loanForm"),
    amount: document.getElementById("loanAmount"),
    rate: document.getElementById("interestRate"),
    interestType: document.getElementById("interestType"),
    term: document.getElementById("loanTerm"),
    language: document.getElementById("languageSelect"),
    error: document.getElementById("errorMessage"),

    monthlyPayment: document.getElementById("monthlyPayment"),
    monthlyRate: document.getElementById("monthlyRate"),
    totalInterest: document.getElementById("totalInterest"),
    totalPayment: document.getElementById("totalPayment"),

    tableBody: document.getElementById("amortizationBody"),
    scheduleInfo: document.getElementById("scheduleInfo"),

    resetButton: document.getElementById("resetButton"),
    printButton: document.getElementById("printButton"),
    pdfButton: document.getElementById("pdfButton"),
    csvButton: document.getElementById("csvButton")
};

// ============================================
// FORMATO DE VALORES
// ============================================

function formatCurrency(value) {
    return new Intl.NumberFormat(
        appState.language === "es" ? "es-CO" : "en-US",
        {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }
    ).format(value);
}

function formatPercentage(value) {
    return new Intl.NumberFormat(
        appState.language === "es" ? "es-CO" : "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4
        }
    ).format(value) + "%";
}

function formatNumber(value) {
    return new Intl.NumberFormat(
        appState.language === "es" ? "es-CO" : "en-US",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    ).format(value);
}

function getText(key) {
    return translations[appState.language][key] || key;
}

// ============================================
// CONVERSIÓN DE TASAS
// ============================================

function calculateMonthlyRate(rate, type) {
    const decimalRate = rate / 100;

    if (type === "effectiveAnnual") {
        return Math.pow(1 + decimalRate, 1 / 12) - 1;
    }

    return decimalRate;
}

// ============================================
// VALIDACIÓN
// ============================================

function validateInputs(amount, rate, term) {
    if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error(getText("invalidAmount"));
    }

    if (!Number.isFinite(rate) || rate < 0) {
        throw new Error(getText("invalidRate"));
    }

    if (!Number.isInteger(term) || term < 1 || term > 600) {
        throw new Error(getText("invalidTerm"));
    }
}

// ============================================
// CÁLCULO DEL PRÉSTAMO
// ============================================

function calculateLoan(amount, annualOrMonthlyRate, interestType, term) {

    const monthlyRate = calculateMonthlyRate(
        annualOrMonthlyRate,
        interestType
    );

    let monthlyPayment;

    if (monthlyRate === 0) {
        monthlyPayment = amount / term;
    } else {
        const factor = Math.pow(1 + monthlyRate, term);

        monthlyPayment =
            amount * (monthlyRate * factor) / (factor - 1);
    }

    let balance = amount;
    let totalInterest = 0;
    const schedule = [];

    for (let month = 1; month <= term; month++) {

        const initialBalance = balance;
        const interestPayment = initialBalance * monthlyRate;

        let principalPayment = monthlyPayment - interestPayment;

        // Ajuste de la última cuota para evitar diferencias por redondeo.
        if (month === term) {
            principalPayment = initialBalance;
        }

        const actualPayment = principalPayment + interestPayment;

        balance = Math.max(0, initialBalance - principalPayment);
        totalInterest += interestPayment;

        schedule.push({
            period: month,
            initialBalance,
            payment: actualPayment,
            principal: principalPayment,
            interest: interestPayment,
            finalBalance: balance
        });
    }

    return {
        amount,
        monthlyRate,
        monthlyPayment,
        totalInterest,
        totalPayment: amount + totalInterest,
        term,
        schedule
    };
}

// ============================================
// MOSTRAR RESULTADOS
// ============================================

function renderResults(data) {

    elements.monthlyPayment.textContent =
        formatCurrency(data.monthlyPayment);

    elements.monthlyRate.textContent =
        formatPercentage(data.monthlyRate * 100);

    elements.totalInterest.textContent =
        formatCurrency(data.totalInterest);

    elements.totalPayment.textContent =
        formatCurrency(data.totalPayment);

    renderAmortizationTable(data.schedule);

    appState.loanData = data;
    appState.amortizationData = data.schedule;
    appState.hasCalculation = true;
}

// ============================================
// TABLA DE AMORTIZACIÓN
// ============================================

function renderAmortizationTable(schedule) {

    elements.tableBody.innerHTML = "";

    schedule.forEach(item => {

        const row = document.createElement("tr");

        const values = [
            item.period,
            formatCurrency(item.initialBalance),
            formatCurrency(item.payment),
            formatCurrency(item.principal),
            formatCurrency(item.interest),
            formatCurrency(item.finalBalance)
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        elements.tableBody.appendChild(row);
    });

    elements.scheduleInfo.textContent =
        getText("scheduleInfo") + schedule.length;
}

// ============================================
// IDIOMA
// ============================================

function translatePage() {

    document.documentElement.lang = appState.language;

    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.dataset.i18n;
        const translation = getText(key);

        if (translation) {
            element.textContent = translation;
        }
    });

    if (appState.hasCalculation) {
        renderResults(appState.loanData);
    } else {
        elements.tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    ${getText("emptyTable")}
                </td>
            </tr>
        `;

        elements.scheduleInfo.textContent = getText("noCalculation");
    }

    elements.error.textContent = "";
}

// ============================================
// PROCESAR FORMULARIO
// ============================================

function handleLoanCalculation(event) {

    event.preventDefault();
    elements.error.textContent = "";

    try {

        const amount = Number(elements.amount.value);
        const rate = Number(elements.rate.value);
        const term = Number(elements.term.value);
        const interestType = elements.interestType.value;

        validateInputs(amount, rate, term);

        const results = calculateLoan(
            amount,
            rate,
            interestType,
            term
        );

        renderResults(results);

    } catch (error) {

        elements.error.textContent = error.message;

        appState.hasCalculation = false;
        appState.loanData = null;
        appState.amortizationData = [];

        elements.monthlyPayment.textContent = formatCurrency(0);
        elements.monthlyRate.textContent = formatPercentage(0);
        elements.totalInterest.textContent = formatCurrency(0);
        elements.totalPayment.textContent = formatCurrency(0);
    }
}

// ============================================
// REINICIAR APLICACIÓN
// ============================================

function resetApplication() {

    appState.loanData = null;
    appState.amortizationData = [];
    appState.hasCalculation = false;

    elements.error.textContent = "";

    elements.monthlyPayment.textContent = formatCurrency(0);
    elements.monthlyRate.textContent = formatPercentage(0);
    elements.totalInterest.textContent = formatCurrency(0);
    elements.totalPayment.textContent = formatCurrency(0);

    elements.tableBody.innerHTML = `
        <tr>
            <td colspan="6" class="empty-state">
                ${getText("emptyTable")}
            </td>
        </tr>
    `;

    elements.scheduleInfo.textContent = getText("noCalculation");
}

// ============================================
// IMPRESIÓN
// ============================================

function printReport() {

    if (!appState.hasCalculation) {
        alert(getText("calculateFirst"));
        return;
    }

    window.print();
}

// ============================================
// EXPORTAR PDF
// ============================================

function exportPDF() {

    if (!appState.hasCalculation) {
        alert(getText("calculateFirst"));
        return;
    }

    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert("No se pudo cargar la librería PDF. Verifica tu conexión.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const data = appState.loanData;
    const date = new Date().toLocaleDateString(
        appState.language === "es" ? "es-CO" : "en-US"
    );

    doc.setFontSize(18);
    doc.setTextColor(147, 51, 234);
    doc.text(getText("pdfTitle"), 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
    doc.text(`${getText("pdfDate")}: ${date}`, 14, 28);

    const summary = [
        [getText("pdfAmount"), formatCurrency(data.amount)],
        [getText("pdfRate"), formatPercentage(data.monthlyRate * 100)],
        [getText("pdfTerm"), `${data.term} ${getText("months")}`],
        [getText("pdfPayment"), formatCurrency(data.monthlyPayment)],
        [getText("pdfInterest"), formatCurrency(data.totalInterest)],
        [getText("pdfTotal"), formatCurrency(data.totalPayment)]
    ];

    doc.autoTable({
        startY: 35,
        head: [[
            appState.language === "es" ? "Concepto" : "Description",
            appState.language === "es" ? "Valor" : "Value"
        ]],
        body: summary,
        theme: "grid",
        headStyles: {
            fillColor: [168, 85, 247]
        }
    });

    const tableRows = data.schedule.map(item => [
        item.period,
        formatCurrency(item.initialBalance),
        formatCurrency(item.payment),
        formatCurrency(item.principal),
        formatCurrency(item.interest),
        formatCurrency(item.finalBalance)
    ]);

    doc.autoTable({
        startY: doc.lastAutoTable.finalY + 12,
        head: [[
            getText("period"),
            getText("initialBalance"),
            getText("payment"),
            getText("principal"),
            getText("interest"),
            getText("finalBalance")
        ]],
        body: tableRows,
        theme: "striped",
        styles: {
            fontSize: 7,
            cellPadding: 2
        },
        headStyles: {
            fillColor: [147, 51, 234]
        }
    });

    doc.save("FinancePro_Reporte.pdf");
}

// ============================================
// EXPORTAR CSV
// ============================================

function exportCSV() {

    if (!appState.hasCalculation) {
        alert(getText("calculateFirst"));
        return;
    }

    const headers = [
        getText("period"),
        getText("initialBalance"),
        getText("payment"),
        getText("principal"),
        getText("interest"),
        getText("finalBalance")
    ];

    const rows = appState.amortizationData.map(item => [
        item.period,
        item.initialBalance.toFixed(2),
        item.payment.toFixed(2),
        item.principal.toFixed(2),
        item.interest.toFixed(2),
        item.finalBalance.toFixed(2)
    ]);

    const csvContent = [
        headers,
        ...rows
    ].map(row =>
        row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(";")
    ).join("\n");

    // BOM para facilitar la lectura de caracteres especiales en Excel.
    const blob = new Blob(
        ["\uFEFF" + csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "FinancePro_Amortizacion.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
}

// ============================================
// EVENTOS
// ============================================

elements.form.addEventListener("submit", handleLoanCalculation);

elements.form.addEventListener("reset", () => {
    // Se ejecuta después de que el navegador reinicia los campos.
    setTimeout(resetApplication, 0);
});

elements.language.addEventListener("change", event => {

    appState.language = event.target.value;
    translatePage();

});

elements.printButton.addEventListener("click", printReport);
elements.pdfButton.addEventListener("click", exportPDF);
elements.csvButton.addEventListener("click", exportCSV);

// ============================================
// INICIALIZACIÓN
// ============================================

translatePage();
resetApplication();