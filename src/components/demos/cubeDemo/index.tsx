import { useRef,useEffect } from 'react'
import { vertexShaderSource,fragmentShaderSource } from './shaders/shader';
import { createIndexBuffer, createProgram, createShaders, createVertexBuffer, setupAttribute } from '../../../webGLUtils/createProgram';
import { mat4 } from 'gl-matrix';

const CubeDemo = () => {
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
		// Top
		-1.0, 1.0, -1.0,   0.5, 0.5, 0.5,
		-1.0, 1.0, 1.0,    0.5, 0.5, 0.5,
		1.0, 1.0, 1.0,     0.5, 0.5, 0.5,
		1.0, 1.0, -1.0,    0.5, 0.5, 0.5,

		// Left
		-1.0, 1.0, 1.0,    0.75, 0.25, 0.5,
		-1.0, -1.0, 1.0,   0.75, 0.25, 0.5,
		-1.0, -1.0, -1.0,  0.75, 0.25, 0.5,
		-1.0, 1.0, -1.0,   0.75, 0.25, 0.5,

		// Right
		1.0, 1.0, 1.0,    0.25, 0.25, 0.75,
		1.0, -1.0, 1.0,   0.25, 0.25, 0.75,
		1.0, -1.0, -1.0,  0.25, 0.25, 0.75,
		1.0, 1.0, -1.0,   0.25, 0.25, 0.75,

		// Front
		1.0, 1.0, 1.0,    1.0, 0.0, 0.15,
		1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
		-1.0, -1.0, 1.0,    1.0, 0.0, 0.15,
		-1.0, 1.0, 1.0,    1.0, 0.0, 0.15,

		// Back
		1.0, 1.0, -1.0,    0.0, 1.0, 0.15,
		1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
		-1.0, -1.0, -1.0,    0.0, 1.0, 0.15,
		-1.0, 1.0, -1.0,    0.0, 1.0, 0.15,

		// Bottom
		-1.0, -1.0, -1.0,   0.5, 0.5, 1.0,
		-1.0, -1.0, 1.0,    0.5, 0.5, 1.0,
		1.0, -1.0, 1.0,     0.5, 0.5, 1.0,
		1.0, -1.0, -1.0,    0.5, 0.5, 1.0,
    ]);
    
    const indices = new Uint16Array([
    // Top
		0, 1, 2,
		0, 2, 3,

		// Left
		5, 4, 6,
		6, 4, 7,

		// Right
		8, 9, 10,
		8, 10, 11,

		// Front
		13, 12, 14,
		15, 14, 12,

		// Back
		16, 17, 18,
		16, 18, 19,

		// Bottom
		21, 20, 22,
		22, 20, 23
    ]);

    const {vertexShader,fragmentShader}=createShaders(gl,vertexShaderSource,fragmentShaderSource)
    let vertexBuffer=createVertexBuffer(gl,vertices)
    let indexBuffer=createIndexBuffer(gl,indices)
    const shaderProgram =createProgram(gl,vertexShader,fragmentShader)

    const uniformLocations = {
      matrix: gl.getUniformLocation(shaderProgram, 'matrix'),
    };

    gl.enable(gl.DEPTH_TEST);
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
    let scale=0.1
    mat4.scale(modelMatrix, modelMatrix, [scale, scale, scale]);
    mat4.translate(viewMatrix, viewMatrix, [0, 0, 1]);
    mat4.invert(viewMatrix, viewMatrix);

    setupAttribute(gl,shaderProgram,"position",3,vertexSize,0)
    setupAttribute(gl,shaderProgram,"color",3,vertexSize,3)
  
    let animationActive = true;
    let frame=0,freq=1/50
    function animate() {
      if (!animationActive) return;
      requestAnimationFrame(animate);
      if(!gl){
          animate()
      }else{
          gl.useProgram(shaderProgram);
          mat4.rotateY(modelMatrix, modelMatrix, 0.03);
          mat4.rotateZ(modelMatrix, modelMatrix, Math.sin(frame*freq/(Math.PI))*Math.PI/180);
          mat4.multiply(mvMatrix, viewMatrix, modelMatrix);
          mat4.multiply(mvpMatrix, projectionMatrix, mvMatrix);
          gl.uniformMatrix4fv(uniformLocations.matrix, false, mvpMatrix);
          gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
          frame++
      }
  }
  animate();

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