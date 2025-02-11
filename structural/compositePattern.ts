// Composite is a structural design pattern that lets you compose objects into tree 
// structures and then work with these structures as if they were individual objects.

// Using the Composite pattern makes sense only when the core model of your app can be represented as a tree.

// For example, imagine that you have two types of objects: Products and Boxes. A Box can contain
// several Products as well as a number of smaller Boxes. These little Boxes can also hold some Products 
// or even smaller Boxes, and so on.

// It might be difficult to provide a common interface for classes whose functionality differs too much.
// In certain scenarios, you’d need to overgeneralize the component interface, making it harder to comprehend.

interface Box {
    calculatePrice(): number;
}

abstract class Product implements Box {
    protected title: string;
    protected price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }

    abstract calculatePrice(): number;
}

// We can easily add additional charges such as packing charges for each box, withour affecting other products
class CompositeBox implements Box {
    private children: Box[];
    private packingCharge: number = 5;

    constructor(...boxes: Box[]) {
        this.children.push(...boxes);
    }

    calculatePrice(): number {
        return this.packingCharge + this.children.reduce<number>((prev: number, curr: Box) => {
            return prev + curr.calculatePrice();
        }, 0)
    }
}

class Book extends Product {
    constructor(title: string, price: number) {
        super(title, price);
    }

    calculatePrice(): number {
        return this.price;
    }
}

class VideoGame extends Product {
    constructor(title: string, price: number) {
        super(title, price);
    }

    calculatePrice(): number {
        return this.price;
    }
}

class DeliveryService {
    private box: Box;
    private shippingCharge: number = 20;

    setupOrder(...boxes: Box[]) {
        this.box = new CompositeBox(...boxes);
    }

    calculateOrderPrice(): number {
        return this.box.calculatePrice() + this.shippingCharge;
    }
}

function main(): void {
    const deliveryService = new DeliveryService();

    deliveryService.setupOrder(
        new CompositeBox(
            new VideoGame("1", 100)
        ),
        new CompositeBox(
            new CompositeBox(
                new Book("2", 200),
                new Book("3", 300)
            ),
            new VideoGame("4", 400),
            new VideoGame("5", 500)
        )
    )

    deliveryService.calculateOrderPrice();
}