#include <node.h>
#include "canvas_wrap.h"

using namespace v8;


void InitAll(Handle<Object> exports) {
  PathWrap::init(exports);
  CanvasWrap::init(exports);
}

NODE_MODULE(addon, InitAll)

