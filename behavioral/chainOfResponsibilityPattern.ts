// Chain of Responsibility is a behavioral design pattern that lets you pass requests along a
// chain of handlers. Upon receiving a request, each handler decides either 
// to process the request or to pass it to the next handler in the chain.
// This is a behavioral pattern

interface Handler<Request = string, Result = string> {
    setNext(handler: Handler<Request, Result>): Handler<Request, Result>;

    handle(request: Request): Result;
}

abstract class AbstractHandler implements Handler<string | null, string | null> {
    private nextHandler: Handler<string | null, string | null>;

    public setNext(handler: Handler<string | null, string | null>): Handler<string | null, string | null> {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string | null): string | null {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }
}

class MonkeyHandler extends AbstractHandler {
    public handle(request: string | null): string | null {
        if (request === 'Banana') {
            return `Monkey: I'll eat the ${request}.`;
        }

        return super.handle(request);

    }
}

class SquirrelHandler extends AbstractHandler {
    public handle(request: string | null): string | null {
        if (request === 'Nut') {
            return `Squirrel: I'll eat the ${request}.`;
        }
        return super.handle(request);
    }
}

class DogHandler extends AbstractHandler {
    public handle(request: string | null): string | null {
        if (request === 'MeatBall') {
            return `Dog: I'll eat the ${request}.`;
        }
        return super.handle(request);
    }
}

const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();
const dog = new DogHandler();

monkey.setNext(squirrel).setNext(dog);
