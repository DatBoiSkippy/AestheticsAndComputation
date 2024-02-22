const fso = (options) => {
    const { fill = 'none', stroke = 'black', opacity = 1 } = options;
    return `fill="${fill}" stroke="${stroke}" fill-opacity="${opacity}"`;
}

const alter = (primitive, options = {}) => {
    const { translateX = 0, translateY = 0, rotate = 0, scale = 1, originX = translateX, originY = translateY } = options;
    return `<g transform="translate(${translateX}, ${translateY}) rotate(${rotate} ${originX} ${originY}) scale(${scale})" ${fso(options)}>${primitive}</g>`;
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

const getRandomAngle = () => {
    const angles = [0, 45, 90, 135, 180];
    const randomIndex = Math.floor(Math.random() * angles.length);
    return angles[randomIndex];
}

const getRandomOption = (options, threshold, value) => {

    console.log(value);
    const numOptions = options.length;

    if (value > threshold) {
        // Choose a random option
        const randomIndex = Math.floor(Math.random() * numOptions);
        return options[randomIndex];
    } else if (value > threshold / 2) {
        // Choose two random options
        const randomIndex1 = Math.floor(Math.random() * numOptions);
        let randomIndex2;
        do {
            randomIndex2 = Math.floor(Math.random() * numOptions);
        } while (randomIndex2 === randomIndex1);

        return [options[randomIndex1], options[randomIndex2]];
    } else {
        // Choose all options
        return options;
    }
}
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
    const unitSize = 64;
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
            const colorR = Math.floor((Math.sin((value + 1) * Math.PI / 2) + 1) * 128);
            const colorG = Math.floor((Math.sin((value + 1.5) * Math.PI / 2) + 1) * 128);
            const colorB = Math.floor((Math.sin((value + 2) * Math.PI / 2) + 1) * 128);


            //calculations for line
            const length = 3;
            const x1 = i * cellSize;
            const y1 = j * cellSize;
            const x2 = x1 + length;
            const y2 = y1 + length;
            //Add this to simulate actual Perlin Noise {stroke: `rgb(${color},${color},${color})`}
            const lines = alter(line(x1, y1, x2 * 1.1, y2 * 1.1, 1), { rotate: getRandomAngle(), originX: x1 + length / 2, originY: y1 + length / 2, stroke: `rgb(${colorR},${colorG},${colorB})` });
            const rects = alter(rect(length, length), { translateX: x1, translateY: y1, stroke: `rgb(${colorR},${colorG},${colorB})` });
            //const circles = alter(circle(9), { translateX: x1 + length / 2, translateY: y1 + length / 2, scale: 1, stroke: getRandomColor() });

            const options = [lines, rects];
            const threshold = 0.05;

            grid.push(getRandomOption(options, threshold, value));
            //Previous toolbox
            //const squares = createRecursion(i * cellSize, j * cellSize, length, depth, 5);
            //grid.push(...squares);

        }
    }
    return grid;
}