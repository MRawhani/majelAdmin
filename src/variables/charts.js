// ##############################
// // // javascript library for creating charts
// #############################
var Chartist = require("chartist");
const moment = require("moment");


// ##############################
// // // variables used to create animation on charts
// #############################
var delays = 80,
  durations = 500;
var delays2 = 80,
  durations2 = 500;

// ##############################
// // // Daily Sales
// #############################

const dailySalesChart = {
  data: {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    series: [[12, 17, 7, 17, 23, 18, 38]],
  },
  options: {
    lineSmooth: Chartist.Interpolation.cardinal({
      tension: 0,
    }),
    low: 0,
    high: 50, 
    chartPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  // for animation
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Daily Sales
// #############################
const getValue = function (arr,string='هذا الاسبوع') {
  const res= arr.find((item) => item._id === string)
  return res
    ? res.value
    : 0;
};
const getIncreaseOrDecrease = function (arr){
const current = getValue(arr)
const prev = getValue(arr,'السابق')
const result = prev>0 ? ((current - prev)/prev)*100 : 1*100
return Math.floor(result)
}
function generateData(arr) {
  var today = new Date(),
    oneDay = 1000 * 60 * 60 * 24,
    thirtyDays = new Date(today.valueOf() - 35 * oneDay),
    days21 = new Date(today.valueOf() - 21 * oneDay),
    fifteenDays = new Date(today.valueOf() - 15 * oneDay),
    sevenDays = new Date(today.valueOf() - 7 * oneDay);
    moment.locale('en-ca')
  
  const dailySalesChart = {
    data: {
      labels: [
        "هذا الاسبوع",
        "السابق",
        `${moment(days21, "MD").format("MM/DD")}`,
        `${moment(thirtyDays, "MD").format("MM/DD")}`,
      ],
      series: [
        [
          getValue(arr,"هذا الاسبوع"),
          getValue(arr,"السابق"),
          getValue(arr,`${moment(days21, "MD").format("MM/DD")}`),
          getValue(arr,`${moment(thirtyDays, "MD").format("MM/DD")}`),
        ],
      ],
    },
    options: {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: Math.max.apply(Math,arr.map(function(o){return o.value}))+10, //  we recommend you to set the high sa the biggest value + something for a better look
     showArea:true,
      chartPadding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    // for animation
    animation: {
      draw: function (data) {
        if (data.type === "line" || data.type === "area") {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path
                .clone()
                .scale(1, 0)
                .translate(0, data.chartRect.height())
                .stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint,
            },
          });
        } else if (data.type === "point") {
          data.element.animate({
            opacity: {
              begin: (data.index + 1) * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: "ease",
            },
          });
        }
      },
    },
  };
  return dailySalesChart;
}
const barOptions ={
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
}
// ##############################
// // // Email Subscriptions
// #############################

const emailsSubscriptionChart = {
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mai",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
  },
  options: {
    axisX: {
      showGrid: true,
    },
    low: 0,
    high: 1000,
    chartPadding: {
      top: 0,
      left: 15,
      bottom: 0,
      right: 0,
    },
  },
  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
        },
      },
    ],
  ],
  animation: {
    draw: function (data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

// ##############################
// // // Completed Tasks
// #############################

const completedTasksChart = {
  data: {
    labels: [1, 2, 3, 4, 5],
    series: [
      [1, 5, 10, 0, 1],
      [10, 15, 0, 1, 2],
    ],
  },
  options: {
    lineSmooth: Chartist.Interpolation.simple({
      divisor: 2,
    }),
    fullWidth: true,
    chartPadding: {
      right: 20,
    },
    low: 0,
  },
  animation: {
    draw: function (data) {
      if (data.type === "line" || data.type === "area") {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === "point") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: "ease",
          },
        });
      }
    },
  },
};

module.exports = {
  dailySalesChart,
  generateData,
  getValue,
  getIncreaseOrDecrease,
  emailsSubscriptionChart,
  completedTasksChart,
  barOptions
};
