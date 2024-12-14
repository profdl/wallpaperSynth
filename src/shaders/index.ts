import { WallpaperPattern } from '../types';

const baseVertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const getSymmetryTransform = (pattern: WallpaperPattern): string => {
  switch (pattern) {
    case 'p1':
      return `
        coord = fract(coord);
      `;
    case 'p2':
      return `
        coord = fract(coord);
        vec2 center = floor(coord * 2.0) / 2.0 + 0.25;
        vec2 local = (coord - center) * 2.0;
        if (dot(local, local) > 0.25) {
          coord = center * 2.0 - coord;
        }
      `;
    case 'pm':
      return `
        coord = fract(coord);
        if (coord.y > 0.5) coord.y = 1.0 - coord.y;
      `;
    case 'pg':
      return `
        coord.x = fract(coord.x);
        coord.y = fract(coord.y);
        if (coord.y > 0.5) coord.x = fract(coord.x + 0.5);
      `;
    case 'cm':
      return `
        coord = fract(coord);
        if (coord.y > 0.5) {
          coord.y = 1.0 - coord.y;
          coord.x = fract(coord.x + 0.5);
        }
      `;
    case 'pmm':
      return `
        coord = fract(coord);
        coord = abs(2.0 * fract(coord * 0.5) - 1.0);
      `;
    case 'pmg':
      return `
        coord = fract(coord);
        if (coord.x > 0.5) coord.y = 1.0 - coord.y;
        if (coord.y > 0.5) coord.x = 1.0 - coord.x;
      `;
    case 'pgg':
      return `
        coord = fract(coord);
        if (coord.x > 0.5) coord.y = 1.0 - coord.y;
        if (coord.y > 0.5) coord.x = fract(coord.x + 0.5);
      `;
    case 'cmm':
      return `
        coord = fract(coord);
        coord = abs(2.0 * fract(coord * 0.5) - 1.0);
        if (coord.x + coord.y > 1.0) {
          coord = 1.0 - coord.yx;
        }
      `;
    case 'p4':
      return `
        coord = fract(coord);
        vec2 center = floor(coord * 2.0) / 2.0 + 0.25;
        vec2 local = coord - center;
        float angle = atan(local.y, local.x);
        angle = mod(angle + 3.14159 / 2.0, 3.14159 * 2.0 / 4.0) - 3.14159 / 2.0;
        float r = length(local);
        coord = center + r * vec2(cos(angle), sin(angle));
      `;
    case 'p4m':
      return `
        coord = fract(coord);
        if (coord.x + coord.y > 1.0) {
          coord = 1.0 - coord.yx;
        }
        if (coord.x > coord.y) {
          coord = coord.yx;
        }
      `;
    case 'p4g':
      return `
        coord = fract(coord);
        if (coord.x + coord.y > 1.0) {
          coord = 1.0 - coord.yx;
        }
        if (coord.x > 0.5) coord.y = 1.0 - coord.y;
        if (coord.y > 0.5) coord.x = 1.0 - coord.x;
      `;
    case 'p3':
      return `
        coord = fract(coord);
        vec2 center = floor(coord * 2.0) / 2.0 + 0.25;
        vec2 local = coord - center;
        float angle = atan(local.y, local.x);
        angle = mod(angle + 3.14159 / 3.0, 3.14159 * 2.0 / 3.0) - 3.14159 / 3.0;
        float r = length(local);
        coord = center + r * vec2(cos(angle), sin(angle));
      `;
    case 'p3m1':
      return `
        coord = fract(coord);
        vec2 a = vec2(1.0, 0.577350269);
        vec2 b = vec2(0.0, 1.154700538);
        vec2 local = coord.x * a + coord.y * b;
        local = fract(local);
        if (local.x + local.y > 1.0) {
          local = 1.0 - local.yx;
        }
        if (local.x > local.y) {
          local = local.yx;
        }
        coord = local.x * a + local.y * b;
      `;
    case 'p31m':
      return `
        coord = fract(coord);
        vec2 a = vec2(0.866025404, 0.5);
        vec2 b = vec2(-0.866025404, 0.5);
        vec2 local = coord.x * a + coord.y * b;
        local = fract(local);
        if (local.x + local.y > 1.0) {
          local = 1.0 - local.yx;
        }
        coord = local.x * a + local.y * b;
      `;
    case 'p6':
      return `
        coord = fract(coord);
        vec2 center = floor(coord * 2.0) / 2.0 + 0.25;
        vec2 local = coord - center;
        float angle = atan(local.y, local.x);
        angle = mod(angle + 3.14159 / 6.0, 3.14159 * 2.0 / 6.0) - 3.14159 / 6.0;
        float r = length(local);
        coord = center + r * vec2(cos(angle), sin(angle));
      `;
    case 'p6m':
      return `
        coord = fract(coord);
        vec2 center = floor(coord * 2.0) / 2.0 + 0.25;
        vec2 local = coord - center;
        float angle = atan(local.y, local.x);
        angle = mod(angle, 3.14159 / 6.0);
        float r = length(local);
        coord = center + r * vec2(cos(angle), sin(angle));
      `;
    default:
      return '';
  }
};

const createFragmentShader = (pattern: WallpaperPattern) => `
  uniform sampler2D u_texture;
  uniform float rows;
  uniform float columns;
  uniform float rotation;
  uniform float scale;
  uniform float aspectRatio;
  uniform float rowOffset;
  uniform float columnOffset;
  uniform bool mirrorX;
  uniform bool mirrorY;
  uniform bool mirrorAltX;
  uniform bool mirrorAltY;
  uniform float hue;
  uniform float saturation;
  uniform float brightness;
  uniform float contrast;
  uniform float threshold;
  uniform float viewportAspect;
  uniform float spacing;
  
  varying vec2 vUv;

  mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  }

  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  vec3 adjustColor(vec3 color) {
    if (threshold > 0.0) {
      float luminance = dot(color, vec3(0.299, 0.587, 0.114));
      color = luminance > threshold ? vec3(1.0) : vec3(0.0);
    }

    vec3 hsv = rgb2hsv(color);
    hsv.x = mod(hsv.x + hue / 360.0, 1.0);
    hsv.y *= saturation;
    vec3 rgb = hsv2rgb(hsv);
    rgb = (rgb - 0.5) * contrast + 0.5;
    rgb *= brightness;
    return clamp(rgb, 0.0, 1.0);
  }

  vec2 applySymmetry(vec2 uv) {
    vec2 coord = uv;
    ${getSymmetryTransform(pattern)}
    return coord;
  }

  void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= viewportAspect;
    uv /= scale;
    uv.y *= aspectRatio;
    
    vec2 cellSize = vec2(1.0 / columns, 1.0 / rows);
    vec2 spaceSize = cellSize * spacing;
    vec2 totalCellSize = cellSize + spaceSize;
    
    vec2 cell = floor(vec2(uv.x * columns, uv.y * rows));
    vec2 offset = vec2(
      mod(cell.y * columnOffset, 1.0),
      mod(cell.x * rowOffset, 1.0)
    );
    
    vec2 cellUv = fract(vec2(uv.x * columns, uv.y * rows) + offset);
    cellUv = (cellUv * totalCellSize - spaceSize * 0.5) / cellSize;
    
    if (cellUv.x < 0.0 || cellUv.x > 1.0 || cellUv.y < 0.0 || cellUv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
    
    if (mirrorAltX && mod(cell.x, 2.0) == 1.0) cellUv.x = 1.0 - cellUv.x;
    if (mirrorAltY && mod(cell.y, 2.0) == 1.0) cellUv.y = 1.0 - cellUv.y;
    
    vec2 centeredUv = cellUv;
    vec2 rotatedUv = rotate2d(rotation) * (centeredUv - 0.5) + 0.5;
    
    if (mirrorX) rotatedUv.x = abs(2.0 * fract(rotatedUv.x * 0.5) - 1.0);
    if (mirrorY) rotatedUv.y = abs(2.0 * fract(rotatedUv.y * 0.5) - 1.0);
    
    vec2 finalUv = applySymmetry(rotatedUv);
    
    if (finalUv.x < 0.0 || finalUv.x > 1.0 || finalUv.y < 0.0 || finalUv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
    
    vec4 color = texture2D(u_texture, finalUv);
    color.rgb = adjustColor(color.rgb);
    
    gl_FragColor = color;
  }
`;

const shaders: Record<WallpaperPattern, { vertexShader: string; fragmentShader: string }> = 
  Object.fromEntries(
    ['p1', 'p2', 'pm', 'pg', 'cm', 'pmm', 'pmg', 'pgg', 'cmm', 'p4', 'p4m', 'p4g', 'p3', 'p3m1', 'p31m', 'p6', 'p6m'].map(
      pattern => [pattern, {
        vertexShader: baseVertexShader,
        fragmentShader: createFragmentShader(pattern),
      }]
    )
  ) as Record<WallpaperPattern, { vertexShader: string; fragmentShader: string }>;

export const getShaderForPattern = (pattern: WallpaperPattern) => {
  return shaders[pattern];
};