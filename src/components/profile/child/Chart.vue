<template>
    <canvas id="myChart" width="400" height="250"></canvas>
</template>

<script>
import Chart from 'chart.js/auto'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';

export default {
    name: 'Chart',
    setup(){
        onMounted(() => {
            count()
        })

        function count(){
            axios.get(`http://localhost:8000/api/count`)
            .then((res) => {
                let jumlah = res.data
                let result = jumlah.map(a => a.total);
                chart(result)
            }).catch((err) => {
                console.log(err)
            })
        }

        function chart(result){
            const ctx = document.getElementById('myChart');
            let myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Perempuan', 'Laki-laki'],
                    datasets: [{
                        label: 'Gender',
                        data: result,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            myChart;
        }

        return {
            count, chart
        }
    }    
}
</script>