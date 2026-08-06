export default function StatsCards() {
  const stats = [
   {
     title: "Vehículos activos",
     value: "12",
   },
   {
     title: "Clientes",
     value: "148",
   },
   {
     title: "Facturación",
     value: "3.250€",
   },
   {
     title: "Citas hoy",
     value: "5",
   },
  ];

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

       {stats.map((stat) => (
         <div
           key={stat.title}
           className="bg-white rounded-2xl p-6 shadow"
          >
           <p className="text-slate-500">{stat.title}</p>

           <h2 className="text-4xl font-bold mt-2">
             {stat.value}
           </h2>
         </div>
       ))}

      </div>
   </div>
  );
}