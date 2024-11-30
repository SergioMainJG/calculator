// import { Addition, Divition, Exponent, Multiplication, OperationStrategy, Operator, Substract } from "@calc/index.ts";

import { Addition, Divition, Exponent, Multiplication, Substract } from "./operations";
import { OperationStrategy, Operator } from "./strategy";


export const Calculator = {
    actualOperation: '',
    logger: [] as string[],
    state: {
        currentValue: 0,
        previousValue: null as number | null,
        operator: null as Operator | null,
    },
    strategiesOperation: {
        add: new Addition(),
        substract: new Substract(),
        multiplicaction: new Multiplication(),
        divition: new Divition(),
        exponent: new Exponent(),
    },
    setOperator: function (operator: OperationStrategy) {
        this.state.operator = new Operator(operator)
    },
    calculate: function (value: number): number {
        const result = this.state.operator!.operation(this.state.previousValue!, value);
        this.state.previousValue = this.state.currentValue;
        this.state.currentValue = result;
        return result;
    },
    reset: function (): void {
        this.state.currentValue = 0;
        this.state.previousValue = null;
        this.state.operator = null;
    }
}