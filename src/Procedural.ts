import { Vector3 } from 'three';

// class Perlin {
  // position: Vector2;
  // buildingThreshold: number;

  // constructor(x:number, y:number){
  //   this.position = pos;
  //   this.buildingThreshold = 0.6;
  // }

function dot2(vec: Vector3, x:number, y:number): number {
  return vec.x * x + vec.y * y
}

function fade(t:number) : number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a:number, b:number, t:number):number {
  return (1 - t) * a + t * b;
}

function perlin2d(x:number, y:number):number {
  var X = Math.floor(x),
      Y = Math.floor(y);
  // Get relative xy coordinates of point within that cell
  x = x - X;
  y = y - Y;
  // Wrap the integer cells at 255 (smaller integer period can be introduced here)
  X = X & 255;
  Y = Y & 255;

  var perm = new Array(512);
  var gradP = new Array(512);
  var grad3 = [
    new Vector3(1, 1, 0),
    new Vector3(-1, 1, 0),
    new Vector3(1, -1, 0),
    new Vector3(-1, -1, 0),
    new Vector3(1, 0, 1),
    new Vector3(-1, 0, 1),
    new Vector3(1, 0, -1),
    new Vector3(-1, 0, -1),
    new Vector3(0, 1, 1),
    new Vector3(0, -1, 1),
    new Vector3(0, 1, -1),
    new Vector3(0, -1, -1)
  ];

  var p = [
    151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8, 99, 37, 240,21,10,23,190,6,148,
    247,
    120,
    234,
    75,
    0,
    26,
    197,
    62,
    94,
    252,
    219,
    203,
    117,
    35,
    11,
    32,
    57,
    177,
    33,
    88,
    237,
    149,
    56,
    87,
    174,
    20,
    125,
    136,
    171,
    168,
    68,
    175,
    74,
    165,
    71,
    134,
    139,
    48,
    27,
    166,
    77,
    146,
    158,
    231,
    83,
    111,
    229,
    122,
    60,
    211,
    133,
    230,
    220,
    105,
    92,
    41,
    55,
    46,
    245,
    40,
    244,
    102,
    143,
    54,
    65,
    25,
    63,
    161,
    1,
    216,
    80,
    73,
    209,
    76,
    132,
    187,
    208,
    89,
    18,169,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,   93,    222,    114,    67,    29,    24,    72,    243,    141,   128,    195,    78,    66,    215,    61,    156,    180
  ];

  const seeding = (seed:number) => {
    if (seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);
    if (seed < 256) {
      seed |= seed << 8;
    }

    for (var i = 0; i < 256; i++) {
      var v;
      if (i & 1) {
        v = p[i] ^ (seed & 255);
      } else {
        v = p[i] ^ ((seed >> 8) & 255);
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  }
  seeding(0);
  // Calculate noise contributions from each of the four corners
  var n00 = dot2(gradP[X + perm[Y]], x, y);
  var n01 = dot2(gradP[X + perm[Y + 1]], x, y - 1);
  var n10 = dot2(gradP[X + 1 + perm[Y]], x - 1, y);
  var n11 = dot2(gradP[X + 1 + perm[Y + 1]], x - 1, y - 1);

  // Compute the fade curve value for x
  var u = fade(x);

  // Interpolate the four results
  return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
}


function getNoiseValue(x:number, y:number, frequency:number):number {
  return Math.abs(perlin2d(x / frequency, y / frequency));
}

function normalizeArray(array: number[][]) {
  var minValue = array[0][0];
  var maxValue = array[0][0];

  for (var i = 0; i < array.length; i++){
    for (var j = 0; j < array[0].length; j++){
      minValue = Math.min(minValue, array[i][j]);
      maxValue = Math.max(maxValue, array[i][j]);
    }
  }
  // Apply the function below to each array element (to generate a normalized value between 0 and 1)

  for (var r = 0; r < array.length; r++){
    for (var c = 0; c < array[0].length; c++){
      array[r][c] = (array[r][c] - minValue) / (maxValue - minValue);
    }
  }
  // array.map((inner:number[]) => {
  //   inner.map((value:number) =>{
  //     return (value - minValue) / (maxValue - minValue);
  //   })
  // });
}


export function generateProceduralMaps(grid2d: number[][], frequency: number): void{
  for (var i=0; i < grid2d.length; i++){
    for (var j = 0; j < grid2d[0].length; j++){
      grid2d[i][j] = getNoiseValue(i, j, frequency);
    }
  }
  normalizeArray(grid2d);
}