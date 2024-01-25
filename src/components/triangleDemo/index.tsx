import { useRef,useEffect } from 'react'
import { vertexShaderSource,fragmentShaderSource } from '../../shaders/shader';
import { createIndexBuffer, createProgram, createShaders, createVertexBuffer, setupAttribute } from '../../webGLUtils/createProgram';




const TriangleDemo = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
      const canvas = canvasRef.current;
      if(!canvas)return
      const gl = canvas.getContext('webgl');
      if(!gl)return
  
  // ###############################################################################################################
    const vertexSize=8
    const vertices = new Float32Array([
      -0.5, -0.5, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, // Vertex 1: position (-0.5, -0.5), color (red), texture coordinates (0, 0)
      0.5, -0.5, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, // Vertex 2: position (0.5, -0.5), color (green), texture coordinates (1, 0)
      0.0,  0.5, 0.0, 0.0, 1.0, 1.0, 0.5, 1.0, // Vertex 3: position (0.0, 0.5), color (blue), texture coordinates (0.5, 1)
      0.5,  0.5, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0  // Vertex 4: position (0.5, 0.5), color (blue), texture coordinates (1, 1)
    ]);
    
    const indices = new Uint16Array([0, 1, 2,2,3,1]);
  
    const {vertexShader,fragmentShader}=createShaders(gl,vertexShaderSource,fragmentShaderSource)
    createVertexBuffer(gl,vertices)
    createIndexBuffer(gl,indices)
    const shaderProgram =createProgram(gl,vertexShader,fragmentShader)
    setupAttribute(gl,shaderProgram,"position",2,vertexSize,0)
    setupAttribute(gl,shaderProgram,"color",4,vertexSize,2)
    setupAttribute(gl,shaderProgram,"texCoord",2,vertexSize,6)
  // ###############################################################################################################
  
  
  // Load and bind the texture
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  
  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
  
  // Load the image
  const image = new Image();
  image.src = './assets/font-character-map.png';
  
  // Wait for the image to load
  image.onload = function() {
    // Bind the texture again
    gl.bindTexture(gl.TEXTURE_2D, texture);
  
    // Upload the image data to the texture
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  
    // Now, you can use the texture in your shaders
    // Don't forget to set the texture uniform in your shader program
  
  
    const textureLocation = gl.getUniformLocation(shaderProgram, 'textureSampler');
  gl.uniform1i(textureLocation, 0); // Use texture unit 0
  
  };
  
  // Set the texture unit for the sampler in the shader
  gl.useProgram(shaderProgram);
  const textureLocation = gl.getUniformLocation(shaderProgram, 'textureSampler');
  gl.uniform1i(textureLocation, 0); // Use texture unit 0
  
  
    // Draw the colored triangle using elements
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(shaderProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
  
  
    }, []);
  
  
    return <canvas ref={canvasRef} />;
  };
  
  export default TriangleDemo