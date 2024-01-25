const createRect = (x, y, width, height, fill, stroke, opacity = 1, rotate = 0) => {
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}" stroke="${stroke}"  fill-opacity="${opacity}" transform="rotate(${rotate} ${x + width / 2} ${y + height / 2})" />`;
}

const createCircle = (cx, cy, r, fill, stroke, opacity = 1) => {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}"  fill-opacity="${opacity}"/>`;
}

const createEllipse = (cx, cy, rx, ry, fill, stroke, opacity = 1, rotate = 0) => {
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}"  fill-opacity="${opacity}" transform="rotate(${rotate} ${cx} ${cy})"/>`;
}

const createPolygon = (points, fill, stroke, opacity = 1, rotate = 0) => {
    return `<polygon points="${points}" fill="${fill}" stroke="${stroke}"  fill-opacity="${opacity}" transform="rotate(${rotate} ${points.split(' ')[0]})"/>`;
}

const createLine = (x1, y1, x2, y2, stroke, strokeWidth, opacity = 1, rotate = 0) => {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}"  fill-opacity="${opacity}" transform="rotate(${rotate} ${x1 + (x2 - x1) / 2} ${y1 + (y2 - y1) / 2})"/>`;
}