// Line chart
const ctx = document.getElementById('lineChart').getContext('2d');
const lineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['01/04/2002', '23/10/2005','06/06/2006', '29/11/2024',  '01/01/2025', '10/03/2025'],
        datasets: [{
            label: 'Número de actividades',
            data: [1, 3, 1, 1, 1, 2],
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
</script>
<script> // Pie chart
const ctx2 = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(ctx2, {
    type: 'pie', 
    data: {
        labels: ['En proceso', 'Pendiente', 'Terminado'],
        datasets: [{
            label: 'Cantidad de actividades',
            data: [3, 1, 4], 
            backgroundColor: [ 
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
            ],
            borderColor: [ 
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
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
