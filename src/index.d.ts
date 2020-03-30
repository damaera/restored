export interface ContainerType<State, Action> {
  reducer: (state: State, action: Action) => State;
}

export type Dispatch<Action> = (action: Action) => void;
export type Selector<State, Value> = (state: State) => Value;

export type MakeType<State, Action> = (
  container: ContainerType<State, Action>
) => {
  Provider: React.ComponentType<{ initialState: State }>;
  useStore: () => [State, Dispatch<Action>];
  useDispatch: () => Dispatch<Action>;
  useSelector: (selector: Selector<State, any>) => any;
};

export default MakeType;
