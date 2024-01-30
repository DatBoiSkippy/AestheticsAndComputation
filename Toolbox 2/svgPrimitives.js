const createRect = (width, height, fill, stroke, opacity = 1) => {
    return `<rect width="${width}" height="${height}" fill="${fill}" stroke="${stroke}"  fill-opacity="${opacity}"/>`;
}

const createCircle = (r, fill, stroke, opacity = 1) => {
    return `<circle r="${r}" fill="${fill}" stroke="${stroke}"  fill-opacity="${opacity}"/>`;
}

const createEllipse = (rx, ry, fill, stroke, opacity = 1) => {
    return `<ellipse rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}"  fill-opacity="${opacity}" "/>`;
}

const createPolygon = (points, fill, stroke, opacity = 1) => {
    return `<polygon points="${points}" fill="${fill}" stroke="${stroke}"  fill-opacity="${opacity}"/>`;
}

const createLine = (x1, y1, x2, y2, stroke, strokeWidth, opacity = 1) => {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${strokeWidth}"  fill-opacity="${opacity}"/>`;
}

const createPolyLine = (points, fill, stroke, opacity = 1) => {
    return `<polyline points="${points} fill="${fill}" stroke="${stroke}" fill-opacity="${opacity}"/>`;
}