export function createProgram(gl:WebGLRenderingContext, vertexShader:WebGLShader, fragmentShader:WebGLShader) {
  var program:WebGLProgram | null= gl.createProgram();
  if(!program)throw Error("No Program was created when running: gl.createProgram()")
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success){  
    return program
  }else{
    let info=gl.getProgramInfoLog(program)
    gl.deleteProgram(program);
    throw Error(`Error linking program to gl for createProgram() function:\n${info}`)
  }
}




export function createAndCompileShader(gl:WebGLRenderingContext,type: number, source: string):WebGLShader{
  if (source.length==0) {
      if(type==gl.VERTEX_SHADER)throw Error(`Vertex Shader Source is an empty string`)
      else if(type==gl.FRAGMENT_SHADER)throw Error(`Fragment Shader Source is an empty string`)
      else throw Error(`Error shader source is an empty string`)
  }
  const shader = gl.createShader(type);
  if (!shader) {
      if(type==gl.VERTEX_SHADER)throw Error(`Error creating Vertex shader`)
      else if(type==gl.FRAGMENT_SHADER)throw Error(`Error creating Fragment shader`)
      else throw Error(`Error creating shader`)
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  // Check for compilation errors
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    const errorInfo = gl.getShaderInfoLog(shader) || 'Unknown error';
    gl.deleteShader(shader);
    if(type==gl.VERTEX_SHADER)throw Error(`Error compiling Vertex shader: ${errorInfo}`)
    else if(type==gl.FRAGMENT_SHADER)throw Error(`Error compiling Fragment shader: ${errorInfo}`)
    else throw Error(`Error compiling shader: ${errorInfo}`)
  }
  return shader;
}

export function createShaders(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
  const vertexShader = createAndCompileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createAndCompileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  if(!vertexShader)throw Error(`Error: No vertexShader present`)
  if(!fragmentShader)throw Error(`Error: No fragmentShader present`)
  return { vertexShader, fragmentShader };
}

export function createAndBindBuffer(gl: WebGLRenderingContext, data: Float32Array|Uint16Array, target: GLenum): WebGLBuffer {
  const buffer = gl.createBuffer();
  if (!buffer)throw new Error('Error creating buffer');
  gl.bindBuffer(target, buffer);
  gl.bufferData(target, data, gl.STATIC_DRAW);
  return buffer;
}

// Function to create a buffer for vertices
export function createVertexBuffer(gl: WebGLRenderingContext, vertices: Float32Array): WebGLBuffer {
    return createAndBindBuffer(gl, vertices, gl.ARRAY_BUFFER);
}

// Function to create a buffer for indices
export function createIndexBuffer(gl: WebGLRenderingContext, indices: Uint16Array): WebGLBuffer {
    return createAndBindBuffer(gl, indices, gl.ELEMENT_ARRAY_BUFFER);
}


// Function to set up attribute pointers
 // Set up attribute pointers for Triangles
  //size for position=2
  //size for color=4
  //stride is 6 for the vertex
  //offset for position is 0 * Float32Array.BYTES_PER_ELEMENT
  //offset for color is 2 * Float32Array.BYTES_PER_ELEMENT
export function setupAttribute(gl: WebGLRenderingContext, program: WebGLProgram, attributeName: string, size: number, stride: number, offset: number, normalize=false) {
  const attributeLocation = gl.getAttribLocation(program, attributeName);
  gl.vertexAttribPointer(attributeLocation, size, gl.FLOAT, normalize, stride * Float32Array.BYTES_PER_ELEMENT, offset * Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(attributeLocation);
}