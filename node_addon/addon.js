const addon = require('bindings')('addon')
const {Path, Canvas} = addon

const path = new Path().move(1, 1).line(2, 2).close()
const canvas = new Canvas(600, 400)
canvas.draw(path)


