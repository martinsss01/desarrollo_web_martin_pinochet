const ctx2 = document.getElementById('pieChart');

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

