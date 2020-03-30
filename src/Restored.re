exception Error(string);

let errorMessage = "Component must be wrapped with Container.Provider";

module type ContainerT = {
  type action;
  type state;
  let reducer: (state, action) => state;
};

module Make = (Container: ContainerT) => {
  module Provider = {
    module ContextProvider = {
      let context = React.createContext(None);
      let makeProps = (~initialState, ~children, ()) => {
        "value": initialState,
        "children": children,
      };
      let make = React.Context.provider(context);
    };

    [@react.component]
    let make = (~initialState, ~children) => {
      let (state, dispatch) =
        React.useReducer(Container.reducer, initialState);
      <ContextProvider initialState={Some((state, dispatch))}>
        children
      </ContextProvider>;
    };
  };

  let useStore = () => {
    let value = React.useContext(Provider.ContextProvider.context);
    switch (value) {
    | None => raise(Error(errorMessage))
    | Some(value) => value
    };
  };

  let useDispatch = () => {
    let (_, dispatch) = useStore();
    dispatch;
  };

  let useSelector = (selector: Container.state => 'a) => {
    let (state, _) = useStore();
    React.useMemo1(() => selector(state), [|state|]);
  };
};