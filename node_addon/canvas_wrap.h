#ifndef BTRIE_CANVAS_WRAP_H__
#define BTRIE_CANVAS_WRAP_H__

#include <v8.h>
#include <node.h>
#include <node_object_wrap.h>

#include "canvas.h"

using namespace v8;
using node::ObjectWrap;
using namespace btrie;


namespace btrie {

class PathWrap : public ObjectWrap {
public:
    static void init(Handle<Object> exports);
    inline Path* path() { return _path; }
    
private:
    PathWrap();
    static void ctor(const FunctionCallbackInfo<Value>& info);
    static void move(const FunctionCallbackInfo<Value>& info);
    static void line(const FunctionCallbackInfo<Value>& info);
    static void close(const FunctionCallbackInfo<Value>& info);

    Path* _path;
    static Persistent<Function> _ctor;
};


class CanvasWrap : public ObjectWrap {
public:
    static void init(Handle<Object> exports);

private:
    CanvasWrap(double width, double height);
    static void ctor(const FunctionCallbackInfo<Value>& info);
    static void draw(const FunctionCallbackInfo<Value>& info);

    Canvas* _canvas;
    static Persistent<Function> _ctor;
};

};

#endif

