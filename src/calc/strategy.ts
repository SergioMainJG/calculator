export interface OperationStrategy
{
    operation: ( x: number, y: number ) => number;
}

export class Operator
{
    constructor(
        private _operator: OperationStrategy
    ){
        this.operator = _operator;
    }

    set operator( strategy: OperationStrategy )
    {
        this._operator = strategy;
    }

    operation( x: number, y: number ): number
    {
        return this._operator.operation( x, y );
    }
}