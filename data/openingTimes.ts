interface Time {
  day: string;
  hours: string;
}

const openingTimes: Time[] = [
  {
    day: "Monday",
    hours: "11am - 11pm",
  },
  {
    day: "Tuesday",
    hours: "11am - 11pm",
  },
  {
    day: "Wednesday",
    hours: "11am - 11pm",
  },
  {
    day: "Thursday",
    hours: "11am - 11pm",
  },
  {
    day: "Friday",
    hours: "11am - 2am",
  },
  {
    day: "Saturday",
    hours: "11am - 12am",
  },
  {
    day: "Sunday",
    hours: "1am - 11pm",
  },
];

export default openingTimes;
