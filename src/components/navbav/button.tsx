import { FC } from "react"

interface NavbarProps {
    title:string;
    page:string
    handleSelection: (page:string)=>void;
}
  

const Button:FC<NavbarProps>=({title,page,handleSelection})=>{
    const handleClick=()=>handleSelection(title)

    return(
<>
        {page==title?
        <div className="select-none h-[50px]  text-base font-bold rounded-xl p-2 grid place-items-center shadow-xl bg-slate-400 cursor-pointer text-gray-6
        00"><h1>{title}</h1></div>
        :
        <div onClick={handleClick} className="select-none bg-gray-500 h-[50px] text-white text-base font-bold rounded-xl p-2 grid place-items-center shadow-xl hover:bg-slate-400 cursor-pointer hover:text-gray-6
        00"><h1>{title}</h1></div>}
</>
    )

}

export default Button