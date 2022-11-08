import Image from "next/image";

const openingTimes: { day: string; hours: string }[] = [
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

const restaurantLocations: { address: string; phone: string }[] = [
  {
    address: "26 Olga Street, Bendigo, 3550, Australia",
    phone: "03 9123 4567",
  },
  {
    address: "9 Ellery Place, Wollongong, 2500, Australia",
    phone: "03 9432 5325",
  },
  {
    address: "19 Coorabie Road, Ballarat, 3350, Australia",
    phone: "03 9756 1034",
  },
];

const Footer = () => {
  return (
    <footer className="bg-zinc-800 px-4 text-white">
      <div className="m-auto flex max-w-screen-2xl gap-10 ">
        <div className="hidden w-auto lg:block">
          <Image
            src="/images/footer-bg.jpg"
            alt="restuarant atmosphere"
            width={1920}
            height={1285}
            className="h-96 w-auto object-cover"
          />
        </div>

        <div className="flex max-w-screen-sm flex-col gap-10 py-10">
          <h1 className="text-3xl font-bold uppercase">
            Pizza is not a 'trend' it's a way of life. It's our way of life.
          </h1>

          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-medium uppercase text-orange-400">
                find our restaurants
              </h2>

              <div className="flex flex-col gap-2">
                {restaurantLocations.map((restaurant) => (
                  <div key={restaurant.address}>
                    <p>{restaurant.address}</p>
                    <p>{restaurant.phone}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-xl font-medium uppercase text-orange-400">
                working hours
              </h2>

              <table>
                <tbody>
                  {openingTimes.map((time) => (
                    <tr key={time.day}>
                      <td className="w-32">{time.day}</td>
                      <td>{time.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;