#include <iostream>
#include "canvas.h"

using std::cout;
using std::endl;
using namespace btrie;


Path *Path::move(double x, double y) {
    cout << "move(" << x << ", " << y << ")" << endl;
    return this;
}

Path *Path::line(double x, double y) {
    cout << "line(" << x << ", " << y << ")" << endl;
    return this;
}

Path *Path::close() {
    cout << "close" << endl;
    return this;
}

Canvas::Canvas(double width, double height): 
    _width(width), _height(height) {
}

void Canvas::draw(Path& path) {
    cout << "Widht=" << _width << " height=" << _height << endl;
}
