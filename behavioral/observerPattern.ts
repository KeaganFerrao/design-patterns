// Observer design pattern
// This is a behaviorial design pattern
// Lets you define a subscription mechanism to notify multiple objects about any events 
// that happen to the object they’re observing.
// We create an observer interface for each observer to implement, it could be a customer, bot, etc.
// We create a subject interface for each subject to implement
// In the concrete subjects we have the business logic to implement the notifications
// This is just like a publisher subscriber mechanism

// Use Cases:
// 1. Use the Observer pattern when changes to the state of one object may require changing other objects, and the actual set of objects is unknown beforehand or changes dynamically.
// You can often experience this problem when working with classes of the graphical user interface. For example, you created custom button classes, and you want to let the clients hook some custom code to your buttons so that it fires whenever a user presses a button.
// The Observer pattern lets any object that implements the subscriber interface subscribe for event notifications in publisher objects. You can add the subscription mechanism to your buttons, letting the clients hook up their custom code via custom subscriber classes.
// 2. Use the pattern when some objects in your app must observe others, but only for a limited time or in specific cases.
// The subscription list is dynamic, so subscribers can join or leave the list whenever they need to.


interface Observer {
    update(subject: Subject): void
}

interface Subject {
    attach(observer: Observer): void
    detach(observer: Observer): void
    notify(): void
}

class OrderSubject implements Subject {
    private observers: Observer[] = []

    attach(observer: Observer): void {
        const isExists = this.observers.indexOf(observer)
        if (isExists === -1) {
            this.observers.push(observer)
        }
    }

    detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            this.observers.splice(observerIndex, 1);
        }
    }

    notify(): void {
        console.log("Notifying customers")
        for (const observer of this.observers) {
            observer.update(this)
        }
    }

    // We can have some business logic in the order subject which calls notify to update all entities
    // If some state changes
}

class Customer implements Observer {
    name: string
    email: string
    phone: number

    constructor(name: string, email: string, phone: number) {
        this.name = name
        this.email = email
        this.phone = phone
    }

    update(subject: Subject): void {
        if (subject instanceof OrderSubject) {
            console.log(`User ${this.name} notified about order subject`)
        }
    }

    // This can contain other customer related properties and methods
}

function main(): void {
    const orderSubject = new OrderSubject()
    const customer1 = new Customer('keagan', 'keagan@gmail.com', 9898989898)
    const customer2 = new Customer('keith', 'keith@gmail.com', 9898989898)

    orderSubject.attach(customer1)
    orderSubject.attach(customer2)

    orderSubject.notify()
}

main()