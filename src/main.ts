import { Calculator } from "@calc/index";
import { HTMLSubject, ScreenObservable } from "@observable/index";

const screenCalc: HTMLOutputElement = document.getElementById('screen') as HTMLOutputElement;

const htmlDriver = new HTMLSubject();

const setOperator = (operatorKey: string) => {
    const operatorMap = {
        '+': Calculator.strategiesOperation.add,
        '-': Calculator.strategiesOperation.substract,
        '*': Calculator.strategiesOperation.multiplicaction,
        '/': Calculator.strategiesOperation.divition,
        '^': Calculator.strategiesOperation.exponent,
    };
    type keyOperator = keyof typeof operatorMap;
    if (operatorMap[operatorKey as keyOperator]) {
        Calculator.setOperator(operatorMap[operatorKey as keyOperator]);
    }
};


const refreshScreen = (key: string) => {
    if ((/^\d$/).test(key)) {
        if (Calculator.state.currentValue === 0) Calculator.state.currentValue = +key
        else Calculator.state.currentValue = +`${Calculator.state.currentValue}${key}`;
    }
    if ((/^\.$/).test(key)) {
        if (!`${Calculator.state.currentValue}`.includes('.')) Calculator.state.currentValue = +`${Calculator.state.currentValue}.`;
    }
    if ((/^[+\-*/\^]$/).test(key)) {
        if (Calculator.state.currentValue === 0) {
            window.alert('No hay valores con los que operar');
            Calculator.reset();
        } else {
            Calculator.actualOperation += `${Calculator.state.currentValue} ${ key }`;
            Calculator.state.previousValue = Calculator.state.currentValue;
            Calculator.state.currentValue = 0;
            setOperator( key )
        }
    }
    if ((/C|Backspace|Delete|AC/i).test(key)) {
        if ((/C|Backspace/).test(key)) {
            const currentStr = `${Calculator.state.currentValue}`
            Calculator.state.currentValue = currentStr.length > 1 ? +`${currentStr.slice(0, -1)}` : 0;
        }
        else {
            Calculator.reset()
        }
    }
    if ((/=|Enter/).test(key)) {
        
        if ( !Calculator.state.operator ) {
            window.alert('Operador no definido. Usa uno antes de Calcular');
        }
        else
        {
            Calculator.actualOperation += `${Calculator.state.currentValue} = ${ Calculator.calculate( Calculator.state.currentValue ) }`;
            // Calculator.calculate( Calculator.state.currentValue )
            Calculator.logger.push( Calculator.actualOperation );

            const logger: HTMLTextAreaElement = document.querySelector('#logger')!;
            const loggerValue = logger.textContent ?? '';

            logger.innerText = loggerValue + '\n' + Calculator.logger.at(-1) + '\n';

            Calculator.actualOperation = '';
            Calculator.state.operator = null;
            Calculator.reset();
        }
    }
    console.log( Calculator.actualOperation )
    console.log( Calculator.logger )
    screenCalc.innerHTML = `${Calculator.state.currentValue}`;
}



const screenObservable = new ScreenObservable(refreshScreen);

htmlDriver.subscribe(screenObservable);


function updateScreen (key: string) {
    htmlDriver.notify(key);
};

const handleKey = (event: KeyboardEvent) => {
    const key = event.key;
    const keysPattern = /^(?:[0-9]|\.|[+\-*/=]|C|Backspace|Delete|Enter)$/i;

    if (keysPattern.test(key)) updateScreen(key)
}

window.onload = () => {
    document.addEventListener('keydown', handleKey)
}


( window as any).updateScreen = updateScreen;