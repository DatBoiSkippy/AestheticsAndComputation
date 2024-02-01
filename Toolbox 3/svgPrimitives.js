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
    const square = alter(rect(size, size), { translateX: x + rotationFactor, translateY: y + rotationFactor, rotate: randomRotation, scale: y / (size + 250), stroke: getRandomColor()});

    squareGroup.push(square);

    const smallerSquares = createRecursion(x + size / 4, y + size / 4, size / 2, depth - 1, r);

    squareGroup.push(...smallerSquares);
    return squareGroup;
}

const createGrid = (size) => {
    const grid = [];
    const gridSize = size;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const sideLength = 30;
            const x = i * 50;
            const y = j * 50;
            const depth = Math.floor(Math.random() * 4) + 1;


            const squares = createRecursion(x, y, sideLength, depth, 40);

            grid.push(...squares);
        }
    }

    return group(grid);
}