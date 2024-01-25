// Vertex shader code
export const vertexShaderSource = /*glsl*/`
precision mediump float;
attribute vec3 position;
varying vec3 vColor;

uniform mat4 matrix;

void main() {
  vColor = vec3(position.xy, 1);
  gl_Position = matrix * vec4(position, 1);
  gl_PointSize = 1.1; // set the point size to a larger value
}
`;

// Fragment shader code
export const fragmentShaderSource = /*glsl*/`
precision mediump float;
varying vec3 vColor;
void main() {
    gl_FragColor = vec4(vColor, 1);
}
`;