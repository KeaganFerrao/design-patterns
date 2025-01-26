// Memento is a behavioral design pattern that lets you save and restore the previous state of
// an object without revealing the details of its implementation.
// This is a behavioral design pattern

interface Memento {
    getState(): string;
    getName(): string;
    getDate(): string;
}

// Momento
class ConcreteMemento implements Memento {
    private state: string;

    private date: string;

    constructor(state: string) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    /**
     * The Originator uses this method when restoring its state.
     */
    public getState(): string {
        return this.state;
    }

    /**
     * The rest of the methods are used by the Caretaker to display metadata.
     */
    public getName(): string {
        return `${this.date} / (${this.state.substring(0, 9)}...)`;
    }

    public getDate(): string {
        return this.date;
    }
}

// Care taker
class Editor {
    private mementos: Memento[] = [];

    private textArea: TextArea;

    constructor(textArea: TextArea) {
        this.textArea = textArea;
    }

    public backup(): void {
        console.log('\nCaretaker: Saving Originator\'s state...');
        this.mementos.push(this.textArea.save());
    }

    public undo(): void {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();

        console.log(`Caretaker: Restoring state to: ${memento?.getName()}`);
        this.textArea.restore(memento);
    }

    public showHistory(): void {
        console.log('Caretaker: Here\'s the list of mementos:');
        for (const memento of this.mementos) {
            console.log(memento.getName());
        }
    }
}

// Originator
class TextArea {
    /**
     * For the sake of simplicity, the text area's state is stored inside a
     * single variable.
     */
    private state: string;

    constructor(state: string) {
        this.state = state;
        console.log(`Originator: My initial state is: ${state}`);
    }

    /**
     * Saves the current state inside a memento.
     */
    public save(): Memento {
        return new ConcreteMemento(this.state);
    }

    /**
     * Restores the text area's state from a memento object.
     */
    public restore(memento: Memento | undefined): void {
        this.state = memento?.getState() ?? '';
        console.log(`Originator: My state has changed to: ${this.state}`);
    }
}

