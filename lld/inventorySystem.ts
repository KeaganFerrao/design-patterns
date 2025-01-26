class InventorySystem {
    static productMap: Map<string, Product> = new Map();
    static locationMap: Map<Locations, Unit> = new Map();

    static addProduct(product: Product) {
        this.productMap[product.id] = product
    }

    static getProduct(productId: string): Product | undefined {
        return this.productMap.get(productId);
    }

    static getProductList(): Product[] {
        const productList: Product[] = [];

        this.productMap.forEach((p) => {
            productList.push(p)
        })

        return productList;
    }

    // This will be based on an algorithm, good candidate for stratergy pattern since there could
    // be multiple placement stratergies
    static placeUnit(unit: Unit): void {
        unit.localtionId = ""
    }

    // This will be based on an algorithm
    static removeUnit(product: Product): void {

    }

    static getShelvesStatus(): Map<Locations, Unit> {
        return this.locationMap;
    }

    static updateStatus(unit: Unit, status: Status) {
        unit.status = status
    }
}

class User {
    addProduct(): void {
        InventorySystem.addProduct(new Product("", 80, "", 10, Size.M))
    }

    executeOrder(order: Order) {
        order.productCount.forEach((v, k) => {
            for (let i = 0; i < v; i++) {
                InventorySystem.removeUnit(k)
            }
        })
    }
}

class Order {
    productCount: Map<Product, number> = new Map();
}

class Product {
    id: string;
    price: number;
    description: string;
    weight: number;
    size: Size;

    constructor(id: string, price: number, description: string, weight: number, size: Size) {
        this.id = id;
        this.price = price;
        this.description = description;
        this.weight = weight;
        this.size = size;
    }
}

class Unit {
    id: string;
    productId: string;
    localtionId: string;
    status: Status
}

class Locations {
    id: string;
    size: Size;
}

enum Status {
    INVENTORY,
    TRANSIT,
    DELIVERY
}

enum Size {
    S, M, L
}