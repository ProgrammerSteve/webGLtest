import { useRef,useEffect } from 'react'
import { vertexShaderSource,fragmentShaderSource } from './shaders/shader';
import { createIndexBuffer, createProgram, createShaders, createVertexBuffer, setupAttribute } from '../../../webGLUtils/createProgram';
import { mat4 } from 'gl-matrix';
import minecraft from '../../../assets/minecraft_dirt.png';



const vertexSize=5
const vertices = new Float32Array([
// Right            U,V Coord
1.0, 1.0, 1.0,      0.5,1/3,
1.0, -1.0, 1.0,     0.75,1/3,
1.0, -1.0, -1.0,    0.75,2/3,
1.0, 1.0, -1.0,     0.5,2/3,
// Front            U,V Coord
 1.0, 1.0, 1.0,     0.5,1/3,
 1.0, -1.0, 1.0,    0.75,1/3,
-1.0, -1.0, 1.0,    0.75,2/3,
-1.0, 1.0, 1.0,     0.5,2/3,
// Back             U,V Coord
 1.0, 1.0, -1.0,    0.5,1/3,
 1.0, -1.0, -1.0,   0.75,1/3,
-1.0, -1.0, -1.0,   0.75,2/3,
-1.0, 1.0, -1.0,    0.5,2/3,
// Left             U,V Coord
-1.0, 1.0, -1.0,    0.5,1/3,
-1.0, -1.0, -1.0,   0.75,1/3,
-1.0, -1.0, 1.0,    0.75,2/3,
-1.0, 1.0, 1.0,     0.5,2/3,
// Top              U,V Coord 
-1.0, 1.0, -1.0,    0.25,1/3,
-1.0, 1.0, 1.0,     0.5,1/3,
1.0, 1.0, 1.0,      0.5,2/3,
1.0, 1.0, -1.0,     0.25,2/3,
// Bottom           U,V Coord
-1.0, -1.0, -1.0,   0.75,1/3,
-1.0, -1.0, 1.0,    1,1/3,
 1.0, -1.0, 1.0,    1,2/3,
 1.0, -1.0, -1.0,   0.75,2/3,
]);
const indices = new Uint16Array([
// Left
5, 4, 6,
6, 4, 7,
// Right
8, 9, 10,
8, 10, 11,
// Front
12, 15, 14,
13, 14, 12,
// Back
16, 17, 18,
16, 18, 19,
// Top
0, 1, 2,
0, 2, 3,
// Bottom
21, 20, 22,
22, 20, 23
]);
const getMVPMatrices=(canvas: HTMLCanvasElement)=>{
  const modelMatrix = mat4.create();
  const viewMatrix = mat4.create();
  const projectionMatrix = mat4.create();
  mat4.perspective(
    projectionMatrix,
    45*Math.PI/180,
    (canvas.clientWidth / canvas.clientHeight),
    1e-4,
    1e4
  );
  const mvMatrix = mat4.create();
  const mvpMatrix = mat4.create();
  mat4.translate(modelMatrix, modelMatrix, [0, 0, 0]);
  const scale=0.1
  mat4.scale(modelMatrix, modelMatrix, [scale, scale, scale]);
  mat4.translate(viewMatrix, viewMatrix, [0, 0, 1]);
  mat4.invert(viewMatrix, viewMatrix);
  return {modelMatrix,viewMatrix,projectionMatrix,mvMatrix,mvpMatrix}
}
const loadImage=()=> new Promise<HTMLImageElement>(resolve=>{
  const image = new Image();
  image.crossOrigin = 'anonymous'; // Enable cross-origin resource sharing
  image.addEventListener('load',()=>resolve(image))
  image.src=minecraft
})

const CubeDemo = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      if(!canvas)return
      const gl = canvas.getContext('webgl');
      if (!gl) {
        throw new Error("WebGL not supported");
      }
      let animationActive = true;
      const {vertexShader,fragmentShader}=createShaders(gl,vertexShaderSource,fragmentShaderSource)
      let vertexBuffer=createVertexBuffer(gl,vertices)
      let indexBuffer=createIndexBuffer(gl,indices)
      const shaderProgram =createProgram(gl,vertexShader,fragmentShader)

     async function setUpCanvas(gl:WebGLRenderingContext,canvas: HTMLCanvasElement ){
      const uniformLocations = {
        matrix: gl.getUniformLocation(shaderProgram, 'matrix'),
      };
      gl.enable(gl.DEPTH_TEST);
      const {modelMatrix,viewMatrix,projectionMatrix,mvMatrix,mvpMatrix}=getMVPMatrices(canvas)
      setupAttribute(gl,shaderProgram,"position",3,vertexSize,0)
      setupAttribute(gl,shaderProgram,"aTexCoord",2,vertexSize,3)

      const run= async()=>{
        const image=await loadImage()
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
        gl.useProgram(shaderProgram);
        const uSamplerLocation = gl.getUniformLocation(shaderProgram, 'uSampler');
        if (uSamplerLocation !== null) {
            const imageTextureUnit = 0;
            gl.uniform1i(uSamplerLocation, imageTextureUnit);
        } else {
            console.error("Unable to get uniform location for uSampler");
        }
        // Load and bind the texture using the image element
        const texture = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
        // Set texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

        let frame=0,freq=1/25
        function animate() {
          if (!animationActive) return;
          requestAnimationFrame(animate);
          if(!gl){
              animate()
          }else{
              gl.useProgram(shaderProgram);
              mat4.rotateY(modelMatrix, modelMatrix, 0.05);
              mat4.rotateZ(modelMatrix, modelMatrix, Math.sin(frame*freq/(Math.PI))*Math.PI/180);
              mat4.multiply(mvMatrix, viewMatrix, modelMatrix);
              mat4.multiply(mvpMatrix, projectionMatrix, mvMatrix);
              gl.uniformMatrix4fv(uniformLocations.matrix, false, mvpMatrix);
              gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
              frame+=2
          }
      }
      animate();
    }
    await run()

}
setUpCanvas(gl,canvas)

  return ()=>{
    animationActive = false;
    if(gl){
      gl.deleteProgram(shaderProgram)
      gl.deleteBuffer(vertexBuffer)
      gl.deleteBuffer(indexBuffer)
    }
  }
    }, []);
  
    return <canvas width={300} height={300} className='' ref={canvasRef} />;
  };
  
  export default CubeDemo