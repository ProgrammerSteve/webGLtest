// Vertex shader code
export const vertexShaderSource = /*glsl*/`
    attribute vec3 position;
    attribute vec2 aTexCoord;
    varying vec2 vTexCoord;
    uniform mat4 matrix;

    void main() {
        gl_Position =  matrix *vec4(position, 1);
        vTexCoord = aTexCoord;

    }
`;

// Fragment shader code
export const fragmentShaderSource = /*glsl*/`
    precision mediump float;
    uniform sampler2D uSampler;
    varying vec2 vTexCoord;
   
    void main() {
        gl_FragColor = texture2D(uSampler,vTexCoord); // Sample texture and apply color
    }
`;