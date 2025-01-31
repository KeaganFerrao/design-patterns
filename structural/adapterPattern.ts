// Adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate.
// Use the Adapter class when you want to use some existing class, but its interface isn’t compatible with the rest of your code.
// Below is an implementation of an Object adapter
// There are two types of adapters: 1. Object adapter 2. Class adapter (This needs multiple inheritance which is not supported in TS)

// Our UI interface which we implement
interface IMultiRestoApp {
    displayMenus(xmlData: string): void
    displayRecommendations(xmlData: string): void
}

// Originally the class we were using for the UI
class MultiRestoApp implements IMultiRestoApp {
    displayMenus(xmlData: string): void {
        // Displays menus using xml data
    }
    displayRecommendations(xmlData: string): void {
        // Displays recommendations using xml data
    }
}

// Some 3rd party library (or can be legacy code) we want to use
// For example a new UI library
// But this expects json but our codebase is in XML
// We may not have permissions to change the 3rd party code or it may not be feasible, so that not an option for us
class FancyUIService {
    displayMenusOneByOne(jsonData: string): void {
        // Make use of JSON to fetch menu
    }
    displayRecommendationsFancy(jsonData: string): void {
        // Make use of JSON data to load recommendations
    }
}

// We create an adapter which implements the same interface as the old code, so we can use it in place of our old class
// It composes the new fancy library within it (Composition) and implements the old interface (Inheritance)
class FancyUIServiceAdapter implements IMultiRestoApp {
    private fancyUIService: FancyUIService;

    constructor() {
        this.fancyUIService = new FancyUIService();
    }

    displayMenus(xmlData: string): void {
        const json = this.convertXMLToJSON(xmlData);

        // Here maybe the new fancy UI library does not have a funciton to display all the items in the menu
        // So we needed to add out logic to do so
        // In this case loop over each individual and show it
        for (const menu of json) {
            this.fancyUIService.displayMenusOneByOne(menu);
        }
    }

    displayRecommendations(xmlData: string): void {
        const json = this.convertXMLToJSON(xmlData);
        this.fancyUIService.displayRecommendationsFancy(json);
    }

    convertXMLToJSON(xmlData: string): string {
        // Convert xml to JSON here
        return ''
    }
}

// Client code
function main(): void {
    // OLD UI
    const multiRestoApp: IMultiRestoApp = new MultiRestoApp();
    multiRestoApp.displayMenus("some xml data here");

    // New UI with new fancy library, now compatible with xml
    const adapter: IMultiRestoApp = new FancyUIServiceAdapter();
    adapter.displayMenus("some xml data here");
}