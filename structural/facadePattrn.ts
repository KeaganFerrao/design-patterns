//  Use the Facade pattern when you need to have a limited but straightforward interface to a complex subsystem.
// It provides a simplified interface to a library, a framework, or any other complex set of classes.
// It is a structural design pattern

// The facade simplifies the client code by exposing one method which internally handles all complexities
// or calling other classes. However, if the client needs to directly interact with internal classes
// that option is also available, since they can directly call methods of internal classes as well.
class HomeTheaterFacade {
    private videoScreen: VideoScreen;
    private dvdPlayer: DvdPlayer;
    private lights: Lights;
    private popCornPopper: PopCornPopper;

    constructor(videoScreen: VideoScreen, dvdPlayer: DvdPlayer, lights: Lights, popCornPopper: PopCornPopper) {
        this.videoScreen = videoScreen;
        this.dvdPlayer = dvdPlayer;
        this.lights = lights;
        this.popCornPopper = popCornPopper;
    }

    watchMovie(name: string): void {
        this.lights.turnOnLights();
        this.videoScreen.turnOnScreen();
        this.popCornPopper.turnOnPopper();
        this.popCornPopper.makePopcorn();
        this.dvdPlayer.turnOnDvdPlayer();
        this.dvdPlayer.loadDvd(name);
        this.lights.dimLights(10);
        this.dvdPlayer.playDvd();
    }

    endMovie(): void {
        this.lights.dimLights(100);
        this.dvdPlayer.unLoadDvd();
        this.dvdPlayer.turnOffDvdPlayer();
        this.videoScreen.turnOffScreen();
        this.popCornPopper.turnOffPopper();
        this.lights.turnOffLights();
    }
}

class VideoScreen {
    turnOnScreen() {

    }

    turnOffScreen() {

    }
}

class DvdPlayer {
    turnOnDvdPlayer() {

    }

    turnOffDvdPlayer() {

    }

    loadDvd(name: string) {

    }

    unLoadDvd() {

    }

    playDvd() {

    }
}

class Lights {
    turnOnLights() {

    }

    turnOffLights() {

    }

    dimLights(value: number) {

    }
}

class PopCornPopper {
    turnOnPopper() {

    }

    turnOffPopper() {

    }

    makePopcorn() {

    }
}

function main(): void {
    const homeTheater = new HomeTheaterFacade(new VideoScreen(), new DvdPlayer(), new Lights(), new PopCornPopper());
    homeTheater.watchMovie('John wick');
}