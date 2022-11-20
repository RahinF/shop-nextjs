import Image from "next/image";
import openingTimes from "../data/openingTimes";
import restaurantLocations from "../data/restaurantLocations";

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
            Pizza is not a &#39;trend&#39; it&#39;s a way of life. It&#39;s our
            way of life.
          </h1>

          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <section className="flex flex-col gap-4">
              <h2 className="text-lg font-medium uppercase text-primary">
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
              <h2 className="text-xl font-medium uppercase text-primary">
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
