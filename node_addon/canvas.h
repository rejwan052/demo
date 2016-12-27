#ifndef BTRIE_CANVAS_H__
#define BTRIE_CANVAS_H__

#include <string>
using std::string;


namespace btrie {

class Path {
public:
    Path* move(double x, double y);
    Path* line(double x, double y);
    Path* close();
};


class Canvas {
public:
    Canvas(double width, double height);
    void draw(Path* path);

private:
    double _width;
    double _height;
};

};

#endif
