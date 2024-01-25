import TriangleDemo from "../demos/triangleDemo"
import TwoDimTextureDemo from "../demos/textureDemo/index."
import { FC } from "react"


export const PAGE_CLASSES={
    triangle: "Triangle Demo",
    glphy: "Glphy Map",
    tex2D: "2D Texture Demo",
    tex3D: "3D Texture Demo",
    image: "Image Filter Demo",
}
  
const getPage=(page= PAGE_CLASSES.triangle)=>{
return({
    [PAGE_CLASSES.triangle]: TriangleDemo,
    [PAGE_CLASSES.glphy]: TriangleDemo,
    [PAGE_CLASSES.tex2D]: TwoDimTextureDemo,
    [PAGE_CLASSES.tex3D]: TriangleDemo,
    [PAGE_CLASSES.image]: TriangleDemo,
}[page]
)}


interface PageProps {
page:string
}

const PageSelector:FC<PageProps> =({page})=>{
    const CustomPage=getPage(page);
    return(<CustomPage/>)
}

export default PageSelector