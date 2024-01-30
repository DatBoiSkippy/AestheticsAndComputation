1. All the primitives can be found in svgPrimitives.js, this file will hold all the primitive functions and is used in index.html
2. index.html uses these functions to create the svg in makeSVG(). Is it supposed to be buttons on a page to interact with? (dunno).
3. I decided to keep the basic structure of the example given but change the transform section.
When I used the transform in the example it rotated on a point rather than the middle, so I added code to optimize the process of rotation and make it rotate from the center (hopefully if I did my math right)
4. A download button is also available and is what I usded to get the svg files.