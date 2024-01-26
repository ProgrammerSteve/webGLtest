import { FC } from "react"
import Button from "./button"
import HamburgerMenu from "./menu";
import { demoList } from "../../App";
interface NavbarProps {
page:string;
handleSelection:(page:string)=>void;
toggleSidebar:()=>void;
isOpen:boolean;
}
  


const Navbar:FC<NavbarProps>=({page,handleSelection,toggleSidebar,isOpen})=>{
    return(
        <div className="bg-gray-700 h-[70px] text-white text-xl flex items-center justify-between px-4 rounded-md">
            <div className="grid place-items-center"><h1 className="font-extrabold text-2xl">WebGL2</h1></div>
          <div className="hidden md:flex items-center gap-2">
            {demoList.map((title,ind)=><Button title={title} page={page} handleSelection={handleSelection} key={`demo-item-${ind}`}/>)}
            </div>
            <div className="block md:hidden">
            <HamburgerMenu toggleSidebar={toggleSidebar} isOpen={isOpen}/>
            </div>
        </div>
    )
}

export default Navbar