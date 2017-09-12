// tslint:disable-next-line:interface-name
export default interface IResponse<T> {
    code: number;
    codeMsg?: string;
    data?: T;
}