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

const createRecursion = (x, y, size, depth, r) => {
    if (depth <= 0) {
        return [];
    }
    const squareGroup = [];

    const points = `${x},${y} ${x + size + rand(r)},${y + rand(r)} ${x + size + rand(r)},${y + size + rand(r)} ${x + rand(r)},${y + size + rand(r)} ${x},${y}`
    const square = alter(polyLine(points), { scale: rand(r)});

    squareGroup.push(square);

    const smallerSquares = createRecursion(x + size / 8, y + size / 8, size / 1.3, depth - 1, r);

    squareGroup.push(...smallerSquares);
    return squareGroup;
}

const createGrid = () => {
    const grid = [];
    const gridSize = 10;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const sideLength = Math.random() * (40 - 30) + 60;
            const x = i * 50 + (rand(1));
            const y = j * 50 + (rand(1));
            const depth = Math.floor(Math.random() * 6) + 6;


            const squares = createRecursion(x, y, sideLength, depth, 2);

            grid.push(...squares);
        }
    }

    return group(grid);
}