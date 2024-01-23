    // Vertex shader code
    export  const vertexShaderSource = /*glsl*/`
    attribute vec2 position;
    attribute vec4 color;
      varying vec4 vColor; // Pass color to fragment shader
      
      void main() {
        gl_Position = vec4(position, 0, 1);
        vColor = color; // Pass color to fragment shader
      }
    `;



    // Fragment shader code
    export const fragmentShaderSource = /*glsl*/`
      precision mediump float;

      varying vec4 vColor; // Receive color from vertex shader

      void main() {
        gl_FragColor = vColor; // Use the received color
      }
    `;