import { useState } from "react";

type ContadorProps ={
    initial ?:number;
    step ?:number;
}

export const Modulo2Page  =({initial=0, step = 1}:ContadorProps) =>{
    const[count,setCount] = useState<number>(initial)
    const inc = () => setCount((c)=>c+step)
    const dec = () => setCount((c)=>c-step)

    //inferido 
    const[tazas,setTazas] =useState(1)
    
    type Ingredientes = "agua"| "cafe"|"azucar"
    type RecetaCafe = {
        agua?: number;
        cafe?:number;
        azucar?:number; 
    };
    type CafePreparado ={
        mensaje:string;
        intensidad:"suave"|"fuerte"; //union literal
    };
    //explicito - union literal
    const[intensidadUI, setIntensidadUI] =useState<CafePreparado["intensidad"]>
    ("suave")

    //explicito con null
    const[ultimoCade,setUltimoCafe]=useState<CafePreparado | null>(null);
    //valores que pueden ser undefined
    const [azucarIn,setAzucarIn] = useState<number | undefined>(undefined)
    //interface
    //Padre
   interface RecetaBase {
    agua:number;
    cafe:number;
   }
   //Hijo
   interface RecetaAzucar extends RecetaBase{
    azucar:number; //padre hacia hijo
   }

   interface MaquinaCafe{
    modelo:string;
    }
   interface MaquinaCafe{
    aguaMax?:number
    };
   
    const maquina : MaquinaCafe ={modelo: "Kame-500",aguaMax: 2000};

    function preparaCafe({agua=0 ,cafe=0, azucar=0}:RecetaCafe):CafePreparado{
        const intensidad = cafe > 10 ? "fuerte":"suave";
        return{
            mensaje : `Cafe listo con ${agua} ml de agua y +
            ${cafe}g de cafe`+(azucar?`+${azucar}g de azucar`:
            ""),
            intensidad,
        };
    };

    interface CafepreparadoI{mensaje:string; intensidad : "suave" | "fuerte"}

    function prepararCafeI(receta : RecetaAzucar): CafepreparadoI{
        const intensidad  = 
        receta.cafe > 10 ? "fuerte" : "suave";
        return{
            mensaje:`Cafe listo (INTF) con ${receta.agua}ml de agua y ${receta.cafe}g de cafe
            + ${receta.azucar}g de azucar`,
            intensidad,
        }
    }
    const onCafe = () =>{
        const resultado = preparaCafe({ cafe:15, azucar:5});
        alert(resultado.mensaje + " con intesidad: " + resultado.intensidad)
    };   

    const onCafeInterface = () => {
        const resultado = prepararCafeI({agua:200,cafe:5,azucar:5})
        alert(resultado.mensaje + " con intesidad: " + resultado.intensidad)
    };   

    // Intersecciones 
    type A = {nombre:string};
    type B = {edad:number};
    type C = {state?:boolean}
    type Persona = A & B & C 
    const juanObject: Persona ={nombre:"Juan", edad:30, state:true}
     return (
        <div className="h-screen bg-amber-300 text-black
        flex flex-col p-4 gap-4">
            <span>Modulo2Page</span>
            <button className="bg-amber-950 text-white rounded-2xl " onClick={onCafe}>
                Hacer cafe con Type
            </button>
            <span>Interface</span>
             <button className="bg-black text-white rounded-2xl " onClick={onCafeInterface}>
                Hacer cafe con Interface
            </button>
            <span>state tipados</span>
            {intensidadUI}
            <button onClick={()=>setIntensidadUI("fuerte")}>cambiar state</button>
            <span>Contador</span>
            <button className="rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 hover:bg-neutral-700 text-amber-50 " onClick={dec}>-</button>
            <span className="min-w-[3ch] text-center text-2x1 font-semibold">{count}</span>
            <button className="rounded-md border border-neutral-700 bg-neutral-800 px-3 py-1 hover:bg-neutral-700 text-amber-50 " onClick={inc}>+</button>
            
            <h2>Interseccion(&)</h2>
            { juanObject.nombre} -  {juanObject.edad}
            <pre>{JSON.stringify(juanObject,null,2)}</pre>
       
        </div>
    );
};