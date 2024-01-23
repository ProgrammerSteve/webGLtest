// Vertex shader code
export const vertexShaderSource = /*glsl*/`
    attribute vec2 position;
    attribute vec4 color;
    attribute vec2 texCoord; // New attribute for texture coordinates
    varying vec4 vColor; // Pass color to fragment shader
    varying vec2 vTexCoord; // Pass texture coordinates to fragment shader

    void main() {
        gl_Position = vec4(position, 0, 1);
        vColor = color; // Pass color to fragment shader
        vTexCoord = texCoord; // Pass texture coordinates to fragment shader
    }
`;

// Fragment shader code
export const fragmentShaderSource = /*glsl*/`
    precision mediump float;

    varying vec4 vColor; // Receive color from vertex shader
    varying vec2 vTexCoord; // Receive texture coordinates from vertex shader
    uniform sampler2D textureSampler; // Texture sampler for the image

    void main() {
        gl_FragColor = texture2D(textureSampler, vTexCoord) * vColor; // Sample texture and apply color
    }
`;