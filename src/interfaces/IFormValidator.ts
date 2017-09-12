export interface RuleItem {
    required?: boolean;
    message?: string;
    trigger?: string;
}

export interface RuleFuncation {
    // tslint:disable-next-line:no-any
    validator: (ruleItem: RuleItem, value: any, callback: () => void) => void;
}

// tslint:disable-next-line:interface-name
export interface IFormValidator {
    [name: string]: Array<RuleItem | RuleFuncation>;
}