import React, { useEffect } from "react";
import { useSWRHook } from "lib/SWR/useSWRHook";

// components
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats() {
  const { data, error } = useSWRHook("/api/statistics/all");

  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="UKUPNO DONACIJA"
                  statTitle={
                    error
                      ? "Greška pri učitavanju..."
                      : !data
                      ? "Učitavanje..."
                      : `${data.donationCount[0].donation_count}`
                  }
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Od zadnjeg mjeseca"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="STAVKE NA SKLADIŠTU"
                  statTitle={
                    error
                      ? "Greška pri učitavanju..."
                      : !data
                      ? "Učitavanje..."
                      : `${data.itemCount[0].item_count}`
                  }
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Od zadnjeg mjeseca"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="BROJ PRIJAVLJENIH OSOBA"
                  statTitle={
                    error
                      ? "Greška pri učitavanju..."
                      : !data
                      ? "Učitavanje..."
                      : `${data.familyCount[0].families_count}`
                  }
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Od zadnjeg mjeseca"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="USPJEŠNOST PODJELE"
                  statTitle="TODO"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Od zadnjeg mjeseca"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
