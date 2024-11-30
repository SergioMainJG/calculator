export class ScreenObservable {

    constructor(private fn: Function) { }

    refresh = (data: string): void => this.fn(data);
}

export class HTMLSubject {

    private observables: ScreenObservable[] = [];

    constructor() { }

    subscribe = (observable: ScreenObservable) => { this.observables.push(observable) }
    unsubscribe = (observable: ScreenObservable) => {
        this.observables = this.observables.filter(obs => obs !== observable);
    }
    notify(data: string) {
        this.observables.forEach((observable: ScreenObservable) => {
            observable.refresh(data);
        });
    }
}