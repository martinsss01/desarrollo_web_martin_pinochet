let makeLineChart = (input) => {
    const ctx = document.getElementById('lineChart').getContext('2d');
    const labelsArray = [];
    const dataArray = [];

    for (let i = 0; i < pairs.length; i++) {
        const [a, b] = pairs[i];
        labelsArray.push(a);
        dataArray.push(b);
    }
        const lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                    labels: labelsArray,
                    datasets: [{
                        label: 'Número de actividades',
                        data: dataArray,
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


let showLineChart = () => {
    url = '/estadisticas/conteo_actividades';
    fetch(url)
    .then(response => response.json())
    .then((ajaxResponse) => {
        if (ajaxResponse["status"] === "success") {
            console.log(ajaxResponse);
            populateLineChart(ajaxResponse["data"]);
        } else {
            console.error("Error fetching line chart data:", ajaxResponse["message"]);
        }
    })
}

window.onload = () => {
    makeLineChart();
}