
import React from "react";
import CardBarChart from "components/Cards/CardBarChart.js";


export default function FormateurDashboard() {
  return (
    <>
      <div className="flex flex-wrap gap-4 p-4">
        
                     <div className="w-full xl:w-4/15 px-4">
                              <CardBarChart />
                            </div>  

      </div>
     
    </>
  );
}
