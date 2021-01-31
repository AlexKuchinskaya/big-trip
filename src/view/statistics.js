import SmartView from "./smart-view.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {makeItemsUniq} from "../utils/statistics-utils.js";

const BAR_HEIGHT = 55;

const createStatisticsTemplate = () => {
  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
};

const renderMoneyChart = (moneyCtx, trips) => {
  const tripsTypes = trips.map((trip) => trip.typeTripPoint);
  const uniqTripTypes = makeItemsUniq(tripsTypes);
  // const uniqTripTypesUpperCase = uniqTripTypes.forEach((trip) => trip.toUpperCase());
  // console.log(`uniqTripTypesUpperCase`, uniqTripTypesUpperCase)
  const calculatePricesByTripTypes = () => {
    let pricesArray = [];
    uniqTripTypes.forEach((uniqTripType) => {
      const tripsByUniqueType = trips.filter((trip) => {
        return trip.typeTripPoint === uniqTripType;
      });
      const pricesOfTripsByUniqueType = tripsByUniqueType.map((trip) => trip.price);
      let sumOfPricesOfTripsByUniqueType = 0;

      pricesOfTripsByUniqueType.forEach((price) => {
        sumOfPricesOfTripsByUniqueType += price;
      });
      pricesArray.push(sumOfPricesOfTripsByUniqueType);
    });
    return pricesArray;
  };

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTripTypes,
      datasets: [{
        data: calculatePricesByTripTypes(),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50
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
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTypeChart = (typeCtx, trips) => {
  const tripsTypes = trips.map((trip) => trip.typeTripPoint);
  const uniqTripTypes = makeItemsUniq(tripsTypes);
  const calculateTypesRepeats = () => {
    let typesRepeats = [];
    uniqTripTypes.forEach((uniqTripType) => {
      const tripsByUniqueType = trips.filter((trip) => {
        return trip.typeTripPoint === uniqTripType;
      });
      const typesOfTripsByUniqueType = tripsByUniqueType.map((trip) => trip.typeTripPoint);
      typesRepeats.push(typesOfTripsByUniqueType.length);
    });
    return typesRepeats;
  };

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTripTypes,
      datasets: [{
        data: calculateTypesRepeats(),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50
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
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TYPE`,
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
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const renderTimeChart = (timeCtx, trips) => {
  const tripsTypes = trips.map((trip) => trip.typeTripPoint);
  const uniqTripTypes = makeItemsUniq(tripsTypes);
  const calculateTypesRepeats = () => {
    let typesRepeats = [];
    uniqTripTypes.forEach((uniqTripType) => {

      const tripsByUniqueType = trips.filter((trip) => {
        return trip.typeTripPoint === uniqTripType;
      });
      const typesOfTripsByUniqueType = tripsByUniqueType.map((trip) => trip.typeTripPoint);

      typesRepeats.push(typesOfTripsByUniqueType.length);
    });
    return typesRepeats;
  };

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: uniqTripTypes,
      datasets: [{
        data: calculateTypesRepeats(),
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50
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
          formatter: (val) => `${val}D`
        }
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
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
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};


export default class Statistics extends SmartView {
  constructor(trips) {
    super();
    this._data = trips;
    this._typeChart = null;
    this._moneyChart = null;
    this._timeChart = null;
    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }
  removeElement() {
    super.removeElement();

    if (this._typeChart !== null || this._moneyChart !== null) {
      this._typeChart = null;
      this._moneyChart = null;
    }
  }
  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._typeChart !== null || this._moneyChart !== null) {
      this._typeChart = null;
      this._moneyChart = null;
    }

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);


    moneyCtx.height = BAR_HEIGHT * 10;
    typeCtx.height = BAR_HEIGHT * 10;
    timeCtx.height = BAR_HEIGHT * 10;

    this._typeChart = renderTypeChart(typeCtx, this._data);
    this._moneyChart = renderMoneyChart(moneyCtx, this._data);
    this._timeChart = renderTimeChart(timeCtx, this._data);
  }
}
