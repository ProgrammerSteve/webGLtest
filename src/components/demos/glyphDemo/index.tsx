import { useRef,useEffect } from 'react'
import { vertexShaderSource,fragmentShaderSource } from './shaders/shader.ts';
import {  createProgram, createShaders, createVertexBuffer, setupAttribute } from '../../../webGLUtils/createProgram.ts';
import { makeVerticesForString, fontInfo } from './helpers.ts';
import { mat4 } from 'gl-matrix';
import GlphyImage from '../../../assets/font.png';

const GlyphDemo = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
      const setUpCanvas=async()=>{
        const canvas = canvasRef.current;
        if(!canvas)return
        const gl = canvas.getContext('webgl');
        if(!gl)return
    // ###############################################################################################################
      const verticesInfo=makeVerticesForString(fontInfo,'hello world')
      const{array,numVertices}=verticesInfo
      const {vertexShader,fragmentShader}=createShaders(gl,vertexShaderSource,fragmentShaderSource)
      createVertexBuffer(gl,array)
      const shaderProgram =createProgram(gl,vertexShader,fragmentShader)
      setupAttribute(gl,shaderProgram,"aPosition",2,4,0)
      setupAttribute(gl,shaderProgram,"aTexCoord",2,4,2)
    // ###############################################################################################################
    const loadImage=()=> new Promise<HTMLImageElement>(resolve=>{
      const image = new Image();
      image.crossOrigin = 'anonymous'; // Enable cross-origin resource sharing
      image.addEventListener('load',()=>resolve(image))
      image.src=GlphyImage
    })
    const run= async()=>{
      const image=await loadImage()
      console.log('Image dimensions:', image.width, 'x', image.height);
      //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
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
    }
    await run()
    const projectionMatrix = mat4.create();
    let zoomFactor=0.6
    mat4.ortho(
      projectionMatrix,
      -canvas.width / 2 * zoomFactor,
      canvas.width / 2 * zoomFactor,
      -canvas.height / 2 * zoomFactor,
      canvas.height / 2 * zoomFactor,
      1e-4,
      1e4
    );
    let uMatrix=gl.getUniformLocation(shaderProgram, 'matrix')
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(shaderProgram);
    gl.uniformMatrix4fv(uMatrix, false, projectionMatrix);
    gl.drawArrays(gl.TRIANGLES,0,numVertices);
    }
    setUpCanvas()
    }, []);
    return <canvas width={300} height={300} className='' ref={canvasRef} />
  };
  export default GlyphDemo





