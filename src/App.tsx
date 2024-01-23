import { useRef,useEffect } from 'react'
import { vertexShaderSource,fragmentShaderSource } from './shaders/shader';
import './App.css'

const WebGLApp = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas)return
    const gl = canvas.getContext('webgl');
    if(!gl)return

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
   0.0,  0.5, 0.0, 0.0, 1.0, 1.0  // Vertex 3: position (0.0, 0.5), color (blue)
]);
// Create and bind a buffer
const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);


const shaderProgram = gl.createProgram();
if(shaderProgram==null)return
gl.attachShader(shaderProgram,vertexShader)
gl.attachShader(shaderProgram,fragmentShader)
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);


// Set up attribute pointers
const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'position');
const colorAttributeLocation = gl.getAttribLocation(shaderProgram, 'color');

gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
gl.enableVertexAttribArray(positionAttributeLocation);

gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
gl.enableVertexAttribArray(colorAttributeLocation);


// Draw
gl.clearColor(0.0, 0.0, 0.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);


  }, []);


  return <canvas ref={canvasRef} />;
};
export default function App() {
  return (
    <div>
      <WebGLApp />
    </div>
  );
}