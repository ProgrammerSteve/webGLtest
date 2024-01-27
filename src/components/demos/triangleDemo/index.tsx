import { useRef,useEffect } from 'react'
import { vertexShaderSource,fragmentShaderSource } from './shaders/shader';
import { createIndexBuffer, createProgram, createShaders, createVertexBuffer, setupAttribute } from '../../../webGLUtils/createProgram';

const TriangleDemo = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      if(!canvas)return
      const gl = canvas.getContext('webgl');
      if (!gl) {
        throw new Error("WebGL not supported");
      }
      
    const vertexSize=6



    const vertices = new Float32Array([
      0,1,0.0, 0.0, 1.0,1,
      -.433,0,1.0, 0.0, 1.0,1,
      .433,0,0.0, 1.0, 1.0, 1,
      
      -.866,-1,0.0, 0.0, 1.0,1,
      0,-1,1.0, 0.0, 1.0,1,
      .866,-1,0.0, 1.0, 1.0,1 
    ]);
    
    const indices = new Uint16Array([0, 1, 2,1,3,4,2,4,5]);

    const {vertexShader,fragmentShader}=createShaders(gl,vertexShaderSource,fragmentShaderSource)
    let vertexBuffer=createVertexBuffer(gl,vertices)
    let indexBuffer=createIndexBuffer(gl,indices)
    const shaderProgram =createProgram(gl,vertexShader,fragmentShader)
    setupAttribute(gl,shaderProgram,"position",2,vertexSize,0)
    setupAttribute(gl,shaderProgram,"color",4,vertexSize,2)
  
    gl.useProgram(shaderProgram);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(shaderProgram);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
  
  return ()=>{
    if(gl){
      gl.deleteProgram(shaderProgram)
      gl.deleteBuffer(vertexBuffer)
      gl.deleteBuffer(indexBuffer)
    }
  }
    }, []);
  
  
    return <canvas width={300} height={300} className='' ref={canvasRef} />;
  };
  
  export default TriangleDemo