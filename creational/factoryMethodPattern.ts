// This is a creational patterm

// Product
interface Burger {
    prepare(): void;
}

// Concrete Product
class BeefBurger implements Burger {
    prepare(): void {
        // Code to prepare beef burger
    }
}

// Concrete Product
class VeggieBurger implements Burger {
    prepare(): void {
        // Code to prepare veggie burger
    }
}

// Creator
abstract class Restraunt {
    orderBurger(): Burger {
        const burger = this.createBurger();
        burger.prepare();
        return burger;
    }

    abstract createBurger(): Burger;
}

// Concrete Creator
class BeefBurgerRestraunt extends Restraunt {
    createBurger(): Burger {
        return new BeefBurger();
    }
}

// Concrete Creator
class VeggieBurgerRestraunt extends Restraunt {
    createBurger(): Burger {
        return new VeggieBurger();
    }
}

function main(): void {
    const beefRestraunt = new BeefBurgerRestraunt();
    const beefBurger = beefRestraunt.orderBurger();

    const veggieRestraunt = new VeggieBurgerRestraunt();
    const veggieBurger = veggieRestraunt.orderBurger();
}