import { OperationStrategy } from "./strategy";

export class Addition implements OperationStrategy
{
    operation = (x: number, y: number) => x+y;
}

export class Substract implements OperationStrategy
{
    operation = (x: number, y: number) => x-y;
}

export class Multiplication implements OperationStrategy
{
    operation = (x: number, y: number) => x*y;
}

export class Divition implements OperationStrategy
{
    operation = (x: number, y: number) => x/y;
}

export class Exponent implements OperationStrategy
{
    operation = (x: number, y: number) => x**y;
}