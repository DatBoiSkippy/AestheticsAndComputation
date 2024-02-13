const fso = (options) => {
    const { fill = 'none', stroke = 'black', opacity = 1 } = options;
    return `fill="${fill}" stroke="${stroke}" fill-opacity="${opacity}"`;
}

const alter = (primitive, options = {}) => {
    const { translateX = 0, translateY = 0, rotate = 0, scale = 1 } = options;
    return `<g transform="translate(${translateX}, ${translateY}) rotate(${rotate}) scale(${scale})" ${fso(options)}>${primitive}</g>`;
}

const group = (primitives) => {
    return `<g> ${primitives}</g>`;
}

const rect = (width, height) => {
    return `<rect width="${width}" height="${height}"/>`;
}

const circle = (r) => {
    return `<circle r="${r}"/>`;
}

const ellipse = (rx, ry) => {
    return `<ellipse rx="${rx}" ry="${ry}""/>`;
}

const polygon = (points) => {
    return `<polygon points="${points}"/>`;
}

const line = (x1, y1, x2, y2, strokeWidth) => {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke-width="${strokeWidth}"/>`;
}

const polyLine = (points) => {
    return `<polyline points="${points}"/>`;
}

const path = (d) => {
    return `<path d="${d}"/>`;
}

const rand = (range) => {
    return (Math.random() * (range * 2) - range);
}

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const createRecursion = (x, y, size, depth, r) => {
    if (depth <= 0) {
        return [];
    }
    const squareGroup = [];
    const rotationFactor = Math.random() * (y / (size + r)) * 51;
    const randomRotation = Math.random() < 0.5 ? -rotationFactor : rotationFactor;
    console.log(y / size);
    const square = alter(rect(size, size), { translateX: x + rotationFactor, translateY: y + rotationFactor, rotate: randomRotation, scale: 1, stroke: getRandomColor() });

    squareGroup.push(square);

    const smallerSquares = createRecursion(x + size / 4, y + size / 4, size / 2, depth - 1, r);

    squareGroup.push(...smallerSquares);
    return squareGroup;
}

//Generates Noise, uses code from https://www.vincentbruijn.nl/articles/perlin-noise-js/ and https://joeiddon.github.io/projects/javascript/perlin.html
const generatePerlinNoise = (x, y) => {
    const unitSize = 12;
    const X = Math.floor(x / unitSize) & 255;
    const Y = Math.floor(y / unitSize) & 255;

    x = x / unitSize - Math.floor(x / unitSize);
    y = y / unitSize - Math.floor(y / unitSize);

    const u = fade(x);
    const v = fade(y);

    const a = p[X] + Y;
    const b = p[X + 1] + Y;

    //Smooth blending of noise values 
    return lerp(v, lerp(u, grad(p[a], x, y), grad(p[b], x - 1, y)),
        lerp(u, grad(p[a + 1], x, y - 1), grad(p[b + 1], x - 1, y - 1)));
}

//Permutation table, creates a set of semi-random gradient vectors that help to make the randomness coherent 
const p = [...Array(512)].map(() => Math.floor(Math.random() * 255));

//Smooths Interpolation using a 5th degree polynomial easing function
const fade = (t) => {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

//linear interpolation, from value a to b based on t
const lerp = (t, a, b) => {
    return a + t * (b - a);
}

//Computes dot product between a gradient vector and a distant vector, hash value is to determine gradient vectors direction. I barely understand this part.
const grad = (hash, x, y) => {
    const h = hash & 15;
    const grad = 1 + (h & 7);
    return ((h & 8) ? -grad : grad) * x + ((h & 1) ? -grad : grad) * y;
}


const createGrid = (size, cell) => {
    const grid = [];
    const gridSize = size;
    const cellSize = cell;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const x = i * 0.2;
            const y = j * 0.2;
            const value = generatePerlinNoise(x, y);
            const depth = Math.floor(Math.random() * 1) + 1;
            const color = Math.floor((value + 1) * 128);

            //calculations for line
            const angle = value * Math.PI;
            const length = 20;
            const x1 = i * cellSize;
            const y1 = j * cellSize;
            const x2 = x1 + length * Math.cos(angle);
            const y2 = y1 + length * Math.sin(angle);
            //Add this to simulate actual Perlin Noise {stroke: `rgb(${color},${color},${color})`}
            grid.push(alter(line(x1, y1, x2, y2, 1)))

            //Cool circles
            //grid.push(alter(circle(value + 8), {translateX: x1, translateY: y1, scale: value, stroke: getRandomColor(), fill: getRandomColor()}));
            
            //Previous toolbox
            //const squares = createRecursion(i * cellSize, j * cellSize, length, depth, 5);
            //grid.push(...squares);

        }
    }
    return grid;
}