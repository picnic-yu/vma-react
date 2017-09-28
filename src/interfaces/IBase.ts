export interface RenderProps {
    type: string;
    className?: string;
    style?: React.CSSProperties;
    labelName: string;
    labelWidth?: string;
    name?: string;
    placeholder?: string;
    checked?: boolean;
    rows?: number;
    min?: number;
    max?: number;
    maxLength?: number;
}

export interface RenderState {
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    // autoComplete?: string;
}

export interface DataStates<T> {
    value?: T;
}

export interface Pair<T> {
    name: string;
    value: T;
    disabled?: boolean;
    readOnly?: boolean;
}

export interface PairList<T> {
    options: Array<Pair<T>>;
}

export interface DataRange<T> {
    valueRange: Array<Pair<T>>;
}

export interface Handler<T> {
    watchValue?: WatchValueHandle<T>;
}

import * as React from 'react';

export type WatchValueHandle<T> = (name: string, value: T, checked: boolean) => void;
export type OnChangehandle = React.ChangeEventHandler<HTMLInputElement>;
export type OnSelectHandle = React.SyntheticEvent<HTMLSelectElement>;
export type OnClickHandle = React.MouseEvent<HTMLButtonElement>;
