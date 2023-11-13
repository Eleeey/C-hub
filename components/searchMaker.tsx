import { manufacturers } from "@/constants";
import { SearchMakerProps } from "@/types";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react";

const SearchMaker = ({ maker, setMaker }: SearchMakerProps) => {
  const [query, setQuery] = useState("");

//   function to filter car maker
  const filterMaker =
    query === ""
      ? manufacturers
      : manufacturers.filter((make) => 
        make
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")
        ));


  return (
    <div className="search-manufacturer">
      <Combobox>
        <div className="relative w-full">
          {/* button for combobox from headlessUi */}
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src={"/car-logo.svg"}
              width={20}
              height={20}
              className="ml-4"
              alt={""}
            />
          </Combobox.Button>

          {/* filter car maker input */}
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(maker: string) => maker}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in-out duration-10s"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options
            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            static
          >
            {filterMaker.length === 0 && query !== "" ? (
              <Combobox.Option
                value={query}
                className="search-manufacturer__option"
              >
                Ooooops No Cars from "{query}"
              </Combobox.Option>
            ) : (
              filterMaker.map((item) => (
                <Combobox.Option
                  key={item}
                  className={({ active }) =>
                    `relative search-manufacturer__option ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>

                      {/* Show an active blue background color if the option is selected */}
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-pribg-primary-purple"
                          }`}
                        ></span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </div>
  );
};

export default SearchMaker;
