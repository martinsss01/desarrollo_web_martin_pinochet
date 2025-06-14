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
    .catch(console.error("Error fetching line chart data:", ajaxResponse["message"]));
    };

window.onload = () => {
    showLineChart(lc);
}