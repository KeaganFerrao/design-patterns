// Singleton design pattern
// This is a creational design pattern
// This lets you ensure that a class has only one instance, while providing a 
// global access point to this instance.

class Singleton {
    private static instance: Singleton;

    // Need to make the constructor private so it cannot be initialized
    private constructor() {
        console.log("Singleton initialized")
    }

    // This maintains that the class has only a single instance
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance =  new Singleton()
        }

        return Singleton.instance;
    }

    // Other business logic
    public someFunction() {
        console.log("Additional functions")
    }
}