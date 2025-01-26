interface Subject {
    observers: Observer[]
    attach(o: Observer): void
    detach(o: Observer): void
    notify(d: any): void
}

interface Observer {
    update(d: any): void
}

abstract class WeatherSubject implements Subject {
    observers: WeatherObserver[] = [];

    attach(o: WeatherObserver): void {
        this.observers.push(o);
    }

    detach(o: WeatherObserver): void {
        const idx = this.observers.findIndex(d => {
            return d === o
        })

        if (idx !== -1) {
            this.observers.splice(idx, 1)
        }
    }

    notify(data: string): void {
        this.observers.forEach(o => {
            o.update(data);
        })
    }
}

interface WeatherObserver extends Observer {
    update(data: string): void;
}

abstract class Device implements WeatherObserver {
    abstract update(data: string): void
    abstract display(): void
}

class DeviceA extends Device {
    update(data: string): void {

    }
    display(): void {

    }
}

class WeatherData extends WeatherSubject {
    getTemperature(): string {
        // Calls some 3r party and gets data
        return '30'
    }
    getHumidity(): string {
        // Calls some 3r party and gets data
        return '12'
    }
    getPressure(): string {
        // Calls some 3r party and gets data
        return '45'
    }

    measurementChange() {
        // This is called by some caller code to notify that data has changed
        const t = this.getTemperature();
        const h = this.getHumidity();
        const p = this.getPressure();

        this.notify(`${t} ${h} ${p}`);
    }
}
