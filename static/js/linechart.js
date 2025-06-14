let makeLineChart = (input, ctx) => {
    new Chart(ctx, {
            type: 'line',
            data: {
                    labels: input["fechas"],
                    datasets: [{
                        label: 'Número de actividades',
                        data: input["conteos"],
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
    }


let showLineChart = (ctx) => {
    url = '/estadisticas/conteo_actividades';
    fetch(url)
    .then(response => response.json())
    .then((ajaxResponse) => {
        if (ajaxResponse["status"] === "success") {
            console.log(ajaxResponse);
            makeLineChart(ajaxResponse["data"], ctx);
        } else {
            console.error("Error fetching line chart data:", ajaxResponse["message"]);
        }
    })
}

window.onload = () => {
    const ctx = document.getElementById('lineChart').getContext('2d');
    showLineChart(ctx);
}