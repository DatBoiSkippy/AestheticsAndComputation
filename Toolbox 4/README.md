1. All the primitives can be found in svgPrimitives.js, this file will hold all the primitive functions and is used in index.html
2. Most of the code is in generatePerlinNoise and it's helper functions below
3. tThe perlin noise function uses: p, fade, lerp, grad
4. Repurposed createGrid to include noise. value, color, angle, length(reprised), and specific code for line angles because I couldn't
get them to work with <rotate>