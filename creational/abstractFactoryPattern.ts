// This is a creational patterm
// Built over factory method, to scale up our factory to support multiple different types

// Product
interface Gpu {
    assemble(): void;
}

// Concrete product
class MsiGpu implements Gpu {
    assemble(): void {
        // Logic to assemble
    }
}

// Concrete product
class AsusGpu implements Gpu {
    assemble(): void {
        // Logic to assemble
    }
}

// Product
interface Monitor {
    assemble(): void;
}

// Concrete product
class MsiMonitor implements Monitor {
    assemble(): void {
        // Logic to assemble
    }
}

// Concrete product
class AsusMonitor implements Monitor {
    assemble(): void {
        // Logic to assemble
    }
}

// Abstract factory
abstract class Company {
    abstract createGpu(): Gpu;
    abstract createMonitor(): Monitor;
}

// Concrete factory
class MsiManufacturer extends Company {
    createGpu(): Gpu {
        return new MsiGpu();
    }
    createMonitor(): Monitor {
        return new MsiMonitor();
    }
}

// Concrete factory
class AsusManufacturer extends Company {
    createGpu(): Gpu {
        return new AsusGpu();
    }
    createMonitor(): Monitor {
        return new AsusMonitor();
    }
}

function main(): void {
    const msi = new MsiManufacturer();
    const msiGpu = msi.createGpu();
    const msiMonitor = msi.createMonitor();

    const asus = new AsusManufacturer();
    const asusGpu = asus.createGpu();
    const asusMonitor = asus.createMonitor();
}