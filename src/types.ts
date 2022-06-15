export type TAction<P = any, T = string> = {
    payload?: P,
    type: T,
};

export type TThunkExtraArg<T, A> = {
    [key in keyof A]: T
};
