// Strategy design pattern
// This is a behaviorial design pattern
// Behavioral design patterns are concerned with algorithms and the assignment of responsibilities between objects.
// Here we create an interface and make concrete classes implement that interface
// The calling code will call the interface method which the concrete classes have implemented
// We create different stratergies such as email, sms, push, etc
// The client code is responsible for passing the stratergy to execute

/**
 * Use Cases:
 * 1. Use the Strategy pattern when you want to use different variants of an algorithm within an object and be able to switch from one algorithm to another during runtime.
 * 2. Use the Strategy when you have a lot of similar classes that only differ in the way they execute some behavior.
 * 3. Use the pattern to isolate the business logic of a class from the implementation details of algorithms that may not be as important in the context of that logic.
 * 4. Use the pattern when your class has a massive conditional statement that switches between different variants of the same algorithm.
 */

interface Notifier {
    notify(user: User, message: string): void
}

class SMSNotifier implements Notifier {
    constructor() {
        this.configure()
    }

    configure(): void {
        console.log('Configuring SMS')
    }

    notify(user: User, message: string): void {
        console.log(`SMS sent to ${user.phone}, message: ${message}`)
    }
}

class EmailNotifier implements Notifier {
    constructor() {
        this.configure()
    }

    configure(): void {
        console.log('Configuring Wmail')
    }

    notify(user: User, message: string): void {
        if (!user.email) {
            throw new Error('Email is missing in user record')
        }

        console.log(`Email sent to ${user.email}, message: ${message}`)
    }
}

class WhatsAppNotifier implements Notifier {
    groupNotify(user: User[], message: string): void {

    }

    notify(user: User, message: string): void {
        if (!user.whatsAppPhone) {
            throw new Error('Whatsapp phone is missing in user record')
        }
        console.log(`Whatsapp sent to ${user.whatsAppPhone}, message: ${message}`)
    }
}

class PushNotifier implements Notifier {
    notify(user: User, message: string): void {
        if (!user.token) {
            throw new Error('Token is missing in user record')
        }
        console.log(`Push sent to ${user.token}, message: ${message}`)
    }
}

class User {
    id: number
    token: string
    name: string
    phone: number
    whatsAppPhone?: number
    email?: number

    constructor(id: number, name: string, phone: number) {
        this.id = id
        this.name = name
        this.phone = phone
    }
}

class UserController {
    sendUserNotification(u: User, n: Notifier, message: string) {
        n.notify(u, message)
        // Do other controller specific operations
    }
}

function main(): void {
    const user = new User(1, 'keagan', 87878787878)
    const userController = new UserController()
    const smsNotifier = new SMSNotifier()
    const pushNotifier = new PushNotifier()

    userController.sendUserNotification(user, pushNotifier, 'Hello from the other side')
}

main()