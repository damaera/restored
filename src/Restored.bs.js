'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

var $$Error = Caml_exceptions.create("Restored.Error");

var errorMessage = "Component must be wrapped with Container.Provider";

function Make(Container) {
  var context = React.createContext(undefined);
  var makeProps = function (initialState, children, param) {
    return {
            value: initialState,
            children: children
          };
  };
  var make = context.Provider;
  var ContextProvider = {
    context: context,
    makeProps: makeProps,
    make: make
  };
  var Restored$Make$Provider = function (Props) {
    var initialState = Props.initialState;
    var children = Props.children;
    var partial_arg = Container.reducer;
    var match = React.useReducer(Curry.__2(partial_arg), initialState);
    return React.createElement(make, makeProps(/* tuple */[
                    match[0],
                    match[1]
                  ], children, /* () */0));
  };
  var Provider = {
    ContextProvider: ContextProvider,
    make: Restored$Make$Provider
  };
  var useStore = function (param) {
    var value = React.useContext(context);
    if (value !== undefined) {
      return value;
    } else {
      throw [
            $$Error,
            errorMessage
          ];
    }
  };
  var useDispatch = function (param) {
    return useStore(/* () */0)[1];
  };
  var useSelector = function (selector) {
    var match = useStore(/* () */0);
    var state = match[0];
    return React.useMemo((function () {
                  return Curry._1(selector, state);
                }), /* array */[state]);
  };
  return {
          Provider: Provider,
          useStore: useStore,
          useDispatch: useDispatch,
          useSelector: useSelector
        };
}

exports.$$Error = $$Error;
exports.errorMessage = errorMessage;
exports.Make = Make;
/* react Not a pure module */
