import { useRef,useEffect } from 'react'
import { vertexShaderSource,fragmentShaderSource } from './shaders/shader.ts';
import {  createProgram, createShaders, createVertexBuffer, setupAttribute } from '../../../webGLUtils/createProgram';

import Painting from '../../../assets/painting.png';


const TwoDimTextureDemo = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {

      const setUpCanvas=async()=>{
        const canvas = canvasRef.current;
        if(!canvas)return
        const gl = canvas.getContext('webgl');
        if(!gl)return
    
    // ###############################################################################################################
      const vertices = new Float32Array([
        -1.0, -1.0,         0.0, 0.0,// Vertex 1: position vec2, texture vec2
        1.0, -1.0,         1.0, 0.0, // Vertex 2: position vec2, texture vec2
        1.0,  1.0,       1.0, 1.0, // Vertex 3: position vec2, texture vec2
        1.0, 1.0,         1.0, 1.0,// Vertex 1: position vec2, texture vec2
        -1.0, 1.0,         0.0, 1.0, // Vertex 2: position vec2, texture vec2
        -1.0,  -1.0,       0.0, 0.0, // Vertex 3: position vec2, texture vec2
      ]);

      const {vertexShader,fragmentShader}=createShaders(gl,vertexShaderSource,fragmentShaderSource)

      createVertexBuffer(gl,vertices)
      const shaderProgram =createProgram(gl,vertexShader,fragmentShader)

      setupAttribute(gl,shaderProgram,"aPosition",2,4,0)
      setupAttribute(gl,shaderProgram,"aTexCoord",2,4,2)

    // ###############################################################################################################
  
  
    const loadImage=()=> new Promise<HTMLImageElement>(resolve=>{
      const image = new Image();
      image.crossOrigin = 'anonymous'; // Enable cross-origin resource sharing
      image.addEventListener('load',()=>resolve(image))
      image.src=Painting
    })
  
    const run= async()=>{
      const image=await loadImage()
      console.log('Image dimensions:', image.width, 'x', image.height);
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

      // Convert image to ArrayBuffer and use it as texImage2D parameter
      const response = await fetch(image.src);
      const blob = await response.blob();
      console.log('Blob size:', blob.size);
      const arrayBuffer = await new Response(blob).arrayBuffer();
      
      console.log('ArrayBuffer length:', arrayBuffer.byteLength);
      console.log('First few bytes:', new Uint8Array(arrayBuffer).slice(0, 16));

      // Set texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    await run()


      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(shaderProgram);
      gl.drawArrays(gl.TRIANGLES,0,vertices.length/3);
      }
      setUpCanvas()
    }, []);
  
    return <canvas width={300} height={300} className='' ref={canvasRef} />
  };
  
  export default TwoDimTextureDemo

