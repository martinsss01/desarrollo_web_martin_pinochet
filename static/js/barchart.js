const ctx3 = document.getElementById('barChart').getContext('2d');
        const barChart = new Chart(ctx3, {
            type: 'bar',
            data: {
                labels: ['Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto'],
                datasets: [
                    {
                        label: 'Mañana',
                        data: [1,3,3,4,3,1],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Mediodía',
                        data: [3,3,4,3,5,3],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Noche',
                        data: [1,1,0,2,1,0],
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgba(255, 206, 86, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top' // Position of the legend
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Months' // X-axis title
                        },
                        stacked: false // Ensure bars are grouped, not stacked
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Values' // Y-axis title
                        },
                        beginAtZero: true // Start Y-axis at 0
                    }
                }
            }
        });