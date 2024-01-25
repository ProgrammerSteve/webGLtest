import { useRef,useEffect,FC } from 'react'
import { mat4,vec3,ReadonlyVec3 } from 'gl-matrix';
import { vertexShaderSource,fragmentShaderSource } from './shaders/shader';
import {  createProgram, createShaders, createVertexBuffer, } from '../../../webGLUtils/createProgram';


function spherePointCloud(pointCount:number) {
    let points = [];
    for (let i = 0; i < pointCount; i++) {
      const r = () => Math.random() - 0.5; // -.5 < x < 0.5
      const inputPoint:ReadonlyVec3 = [r(), r(), r()];
      const outputPoint = vec3.normalize(vec3.create(), inputPoint);
      points.push(...outputPoint);
    }
    let fl32Arr=new Float32Array(points)
    return fl32Arr;
}

const MotionDemo:FC=()=>{
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const vertexData = spherePointCloud(1e3);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl)  throw new Error("WebGL not supported");
        
        const { vertexShader, fragmentShader } = createShaders(gl, vertexShaderSource, fragmentShaderSource);
        const positionBuffer = createVertexBuffer(gl, vertexData);
        const program = createProgram(gl, vertexShader, fragmentShader);
        gl.useProgram(program);
        const positionLocation = gl.getAttribLocation(program, 'position'); // Use the correct attribute name
        gl.enableVertexAttribArray(positionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
      
        const uniformLocations = {
          matrix: gl.getUniformLocation(program, 'matrix'),
        };
      
        gl.enable(gl.DEPTH_TEST);
        const modelMatrix = mat4.create();
        const viewMatrix = mat4.create();
        const projectionMatrix = mat4.create();
        mat4.perspective(
          projectionMatrix,
          (75 * Math.PI) / 180,
          canvas.width / canvas.height,
          1e-4,
          1e4
        );
      
        const mvMatrix = mat4.create();
        const mvpMatrix = mat4.create();
        mat4.translate(modelMatrix, modelMatrix, [0, 0, 0]);
        mat4.translate(viewMatrix, viewMatrix, [0, 0.1, 2]);
        mat4.invert(viewMatrix, viewMatrix);


        let animationActive = true;
      
        function animate() {
            if (!animationActive) return;
            requestAnimationFrame(animate);
            if(!gl){
                animate()
            }else{
                gl.useProgram(program);
                mat4.rotateY(modelMatrix, modelMatrix, 0.03);
                mat4.multiply(mvMatrix, viewMatrix, modelMatrix);
                mat4.multiply(mvpMatrix, projectionMatrix, mvMatrix);
                gl.uniformMatrix4fv(uniformLocations.matrix, false, mvpMatrix);
                gl.drawArrays(gl.POINTS, 0, vertexData.length / 3);
            }
        }
        animate();



        return ()=>{
            animationActive = false;
            if(gl){
              gl.deleteProgram(program)
              gl.deleteBuffer(positionBuffer)
            }
          }


      }, []);
    return(
    
    <>
    <canvas ref={canvasRef}/>
    </>
    )
}

export default MotionDemo