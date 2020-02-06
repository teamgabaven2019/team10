;modjewel.define("weinre/client/InspectorBackendImpl", function(require, exports, module) { // Generated by CoffeeScript 1.3.3
var Ex, IDLTools, InspectorBackendImpl, MessageDispatcher, Weinre;

Ex = require('../common/Ex');

IDLTools = require('../common/IDLTools');

MessageDispatcher = require('../common/MessageDispatcher');

Weinre = require('../common/Weinre');

module.exports = InspectorBackendImpl = (function() {

  function InspectorBackendImpl() {
    this.registeredDomainDispatchers = {};
    MessageDispatcher.setInspectorBackend(this);
  }

  InspectorBackendImpl.setupProxies = function() {
    var intf, intfName, intfNames, method, proxy, proxyMethod, _i, _len, _results;
    intfNames = ["ApplicationCache", "BrowserDebugger", "CSS", "Console", "DOM", "DOMStorage", "Database", "Debugger", "InjectedScript", "Inspector", "Network", "Profiler", "Runtime"];
    _results = [];
    for (_i = 0, _len = intfNames.length; _i < _len; _i++) {
      intfName = intfNames[_i];
      proxy = Weinre.messageDispatcher.createProxy(intfName);
      intf = IDLTools.getIDL(intfName);
      if (!intf) {
        throw new Ex(arguments, "interface not registered: '" + intfName + "'");
      }
      _results.push((function() {
        var _j, _len1, _ref, _results1;
        _ref = intf.methods;
        _results1 = [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          method = _ref[_j];
          proxyMethod = InspectorBackendImpl.getProxyMethod(proxy, method);
          _results1.push(InspectorBackendImpl.prototype[method.name] = proxyMethod);
        }
        return _results1;
      })());
    }
    return _results;
  };

  InspectorBackendImpl.getProxyMethod = function(proxy, method) {
    return function() {
      return proxy[method.name].apply(proxy, arguments);
    };
  };

  InspectorBackendImpl.prototype.registerDomainDispatcher = function(name, intf) {
    return this.registeredDomainDispatchers[name] = intf;
  };

  InspectorBackendImpl.prototype.getRegisteredDomainDispatcher = function(name) {
    if (!this.registeredDomainDispatchers.hasOwnProperty(name)) {
      return null;
    }
    return this.registeredDomainDispatchers[name];
  };

  return InspectorBackendImpl;

})();

require("../common/MethodNamer").setNamesForClass(module.exports);

});
