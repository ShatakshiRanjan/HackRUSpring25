import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Ensures Chart.js works properly

const DonutPieChart = ({ completedTasks, uncompletedTasks }) => {
    const data = {
        labels: ['Completed', 'Uncompleted'],
        datasets: [
            {
                data: [completedTasks, uncompletedTasks],
                backgroundColor: [
                    'rgba(0, 255, 0, 0.3)',   // Light green for completed
                    'rgba(255, 165, 0, 0.3)' // Light orange for uncompleted
                ],
                borderColor: [
                    'rgba(0, 255, 0, 1)',   // Solid green border
                    'rgba(255, 165, 0, 1)' // Solid orange border
                ],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        cutout: '70%', // Creates a donut effect
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14 // Increases font readability
                    }
                }
            },
            title: {
                display: true,
                text: 'Task Completion Overview',
                font: {
                    size: 16
                }
            }
        }
    };

    return (
        <div className="donut-chart-container">
            <Doughnut data={data} options={options} />
            <ul className="task-list">
                <li className="completed">Completed Tasks: {completedTasks}</li>
                <li className="task">Uncompleted Tasks: {uncompletedTasks}</li>
            </ul>
        </div>
    );
};

export default DonutPieChart;
