// tslint:disable-next-line:interface-name
export interface IFormItemProps {
    className?: string;
    style?: React.CSSProperties;
    labelName: string;
    labelWidth?: number;
    placeholder?: string;
    name?: string;
    value?: string|number;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    autoComplete?: string;
}