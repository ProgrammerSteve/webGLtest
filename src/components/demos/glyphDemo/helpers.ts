

type GlyphInfo = {
    x: number;
    y: number;
    width: number;
  };
  
  type GlyphInfos = {
    [key: string]: GlyphInfo;
  };

type FontInfo={
    letterHeight:number,
    spaceWidth:number,
    spacing:number,
    textureWidth:number,
    textureHeight:number,
    glyphInfos:GlyphInfos
}

export const fontInfo:FontInfo = {
    letterHeight: 8,
    spaceWidth: 8,
    spacing: -1,
    //Image is a 64x40 png
    textureWidth: 64,
    textureHeight: 40,
    glyphInfos: {
      'a': { x:  0, y:  0, width: 8, },
      'b': { x:  8, y:  0, width: 8, },
      'c': { x: 16, y:  0, width: 8, },
      'd': { x: 24, y:  0, width: 8, },
      'e': { x: 32, y:  0, width: 8, },
      'f': { x: 40, y:  0, width: 8, },
      'g': { x: 48, y:  0, width: 8, },
      'h': { x: 56, y:  0, width: 8, },
      'i': { x:  0, y:  8, width: 8, },
      'j': { x:  8, y:  8, width: 8, },
      'k': { x: 16, y:  8, width: 8, },
      'l': { x: 24, y:  8, width: 8, },
      'm': { x: 32, y:  8, width: 8, },
      'n': { x: 40, y:  8, width: 8, },
      'o': { x: 48, y:  8, width: 8, },
      'p': { x: 56, y:  8, width: 8, },
      'q': { x:  0, y: 16, width: 8, },
      'r': { x:  8, y: 16, width: 8, },
      's': { x: 16, y: 16, width: 8, },
      't': { x: 24, y: 16, width: 8, },
      'u': { x: 32, y: 16, width: 8, },
      'v': { x: 40, y: 16, width: 8, },
      'w': { x: 48, y: 16, width: 8, },
      'x': { x: 56, y: 16, width: 8, },
      'y': { x:  0, y: 24, width: 8, },
      'z': { x:  8, y: 24, width: 8, },
      '0': { x: 16, y: 24, width: 8, },
      '1': { x: 24, y: 24, width: 8, },
      '2': { x: 32, y: 24, width: 8, },
      '3': { x: 40, y: 24, width: 8, },
      '4': { x: 48, y: 24, width: 8, },
      '5': { x: 56, y: 24, width: 8, },
      '6': { x:  0, y: 32, width: 8, },
      '7': { x:  8, y: 32, width: 8, },
      '8': { x: 16, y: 32, width: 8, },
      '9': { x: 24, y: 32, width: 8, },
      '-': { x: 32, y: 32, width: 8, },
      '*': { x: 40, y: 32, width: 8, },
      '!': { x: 48, y: 32, width: 8, },
      '?': { x: 56, y: 32, width: 8, },
    },
  };


  export function makeVerticesForString(fontInfo: FontInfo, s: string) {
    const len = s.length;
    const numVertices = len * 6; // 2 triangles per letter
    const data = new Float32Array(numVertices * 4); // 4 floats per vertex (2 for position, 2 for texcoord)
    let offset = 0;
    let x = 0;
    const maxX = fontInfo.textureWidth;
    const maxY = fontInfo.textureHeight;
    for (let i = 0; i < len; ++i) {
      const letter = s[i];
      const glyphInfo = fontInfo.glyphInfos[letter];
      if (glyphInfo) {
        const x2 = x + glyphInfo.width;
        const u1 = glyphInfo.x / maxX;
        const u2 = (glyphInfo.x + glyphInfo.width - 1) / maxX;
        const v1 = (glyphInfo.y + fontInfo.letterHeight - 1) / maxY;
        const v2 = glyphInfo.y / maxY;
        // 6 vertices per letter
        data[offset++] = x;
        data[offset++] = 0;
        data[offset++] = u1;
        data[offset++] = v1;
  
        data[offset++] = x2;
        data[offset++] = 0;
        data[offset++] = u2;
        data[offset++] = v1;
  
        data[offset++] = x;
        data[offset++] = fontInfo.letterHeight;
        data[offset++] = u1;
        data[offset++] = v2;
  
        data[offset++] = x;
        data[offset++] = fontInfo.letterHeight;
        data[offset++] = u1;
        data[offset++] = v2;
  
        data[offset++] = x2;
        data[offset++] = 0;
        data[offset++] = u2;
        data[offset++] = v1;
  
        data[offset++] = x2;
        data[offset++] = fontInfo.letterHeight;
        data[offset++] = u2;
        data[offset++] = v2;
        x += glyphInfo.width + fontInfo.spacing;
      } else {
        x += fontInfo.spaceWidth; // No glyph info, advance by space width
      }
    }
    return {
      array: data,
      numVertices: offset / 4,
    };
  }
