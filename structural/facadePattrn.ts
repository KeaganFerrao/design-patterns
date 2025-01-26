//  Use the Facade pattern when you need to have a limited but straightforward interface to a complex subsystem.
// It provides a simplified interface to a library, a framework, or any other complex set of classes.
// It is a structural design pattern

class Facade {
    private data: string;

    constructor(data?: string) {
        this.data = data ?? "default value"
    }

    doSomeAction(name: string, age?: number): void {
        // This can call any complex library methods
        // Do checks and seperate all the complex logic from the client
    }
}

function main() {
    const facade = new Facade("",) // This facade hides all the complexity of this substem behind it
    facade.doSomeAction("", 12);
}