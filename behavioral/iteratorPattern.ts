// Iterator is a behavioral design pattern that allows traversal through a 
// complex data structure without exposing its internal implementation.
// It can be a simple array, stack, queue or something more complex such as a binary tree, graph or any
// custom collection of data.
// Another use case can be if we want to iterate over different collections/structures using some common 
// code in a single place, we can make those collections return iterators and loop over those using a standard
// iterator design pattern API

interface Iterators<T> {
    // Return the current element.
    current(): T;

    // Return the current element and move forward to next element.
    next(): T;

    // Return the key of the current element.
    key(): number;

    // Checks if current position is valid.
    valid(): boolean;

    // Rewind the Iterator to the first element.
    rewind(): void;
}

interface Aggregator {
    // Retrieve an external iterator.
    getIterator(): Iterators<string>;
}


// Concrete Iterators implement various traversal algorithms. These classes
// store the current traversal position at all times.
class AlphabeticalOrderIterator implements Iterators<string> {
    private collection: WordsCollection;
    private position: number = 0;

    constructor(collection: WordsCollection) {
        this.collection = collection;
    }

    next(): string {
        const item = this.collection.getItems()[this.position];
        this.position++;

        return item;
    }

    current(): string {
        return this.collection.getItems()[this.position];
    }

    key(): number {
        return this.position;
    }

    valid(): boolean {
        return this.position < this.collection.getCount();
    }

    rewind(): void {
        this.position = 0;
    }
}

// Concrete Collections provide one or several methods for retrieving fresh
// iterator instances, compatible with the collection class.
class WordsCollection implements Aggregator {
    private items: string[] = [];

    getItems(): string[] {
        return this.items;
    }

    getCount(): number {
        return this.items.length;
    }

    addItem(item: string): void {
        this.items.push(item);
    }

    getIterator(): Iterators<string> {
        return new AlphabeticalOrderIterator(this);
    }
}

function main(): void {
    const collection = new WordsCollection();
    collection.addItem('first');
    collection.addItem('second');
    collection.addItem('third');

    const iterator: Iterators<string> = collection.getIterator();
    while (iterator.valid()) {
        console.log(iterator.next());
    }
}