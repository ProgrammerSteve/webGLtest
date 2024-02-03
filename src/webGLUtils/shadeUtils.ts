export const getPartitions=(partitions:number)=>{
    if(partitions<10)throw new Error("Below partition threshold in getPartitions()")
    let rads=new Float32Array(partitions)
    for(let i=0;i<partitions;i++){
        rads[i]=(2*Math.PI/partitions)*i
    }
    return rads
}

export const cylindricalCoordSys=(radius:number,height:number,angle:number)=>{
    let x=radius*Math.cos(angle)
    let y=radius*Math.sin(angle)
    let z=height
    return [x,y,z]
}

export const getCylinderVertices=(radius:number,height:number,partitions:number)=>{
    if(partitions<10)partitions=10
   
    let offset = 0;
    let rads=getPartitions(partitions)
    let vertices=new Float32Array(partitions*6)

    for(let i=0;i<partitions;i++){
        let [x1,y1,z1]=cylindricalCoordSys(radius,height,rads[i])
        let [x2,y2,z2]=cylindricalCoordSys(radius,0,rads[i])

        vertices[offset++]=x1
        vertices[offset++]=y1
        vertices[offset++]=z1

        vertices[offset++]=x2
        vertices[offset++]=y2
        vertices[offset++]=z2
    }
    return vertices
}


export const getCylinderIndices = (vertices: Float32Array) => {
    let len = vertices.length / 6;
    let indices = new Uint16Array(len * 6);
    let offset = 0;
    for (let i = 0; i < len - 1; i++) {
        indices[offset++] = i * 2;
        indices[offset++] = i * 2 + 1;
        indices[offset++] = (i + 1) * 2;

        indices[offset++] = (i + 1) * 2;
        indices[offset++] = i * 2 + 1;
        indices[offset++] = (i + 1) * 2 + 1;
    }

    // Closing the loop by connecting the last and first vertices
    indices[offset++] = (len - 1) * 2;
    indices[offset++] = (len - 1) * 2 + 1;
    indices[offset++] = 0;

    indices[offset++] = 0;
    indices[offset++] = (len - 1) * 2 + 1;
    indices[offset++] = 1;

    return indices;
};



type ColorArr=[
    r:number,
    g:number,
    b:number
]
export const getCylinderVerticesRGB=(radius:number,height:number,partitions:number,color:ColorArr)=>{
    if(partitions<10)partitions=10
   
    let offset = 0;
    let rads=getPartitions(partitions)
    let vertices=new Float32Array(partitions*12)

    let [r,g,b]=color
    for(let i=0;i<partitions;i++){
        let [x1,y1,z1]=cylindricalCoordSys(radius,height,rads[i])
        let [x2,y2,z2]=cylindricalCoordSys(radius,0,rads[i])

        vertices[offset++]=x1
        vertices[offset++]=y1
        vertices[offset++]=z1
        vertices[offset++]=r
        vertices[offset++]=g
        vertices[offset++]=b

        vertices[offset++]=x2
        vertices[offset++]=y2
        vertices[offset++]=z2
        vertices[offset++]=r
        vertices[offset++]=g
        vertices[offset++]=b
    }
    return vertices
}
