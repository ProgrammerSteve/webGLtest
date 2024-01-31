// Vertex shader code
export const vertexShaderSource = /*glsl*/`
    attribute vec3 position;
    attribute vec4 color;
    varying vec4 vColor; // Pass color to fragment shader


    uniform mat4 matrix;


    void main() {
        gl_Position =  matrix *vec4(position, 1);
        vColor = color; // Pass color to fragment shader
    }
`;

// Fragment shader code
export const fragmentShaderSource = /*glsl*/`
    precision mediump float;

    varying vec4 vColor; // Receive color from vertex shader


    void main() {
        gl_FragColor = vColor; // Sample texture and apply color
    }
`;