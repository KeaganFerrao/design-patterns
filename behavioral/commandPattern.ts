interface Command {
    execute(): void;
}

// Concrete command
class SwitchLightCommand implements Command {
    private light: Light;

    constructor(light: Light) {
        this.light = light;
    }

    execute(): void {
        this.light.switchLight();
    }
}

// Reciever
class Light {
    private switchOn: boolean = false;

    switchLight() {
        this.switchOn = true
    }
}

// Concrete command
class SwitchFanCommand implements Command {
    private fan: Fan;

    constructor(fan: Fan) {
        this.fan = fan;
    }

    execute(): void {
        this.fan.switchFan();
    }
}

// Reciever
class Fan {
    private switchOn: boolean = false;

    switchFan() {
        this.switchOn = true
    }
}

// Invoker
class Room {
    command: Command

    setCommand(command: Command) {
        this.command = command;
    }

    executeCommand() {
        this.command.execute();
    }
}

class LivingRoom extends Room {
    // Other living room specific stuff
}

function main() {
    const livingRoom = new LivingRoom();
    livingRoom.setCommand(new SwitchLightCommand(new Light()));
    livingRoom.executeCommand();

    livingRoom.setCommand(new SwitchFanCommand(new Fan()));
    livingRoom.executeCommand();
}