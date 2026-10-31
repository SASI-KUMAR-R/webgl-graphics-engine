// 1. Vertex Shader (Positions the point in the center and sets its size)
const vertexShaderSource = `#version 300 es
void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  gl_PointSize = 150.0; // Size in pixels (required when drawing POINTS)
}`;

// 2. Fragment Shader (Colors the point bright red)
const fragmentShaderSource = `#version 300 es
precision mediump float;
out vec4 outColor;

void main() {
  outColor = vec4(1.0, 0.0 , 0.0 , 1.0); // Red-ish color (R, G, B, A)
}`;

// Getting the canvas from the page
const canvas = document.querySelector("canvas");
if (!canvas) {
  throw new Error("Canvas element not found in HTML!");
}

// Setting the WebGL2 context
const gl = canvas.getContext("webgl2");
if (!gl) {
  throw new Error("WebGL2 is not supported by your browser or GPU!");
}

// Creating the program
const program = gl.createProgram();
if (!program) {
  throw new Error("Failed to create WebGL program!");
}

// Compiling Vertex Shader
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
if (!vertexShader) throw new Error("Failed to create vertex shader");
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  throw new Error("Vertex Shader Error: " + gl.getShaderInfoLog(vertexShader));
}

// Compiling Fragment Shader
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
if (!fragmentShader) throw new Error("Failed to create fragment shader");
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  throw new Error(
    "Fragment Shader Error: " + gl.getShaderInfoLog(fragmentShader),
  );
}

// Attaching BOTH shaders and linking the program
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  throw new Error("Program Link Error: " + gl.getProgramInfoLog(program));
}

// Using the program and drawing 1 point
gl.clearColor(0.1, 0.1, 0.1, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program);
gl.drawArrays(gl.POINTS, 0, 1); // Draws 1 point at (0, 0, 0)
