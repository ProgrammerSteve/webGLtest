// Vertex shader code
export  const textVertexShaderSource = /*glsl*/`
    attribute vec2 position;
    attribute vec2 texCoord; // New attribute for texture coordinates
    varying vec2 vTexCoord; // Pass texture coordinates to fragment shader

    void main() {
        gl_Position = vec4(position, 0, 1);
        vTexCoord = texCoord; // Pass texture coordinates to fragment shader
    }
`;



// Fragment shader code
export const textFragmentShaderSource = /*glsl*/`
    precision mediump float;

    varying vec2 vTexCoord; // Receive texture coordinates from vertex shader
    uniform sampler2D textTexture; // Texture sampler for the text

    void main() {
        gl_FragColor = texture2D(textTexture, vTexCoord);
    }
`;