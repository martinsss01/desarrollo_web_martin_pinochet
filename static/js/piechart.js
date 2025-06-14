
const lineChart = document.getElementById('lineChart');

const lc = new Chart(lineChart, {
            type: 'line',
            data: {
                    labels: [],
                    datasets: [{
                        label: 'Número de actividades',
                        data: [],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                        tension: 0
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Fechas de actividades'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Cantidad de actividades'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });

const updateLineChart = (chart, data) => {
    console.log(data["fechas"]);
    chart["data"]["labels"] = data["fechas"];
    chart.data.datasets[0].data = data["conteos"];
    chart.update();
}

let showLineChart = (chart) => {
    url = '/estadisticas/conteo_actividades';
    fetch(url)
    .then(response => response.json())
    .then((ajaxResponse) => {
            console.log(ajaxResponse);
            updateLineChart(chart, ajaxResponse);
    })
    .catch(console.error("Error fetching line chart data"));
    };




const ctx2 = document.getElementById('pieChart');

const pieChart = new Chart(ctx2, {
            type: 'pie', 
            data: {
                labels: [],
                datasets: [{
                    label: 'Cantidad de actividades con el tema',
                    data: [], 
                    backgroundColor: [ 
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(50, 186, 61, 0.6)',
                        'rgba(40, 14, 209, 0.6)',
                        'rgba(227, 16, 255, 0.6)',
                        'rgba(35, 234, 227, 0.6)',
                        'rgba(223, 176, 176, 0.6)',
                        'rgba(232, 120, 7, 0.6)',
                    ],
                    borderColor: [ 
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(50, 186, 61, 1)',
                        'rgba(40, 14, 209, 1)',
                        'rgba(227, 16, 255, 1)',
                        'rgba(35, 234, 227, 1)',
                        'rgba(223, 176, 176, 1)',
                        'rgba(232, 120, 7, 1)',
                    ],
                    borderWidth: 1 
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top' // Position of the legend
                    }
                }
            }
        });

const updatePieChart = (chart, data) => {
    console.log(data["temas"]);
    chart["data"]["labels"] = data["temas"];
    chart.data.datasets[0].data = data["conteo"];
    chart.update();
}

let showPieChart = (chart) => {
    url = '/estadisticas/conteo_temas';
    fetch(url)
    .then(response => response.json())
    .then((ajaxResponse) => {
        console.log(ajaxResponse);
        updatePieChart(chart, ajaxResponse);
    })
    .catch(console.error("Error fetching line chart data"));
    };


window.onload = () => {
    showLineChart(lc);
    showPieChart(pieChart);
}