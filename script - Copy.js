let chart;

async function loadData() {

    const response = await fetch('sample-data.json');
    const data = await response.json();

    const labels = [];
    const tempData = [];
    const humData = [];

    const table = document.getElementById('tableData');
    table.innerHTML = "";

    data.forEach(item => {

        labels.push(item.time);
        tempData.push(item.temperature);
        humData.push(item.humidity);

        const row = `
            <tr>
                <td>${item.time}</td>
                <td>${item.temperature} °C</td>
                <td>${item.humidity} %</td>
            </tr>
        `;

        table.innerHTML += row;
    });

    document.getElementById('temp').innerHTML =
        tempData[tempData.length - 1] + ' °C';

    document.getElementById('hum').innerHTML =
        humData[humData.length - 1] + ' %';

    if(chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('myChart');

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Temperature',
                    data: tempData,
                    borderColor: 'red',
                    fill: false
                },
                {
                    label: 'Humidity',
                    data: humData,
                    borderColor: 'blue',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

loadData();
setInterval(loadData, 5000);
