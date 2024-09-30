

import { GlareCard } from "./ui/glare-card";


const  GlareCardDemo =({card})=> {
 
  return (
      <GlareCard className="flex flex-col items-start justify-end py-8 px-6 ">
      <img
          className="h-full w-full absolute inset-0 object-cover"
          src= {card.img_url} />
        <p className="font-bold text-white text-3xl z-10">{card.name}</p>
        <div className="z-10 top-4 right-0 mr-2 absolute flex flex-col">

        <p className="font-normal text-sm text-blue-400 mt-3 z-10 bg-black rounded-md text-center px-1">
        HP : {card.hp}
        </p> 
        <p className="font-normal text-sm text-blue-400 mt-3 z-10 bg-black rounded-md text-center px-1">
        ATK : {card.attack}
        </p>
        <p className="font-normal text-sm text-blue-400 mt-3 z-10 bg-black rounded-md text-center px-1">
        DEF : {card.defense}
        </p>
        <p className="font-normal text-sm text-blue-400 mt-3 z-10 bg-black rounded-md text-center px-1">
        Speed : {card.speed}
        </p>
        <p className="font-normal text-sm text-blue-400 mt-3 z-10 bg-black rounded-md text-center px-1">
        Totol : {card.total}
        </p>
        <p className="font-normal text-sm text-blue-400 mt-3 z-10 bg-black rounded-md text-center px-1">
        Height : {card.height}
        </p>
        <p className="font-normal text-sm text-blue-400 mt-3 z-10 bg-black rounded-md text-center px-1">
        Weight : {card.weight}
        </p>
        
        </div>
        <div className="z-10 absolute top-0 mt-3  ">
           <p className="text-xl font-normal text-yellow-300 font-mono">{card.special_group}</p>
        </div>
        <div className="z-10 flex ">
           <p className="font-normal text-sm text-blue-400 mt-3 mr-3  bg-black rounded-full text-center p-3">{card.type1}</p>
           <p className="font-normal text-sm text-blue-400 mt-3 mr-3  bg-black rounded-full text-center p-3">{card.type2}</p>
           <p className="font-normal text-sm text-blue-400 mt-3  bg-black rounded-full text-center p-3">{card.species}</p>
        </div>
      </GlareCard>
      
   
  );
}
export default GlareCardDemo