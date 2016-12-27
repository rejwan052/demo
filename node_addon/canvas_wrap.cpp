#include "canvas_wrap.h"


Persistent<Function> PathWrap::_ctor;

PathWrap::PathWrap() {
    _path = new Path();
}

void PathWrap::init(Handle<Object> exports) {
    Isolate* isolate = Isolate::GetCurrent();

    // Constructor
    Handle<FunctionTemplate> tpl = FunctionTemplate::New(isolate, ctor);
    tpl->SetClassName(String::NewFromUtf8(isolate, "Path"));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    // Prototype
    NODE_SET_PROTOTYPE_METHOD(tpl, "move", move);
    NODE_SET_PROTOTYPE_METHOD(tpl, "line", line);
    NODE_SET_PROTOTYPE_METHOD(tpl, "close", close);

    _ctor.Reset(isolate, tpl->GetFunction());
    exports->Set(String::NewFromUtf8(isolate, "Path"), tpl->GetFunction());
}

void PathWrap::ctor(const FunctionCallbackInfo<Value>& info) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);

    if (!info.IsConstructCall()) {
        isolate->ThrowException(Exception::TypeError(String::NewFromUtf8(isolate, 
                "Class constructors cannot be invoked without 'new'")));
        return;
    }

    PathWrap* obj = new PathWrap();
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
}

void PathWrap::move(const FunctionCallbackInfo<Value>& info) {
    double x = info[0]->NumberValue();
    double y = info[1]->NumberValue();

    PathWrap* obj = ObjectWrap::Unwrap<PathWrap>(info.Holder());
    obj->_path->move(x, y);
    info.GetReturnValue().Set(info.This());
}

void PathWrap::line(const FunctionCallbackInfo<Value>& info) {
    double x = info[0]->NumberValue();
    double y = info[1]->NumberValue();
    PathWrap* obj = ObjectWrap::Unwrap<PathWrap>(info.Holder());
    obj->_path->line(x, y);
    info.GetReturnValue().Set(info.This());
}

void PathWrap::close(const FunctionCallbackInfo<Value>& info) {
    PathWrap* obj = ObjectWrap::Unwrap<PathWrap>(info.Holder());
    obj->_path->close();
    info.GetReturnValue().Set(info.This());
}


Persistent<Function> CanvasWrap::_ctor;

CanvasWrap::CanvasWrap(double width, double height) {
    _canvas = new Canvas(width, height);
}

void CanvasWrap::init(Handle<Object> exports) {
    Isolate* isolate = Isolate::GetCurrent();

    // Constructor
    Handle<FunctionTemplate> tpl = FunctionTemplate::New(isolate, ctor);
    tpl->SetClassName(String::NewFromUtf8(isolate, "Canvas"));
    tpl->InstanceTemplate()->SetInternalFieldCount(1);

    // Prototype
    NODE_SET_PROTOTYPE_METHOD(tpl, "draw", draw);

    _ctor.Reset(isolate, tpl->GetFunction());
    exports->Set(String::NewFromUtf8(isolate, "Canvas"), tpl->GetFunction());
}

void CanvasWrap::ctor(const FunctionCallbackInfo<Value>& info) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);

    if (!info.IsConstructCall()) {
        Handle<Value> ex = isolate->ThrowException(Exception::TypeError(
            String::NewFromUtf8(isolate, 
                "Class constructors cannot be invoked without 'new'")));
        info.GetReturnValue().Set(ex);
        return;
    }

    double width = info[0]->IsUndefined() ? 0 : info[0]->NumberValue();
    double height = info[1]->IsUndefined() ? 0 : info[1]->NumberValue();
    CanvasWrap *obj = new CanvasWrap(width, height);
    obj->Wrap(info.This());
    info.GetReturnValue().Set(info.This());
}

void CanvasWrap::draw(const FunctionCallbackInfo<Value>& info) {
    Isolate* isolate = Isolate::GetCurrent();
    HandleScope scope(isolate);

    // Arguments
    PathWrap *pathWrap = ObjectWrap::Unwrap<PathWrap>(info[0]->ToObject());

    CanvasWrap *obj = ObjectWrap::Unwrap<CanvasWrap>(info.Holder());
    obj->_canvas->draw(pathWrap->path());
}
