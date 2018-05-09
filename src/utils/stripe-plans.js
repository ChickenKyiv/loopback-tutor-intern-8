const plans = [
  {
    name    : "Free Plan",
    id      : "free",
    interval: "month",
    currency: "eur",
    amount  : 0, //0
    change  : false, // default : true - so this plan will be assigned if user don't finish payment
  },
  {
    name    : "Basic",
    id      : "basic",
    interval: "month",
    interval_count: "1",
    currency: "eur",
    amount  : 4, //0
    change  : true,

    text: ""
  },
  {
    name    : "Quarterly",
    id      : "quarterly",
    interval: "month",
    interval_count: "3",
    currency: "eur",
    amount  : 8, //0
    change  : true,

    text: ""
  },

];

export default plans
