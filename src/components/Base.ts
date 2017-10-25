export interface Handler<T> {
    watchValue?: WatchValueHandle<T>;
    validator?: Validator;
}

export type Validator = (
    name: string, value: string|string[]|number|number[]|Array<string|number>|undefined, 
    valid: boolean, errorMsg: 
    string) => void;
export type WatchValueHandle<T> = (name: string, value: T, checked: boolean) => void;
