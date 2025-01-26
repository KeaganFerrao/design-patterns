// State is a behavioral design pattern that lets an object alter its behavior when its 
// internal state changes. It appears as if the object changed its class.

// Context
class Phone {
    private _state: State;

    constructor() {
        this._state = new OffState(this)
    }

    set state(state: State) {
        this.state = state
    }

    turnOn() {
        console.log("ON")
    }

    turnOff() {
        console.log("OFF")
    }

    unlock() {
        console.log("UNLOCK")
    }

    lock() {
        console.log("LOCK")
    }

    home() {
        console.log("HOME")
    }
}

abstract class State {
    protected phone: Phone;

    constructor(phone: Phone) {
        this.phone = phone
    }

    abstract onHome(): void;
    abstract onOffOn(): void;
}

class OffState extends State {

    constructor(phone: Phone) {
        super(phone)
    }

    onHome(): void {
        this.phone.state = new LockedState(this.phone);
        this.phone.turnOn();
    }
    onOffOn(): void {
        this.phone.state = new LockedState(this.phone);
        this.phone.turnOff();
    }
}

class LockedState extends State {

    constructor(phone: Phone) {
        super(phone)
    }

    onHome(): void {
        this.phone.state = new ReadyStates(this.phone);
        this.phone.unlock();
    }
    onOffOn(): void {
        this.phone.state = new OffState(this.phone);
        this.phone.lock();
    }
}

class ReadyStates extends State {

    constructor(phone: Phone) {
        super(phone)
    }

    onHome(): void {
        this.phone.home();
    }

    onOffOn(): void {
        this.phone.state = new OffState(this.phone);
        this.phone.lock();
    }
}

function main(): void {
    const phone = new Phone();
    phone.state.onHome();

    phone.state = new OffState(phone)
    phone.state.onHome()
}