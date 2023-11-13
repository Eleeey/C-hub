// "use client"
import CarCard from "@/components/CarCard";
import CustomFilter from "@/components/CustomFilter";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import ShowMore from "@/components/ShowMore";
import { fuels, yearsOfProduction } from "@/constants";
import { HomeProps } from "@/types";
import { fetchCars } from "@/utils";
// import Image from "next/image";

export default async function Home({ searchParams }: HomeProps) {
  const cars = await fetchCars({
    manufacturer: searchParams.manufacturer || "toyota",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "gas",
    limit: searchParams.limit || 10,
    model: searchParams.model || "camry",
    pageNumber: 0
  });

  const isDataEmpty = !Array.isArray(cars) || cars.length < 1 || !cars;
  console.log(cars);
  return (
    <div className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {cars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > cars.length}
            />
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{cars?.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
