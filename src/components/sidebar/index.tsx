import { FC } from "react"
import Button from "../navbav/button"
import { demoList } from "../../App";
interface NavbarProps {
page:string;
handleSelection:(page:string)=>void;
toggleSidebar:()=>void;
isOpen:boolean;
}
  
const Sidebar:FC<NavbarProps>=({page,handleSelection,toggleSidebar,isOpen})=>{
    const handleSideBarClick=(page:string)=>{
        handleSelection(page)
        toggleSidebar()
    }
    return(
        <>
        {
        // isOpen &&
        <div className={` side-bar-animation ${isOpen ? 'active' : ''} pt-[70px] text-white text-xl fixed top-0 right-0 w-[150px] sidebar-height flex flex-col gap-2 px-4 rounded-md`}>
            {demoList.map((title,ind)=><Button title={title} page={page} handleSelection={handleSideBarClick.bind(page)} key={`demo-sidebar-item-${ind}`}/>)}
        </div>}
        </>
    )
}

export default Sidebar


// rgb(55 65 81) start 
//rgb(31 41 55) finish
