import {type ThunkAction, ThunkDispatch} from "redux-thunk";
import {extraArgs, TRootState} from "app/store";

export type TAction<P = any, T = string> = {
    payload?: P,
    type: T,
};

export type TThunkExtraArg<T, A> = {
    [key in keyof A]: T
};

export type TAsyncAction<S, P = any> = ThunkAction<Promise<P>, TRootState, {[key in keyof typeof extraArgs]: S}, TAction>;

export type TAsyncDispatch<S> = ThunkDispatch<TRootState, {[key in keyof typeof extraArgs]: S}, TAction>