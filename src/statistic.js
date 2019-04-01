import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const moneyChartConfig = {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [`✈️ FLY`, `🏨 STAY`, `🚗 DRIVE`, `🏛️ LOOK`, `🏨 EAT`, `🚕 RIDE`],
    datasets: [{
      data: [400, 300, 200, 160, 150, 100],
      backgroundColor: `#ffffff`,
      hoverBackgroundColor: `#ffffff`,
      anchor: `start`
    }]
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13
        },
        color: `#000000`,
        anchor: `end`,
        align: `start`,
        formatter: (val) => `€ ${val}`
      }
    },
    title: {
      display: true,
      text: `MONEY`,
      fontColor: `#000000`,
      fontSize: 23,
      position: `left`
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: `#000000`,
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        minBarLength: 50
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
    }
  }
};

const transportChartConfig = {
  plugins: [ChartDataLabels],
  type: `horizontalBar`,
  data: {
    labels: [`🚗 DRIVE`, `🚕 RIDE`, `✈️ FLY`, `🛳️ SAIL`],
    datasets: [{
      data: [4, 3, 2, 1],
      backgroundColor: `#ffffff`,
      hoverBackgroundColor: `#ffffff`,
      anchor: `start`
    }]
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 13
        },
        color: `#000000`,
        anchor: `end`,
        align: `start`,
        formatter: (val) => `€ ${val}`
      }
    },
    title: {
      display: true,
      text: `TRANSPORT`,
      fontColor: `#000000`,
      fontSize: 23,
      position: `left`
    },
    scales: {
      yAxes: [{
        ticks: {
          fontColor: `#000000`,
          padding: 5,
          fontSize: 13,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        barThickness: 44,
      }],
      xAxes: [{
        ticks: {
          display: false,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        minBarLength: 50
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      enabled: false,
    }
  }
};


// Statistic per event
const moneyChartRender = (eventsData, container) => {
  moneyChartConfig.data.labels = [];
  moneyChartConfig.data.datasets[0].data = [];
  for (let i = 0; i < eventsData.length; i++) {
    let pricePerEvent = Number(eventsData[i].price);
    eventsData[i].offers.forEach(function (eventElement) {
      pricePerEvent += (eventElement.isSelected) ? eventElement.price : 0;
    });
    moneyChartConfig.data.labels.push(`${eventsData[i].type.icon} ${eventsData[i].city}, ${eventsData[i].type.name}`);
    moneyChartConfig.data.datasets[0].data.push(pricePerEvent);
  }
  const chartMoney = new Chart(container, moneyChartConfig);

  return chartMoney;
};

// Statistic per transport
const transportChartRender = (eventsData, container) => {
  transportChartConfig.data.labels = [];
  transportChartConfig.data.datasets[0].data = [];
  const transportTypes = [
    {name: `taxi`, icon: `🚕`},
    {name: `bus`, icon: `🚌`},
    {name: `train`, icon: `🚂`},
    {name: `flight`, icon: `✈️`},
  ];
  transportTypes.forEach(function (type) {
    const thisTypeEvents = eventsData.filter((it) => {
      return it.type.name === type.name;
    });
    let pricePerType = 0;
    thisTypeEvents.forEach(function (event) {
      pricePerType += Number(event.price);
      event.offers.forEach(function (eventElement) {
        pricePerType += (eventElement.isSelected) ? Number(eventElement.price) : 0;
      });
    });
    transportChartConfig.data.labels.push(`${type.icon} ${type.name}`);
    transportChartConfig.data.datasets[0].data.push(pricePerType);
  });
  const chartTransport = new Chart(container, transportChartConfig);

  return chartTransport;
};


export {moneyChartRender, transportChartRender};
