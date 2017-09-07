// tslint:disable-next-line:interface-name
export default interface IFormActions {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onSelect?: React.SyntheticEvent<HTMLSelectElement>;
    onClick?: React.MouseEvent<HTMLButtonElement>;
    // tslint:disable-next-line:no-any
    watchValue?: (name: string, value: any) => void;
}