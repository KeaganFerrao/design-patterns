// These are all the actions that trigger state transition
interface State {
    insertQuarter(): void;
    ejectQuerter(): void;
    turnCrank(): void;
    dispense(): void;
}

// The members of the class could be private based on the usecase and requirement
// But here we have made all public just for simplicity
class GumballMachine {
    soldOutState: State;
    noQuarterState: State;
    hasQuarterState: State;
    soldState: State;

    state: State;
    count = 0;

    constructor(numberGumballs: number) {
        this.soldOutState = new SoldOutState(this);
        this.noQuarterState = new NoQuarterState(this);
        this.hasQuarterState = new HasQuarterState(this)
        this.soldState = new SoldState(this);

        if (numberGumballs > 0) {
            this.state = this.noQuarterState;
        } else {
            this.state = this.noQuarterState; 
        }
    }

    releaseBall() {
        if (this.count > 0) {
            this.count--;
        }
    }
}

class SoldOutState implements State {
    gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        throw new Error("No gumballs available");
    }

    ejectQuerter(): void {
        throw new Error("No quarter inserted");
    }

    turnCrank(): void {
        throw new Error("No gumballs available");
    }

    dispense(): void {
        throw new Error("No gumballs available");
    }
}

class SoldState implements State {
    gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        throw new Error("Already giving a gumball");
    }

    ejectQuerter(): void {
        throw new Error("You already turned the crank");
    }

    turnCrank(): void {
        throw new Error("You have already turned");
    }

    dispense(): void {
        this.gumballMachine.releaseBall();
        if (this.gumballMachine.count > 0) {
            this.gumballMachine.state = this.gumballMachine.noQuarterState
        } else {
            this.gumballMachine.state = this.gumballMachine.soldOutState;
        }
    }
}

class NoQuarterState implements State {
    gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        this.gumballMachine.state = this.gumballMachine.hasQuarterState;
    }

    ejectQuerter(): void {
        throw new Error("You havent inserted a quarter");
    }

    turnCrank(): void {
        throw new Error("You turned but there is no quarter");
    }

    dispense(): void {
        throw new Error("Need to pay first");
    }
}

class HasQuarterState implements State {
    gumballMachine: GumballMachine;

    constructor(gumballMachine: GumballMachine) {
        this.gumballMachine = gumballMachine;
    }

    insertQuarter(): void {
        throw new Error("You cannot insert another quarter");
    }

    ejectQuerter(): void {
        this.gumballMachine.state = this.gumballMachine.noQuarterState;
    }

    turnCrank(): void {
        this.gumballMachine.state = this.gumballMachine.soldState;
    }

    dispense(): void {
        throw new Error("Crank not turned");
    }
}