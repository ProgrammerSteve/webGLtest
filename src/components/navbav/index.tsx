import { FC, useState } from "react"
import Button from "./button"
interface NavbarProps {

}
  
const demoList=[
    "Triangle Demo",
    "Glphy Map",
    "2D Texture Demo",
    "3D Texture Demo",
    "Image Filter Demo"
]

const Navbar:FC<NavbarProps>=()=>{
    const [page,setPage]=useState<string>(demoList[0])
    const handleSelection=(page:string)=>{
        setPage(page)
    }
    return(
        <div className="bg-gray-700 h-[70px] text-white text-xl flex justify-between px-4 rounded-md">
            <div className="grid place-items-center"><h1 className="font-extrabold text-2xl">WebGL2</h1></div>
            <div className="flex items-center gap-2">
            {demoList.map((title,ind)=><Button title={title} page={page} handleSelection={handleSelection} key={`demo-item-${ind}`}/>)}
            </div>
        </div>
    )
}

export default Navbar