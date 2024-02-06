import TriangleDemo from "../demos/triangleDemo"
import TwoDimTextureDemo from "../demos/textureDemo/index."
import MotionDemo from "../demos/motionDemo"
import GlyphDemo from "../demos/glyphDemo"
import CubeDemo from "../demos/cubeDemo"
import ComingSoon from "../comingSoon"
import { FC } from "react"


export const PAGE_CLASSES={
    triangle: "Triangle Demo",
    glphy: "Glphy Atlas",
    tex2D: "2D Texture Demo",
    tex3D: "3D Texture Demo",
    motion: "Motion Demo",
    image: "Image Filter Demo",
}
  
const getPage=(page= PAGE_CLASSES.tex3D)=>{
return({
    [PAGE_CLASSES.triangle]: TriangleDemo,
    [PAGE_CLASSES.glphy]: GlyphDemo,
    [PAGE_CLASSES.tex2D]: TwoDimTextureDemo,
    [PAGE_CLASSES.tex3D]: CubeDemo,
    [PAGE_CLASSES.motion]: MotionDemo,
    [PAGE_CLASSES.image]: ComingSoon,
}[page]
)}


interface PageProps {
page:string
}

const PageSelector:FC<PageProps> =({page})=>{
    const CustomPage=getPage(page);
    return(
    
    <div className='page-height grid place-items-center'><CustomPage/></div>
    
    )
}

export default PageSelector