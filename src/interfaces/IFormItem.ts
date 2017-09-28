import * as IBase from './IBase';

// tslint:disable-next-line:max-line-length
export type InputProps = IBase.RenderProps & IBase.RenderState & IBase.DataStates<number|string> & IBase.Handler<number|string>;
export type InputStates = IBase.DataStates<number|string|undefined>;

// tslint:disable-next-line:max-line-length
export type CheckBoxGroupProps = IBase.RenderProps & IBase.RenderState & IBase.DataRange<number|string> & IBase.DataStates<Array<number|string>> & IBase.Handler<Array<number|string>>;

export type CheckBoxStates = IBase.DataStates<Array<number|string>>;

// tslint:disable-next-line:max-line-length
export type RadioGroupProps = IBase.RenderProps & IBase.RenderState & IBase.DataRange<number|string> & IBase.DataStates<number|string> & IBase.Handler<number|string>;

export type RadioStates = IBase.DataStates<number|string>;

export type DataStates<T> = IBase.DataStates<T>;

export type Pair<T> = IBase.Pair<T>;

export type ControlProps = IBase.RenderProps & IBase.RenderState;

// tslint:disable-next-line:max-line-length
export type ControlStates = IBase.DataRange<number|string> & (IBase.DataStates<number|string> & IBase.DataStates<Array<number|string>>);