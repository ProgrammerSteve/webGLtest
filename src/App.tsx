import { useRef,useEffect } from 'react'
import { vertexShaderSource,fragmentShaderSource } from './shaders/shader';
import { textVertexShaderSource, textFragmentShaderSource } from './shaders/textShader';
import  WebGLRenderingContext  from 'webgl';
import './App.css'

const WebGLApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas)return
    const gl = canvas.getContext('webgl');
    if(!gl)return

// ###############################################################################################################
// ###############################################################################################################
// ###############################################################################################################
    const vertexShader = gl.createShader(gl.VERTEX_SHADER) || '';
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)|| '';
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

  // Define vertex data
  const vertices = new Float32Array([
    -0.5, -0.5, 1.0, 0.0, 0.0, 1.0, // Vertex 1: position (-0.5, -0.5), color (red)
    0.5, -0.5, 0.0, 1.0, 0.0, 1.0, // Vertex 2: position (0.5, -0.5), color (green)
    0.0,  0.5, 0.0, 0.0, 1.0, 1.0,  // Vertex 3: position (0.0, 0.5), color (blue)
    0.5,  0.5, 0.0, 1.0, 1.0, 1.0  // Vertex 3: position (0.5, 0.5), color (blue)
  ]);

  const indices = new Uint16Array([0, 1, 2,2,3,1]);

  // Create and bind a buffer
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  // Create and bind a buffer for indices
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  const shaderProgram = gl.createProgram();
  if(shaderProgram==null)return
  gl.attachShader(shaderProgram,vertexShader)
  gl.attachShader(shaderProgram,fragmentShader)
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  // Set up attribute pointers for Triangles
  const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'position');
  const colorAttributeLocation = gl.getAttribLocation(shaderProgram, 'color');

  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(colorAttributeLocation);
// ###############################################################################################################
// ###############################################################################################################
// ###############################################################################################################

//   // Compile and link shaders for text rendering
//   const textVertexShader = gl.createShader(gl.VERTEX_SHADER) || '';
//   gl.shaderSource(textVertexShader, textVertexShaderSource);
//   gl.compileShader(textVertexShader);

//   const textFragmentShader = gl.createShader(gl.FRAGMENT_SHADER) || '';
//   gl.shaderSource(textFragmentShader, textFragmentShaderSource);
//   gl.compileShader(textFragmentShader);

//   const textShaderProgram = gl.createProgram();
//   if (!textShaderProgram) return;
//   gl.attachShader(textShaderProgram, textVertexShader);
//   gl.attachShader(textShaderProgram, textFragmentShader);
//   gl.linkProgram(textShaderProgram);

// // Set up attribute pointers for Text
// const textPositionAttributeLocation = gl.getAttribLocation(textShaderProgram, 'position');
// const textTexCoordAttributeLocation = gl.getAttribLocation(textShaderProgram, 'texCoord');

// gl.vertexAttribPointer(textPositionAttributeLocation, 2, gl.FLOAT, false, 4 * Float32Array.BYTES_PER_ELEMENT, 0);
// gl.enableVertexAttribArray(textPositionAttributeLocation);

// gl.vertexAttribPointer(textTexCoordAttributeLocation, 2, gl.FLOAT, false, 4 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
// gl.enableVertexAttribArray(textTexCoordAttributeLocation);


// // Draw the text using the text shader program
// gl.useProgram(textShaderProgram);

// // Set up uniform for text texture
// const textTextureLocation = gl.getUniformLocation(textShaderProgram, 'textTexture');
// gl.uniform1i(textTextureLocation, 0);  // Use texture unit 0

// // Use the canvas as a texture for text
// const textTexture = gl.createTexture();
// gl.bindTexture(gl.TEXTURE_2D, textTexture);
// gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
// gl.generateMipmap(gl.TEXTURE_2D);






  // Add text on the canvas
  // const context = canvas.getContext('2d');
  // if (!context) return;
  // context.font = '20px Arial';
  // context.fillStyle = 'white';
  // context.fillText('Hello, WebGL!', 10, 30);

  // Draw the colored triangle using elements
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);


  }, []);


  return <canvas ref={canvasRef} />;
};
export default function App() {
  return (
    <div>
      <h1>Web GL Test</h1>
      <WebGLApp />
    </div>
  );
}