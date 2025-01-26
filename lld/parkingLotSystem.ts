abstract class ParkingSpot {
    id: number;
    isAvailable: boolean;
    vehicle: Vehicle | null;

    assignVehicle(vehicle: Vehicle): void {
        if (!this.isAvailable) {
            throw new Error("Spot is not available.");
        }
        this.vehicle = vehicle;
        this.isAvailable = false;
    }

    vacateVehicle(): void {
        this.vehicle = null;
        this.isAvailable = true;
    }

    isSpotAvailable(): boolean {
        return this.isAvailable
    }
}

enum VehicleType {
    BIKE,
    COMPACT,
    LARGE
}

class CompactParkingSpot extends ParkingSpot {
}

class LargeParkingSpot extends ParkingSpot {
}

class BikeParkingSpot extends ParkingSpot {
}

abstract class Vehicle {
    registrationNumber: string;
    color: string;
    abstract type: VehicleType

    getRegistrationNumber(): string {
        return this.registrationNumber;
    }

    constructor(registrationNumber: string, color: string) {
        this.registrationNumber = registrationNumber;
        this.color = color;
    }
}

class Car extends Vehicle {
    type: VehicleType = VehicleType.COMPACT;
}

class Bike extends Vehicle {
    type: VehicleType = VehicleType.BIKE;
}

class ParkingFloor {
    id: string;
    parkingSpots: Map<VehicleType, ParkingSpot[]> = new Map();
    availableSpots: Map<VehicleType, number> = new Map();
    filledSpots: Map<VehicleType, number> = new Map();
    displayBoard: DisplayBoard;
    entryPanels: EntryPanel[][];
    exitPanels: ExitPanel[][];
}

class DisplayBoard {
    display(): void { }
}

interface ParkingStrategy {
    findSpot(vehicle: Vehicle, parkingFloors: ParkingFloor[]): ParkingSpot | null;
}

class SimpleParkingStrategy implements ParkingStrategy {
    findSpot(vehicle: Vehicle, parkingFloors: ParkingFloor[]): ParkingSpot | null {
        return null;
    }
}

class SmartParkingStrategy implements ParkingStrategy {
    findSpot(vehicle: Vehicle, parkingFloors: ParkingFloor[]): ParkingSpot | null {
        return null;
    }
}

class ParkingLot {
    parkingFloors: ParkingFloor[];
    hourlyCosts: Map<VehicleType, number> = new Map();

    // Based on an algorithm, Can use different stratergies such as simple, smart
    assignSpot(vehicle: Vehicle) { }

    getHourlyCost(type: VehicleType): number {
        return this.hourlyCosts.get(type) || 0;
    }
}

class EntryPanel {
    id: string;

    getParkingticket(vehicle: Vehicle) { }
    generateParkingTicket(vehicleType: Vehicle, floorId: string, spotId: string) { }
}

class ParkingTicket {
    id: string;
    vehicleType: VehicleType;
    vehicleRegNumber: string;
    parkingSpotId: string;
    parkingFloorId: string;
    startTime: string;
    endTime: string;
    amount: number;
}

class ExitPanel {
    id: string;

    checkout(parkingTicket: ParkingTicket) { }
    calculatePrice(vehicleType: VehicleType, duration: number) { }
    calculateDuration(parkingTicket: ParkingTicket) { }
}