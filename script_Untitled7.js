//2025/10/12
//(이 문서 만든 시각: 2025/10/12 22:32:17)



/*
https://www.w3schools.com/ai/ai_scatter_plots.asp
https://www.w3schools.com/ai/tryit.asp?filename=tryai_plotly_scatter
에 나온 데모를 가져와서 편집함: (22:41:35)
*/

const xArray = [50,60,70,80,90,100,110,120,130,140,150];
const yArray = [7,8,8,9,9,9,10,11,14,14,15];

const data = [{
    x: xArray,
    y: yArray,
    mode: "markers"
}];

const layout = {
    xaxis: {range: [40, 160], title: "Square Meters"},
    yaxis: {range: [5, 16], title: "Price in Millions"},  
    title: "House Prices vs. Size"
};

Plotly.newPlot("ScatterPlot1", data, layout);



/*
https://developers.google.com/chart/interactive/docs/gallery/scatterchart?hl=ko
에 나온 데모를 가져와서 편집함: (22:41:42)
*/

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart()
{
    var data = google.visualization.arrayToDataTable([
        ['Age', 'Weight'],
        [ 8,      12],
        [ 4,      5.5],
        [ 11,     14],
        [ 4,      5],
        [ 3,      3.5],
        [ 6.5,    7]
    ]);

    var options = {
        title: 'Age vs. Weight comparison',
        hAxis: {title: 'Age', minValue: 0, maxValue: 15},
        vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
        legend: 'none'
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('ScatterPlot2'));

    chart.draw(data, options);
}