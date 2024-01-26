import { FC } from "react"

interface HamburgerMenuProps {
    toggleSidebar:()=>void;
    isOpen:boolean;
}
  
const HamburgerMenu:FC<HamburgerMenuProps>=({toggleSidebar,isOpen})=>{
    return(
    <div className="div-container z-50" onClick={toggleSidebar}>
        <div className={`top-bar ${isOpen&&'bar-open-top'}`} />
        <div className={`mid-bar ${isOpen&&'bar-open-middle'}`} />
        <div className={`bottom-bar ${isOpen&&'bar-open-bottom'}`} />
    </div>
    )
}
export default HamburgerMenu