/**
 * New Requirement:
 * Now Beverage is sold based on size
 * For now sizes can be S,M,L. Can add more in future
 * Every Beverage may not have all three sizes eg. Some may have only L, some all.
 * Each Beverage will have different cost based on the size
 * Each addition(Mocha, soy) can also have different cost based on size
 */

interface Beverage {
    cost(): number
    description(): string
}

// Concrete
class DarkRoast implements Beverage {
    cost(): number {
        return 20;
    }
    description(): string {
        return 'Dark Roast Coffee';
    }
}

// Concrete
class HouseBlend implements Beverage {
    cost(): number {
        return 35;
    }
    description(): string {
        return 'House Blend Coffee'
    }
}

// Decorators
class Mocha implements Beverage {
    private beverage: Beverage;

    constructor(beverage: Beverage) {
        this.beverage = beverage;
    }

    cost(): number {
        return 15 + this.beverage.cost();
    }

    description(): string {
        return this.description() + ', Mocha';
    }
}

// Decorators
class Whip implements Beverage {
    private beverage: Beverage;

    constructor(beverage: Beverage) {
        this.beverage = beverage;
    }

    cost(): number {
        return 8 + this.beverage.cost();
    }

    description(): string {
        return this.description() + ', Whip';
    }
}

// Decorators
class Soy implements Beverage {
    private beverage: Beverage;

    constructor(beverage: Beverage) {
        this.beverage = beverage;
    }

    cost(): number {
        return 22 + this.beverage.cost();
    }

    description(): string {
        return this.description() + ', Soy';
    }
}

function main(): void {
    const beverage = new Mocha(new Whip(new DarkRoast()));

    console.log('Total cost: ', beverage.cost())
}

main();