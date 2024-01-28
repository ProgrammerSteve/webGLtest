// Vertex shader code
export const vertexShaderSource = /*glsl*/`
attribute vec2 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;


    void main() {
        gl_Position = vec4(aPosition, 0, 1);
        vTexCoord = aTexCoord;
    }
`;

// Fragment shader code
export const fragmentShaderSource = /*glsl*/`
    precision mediump float;
    uniform sampler2D uSampler;
    varying vec2 vTexCoord;
    


    void main() {
        gl_FragColor = texture2D(uSampler,vTexCoord); 
    }
`;