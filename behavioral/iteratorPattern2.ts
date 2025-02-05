// Iterator is a behavioral design pattern that allows traversal through a 
// complex data structure without exposing its internal implementation.
// It can be a simple array, stack, queue or something more complex such as a binary tree, graph or any
// custom collection of data.
// Another use case can be if we want to iterate over different collections/structures using some common 
// code in a single place, we can make those collections return iterators and loop over those using a standard
// iterator design pattern API

interface Aggregator<T> {
    // In-built TS iterator protocol
    getIterator(): Iterator<T>;
}


// Concrete Iterators implement various traversal algorithms. These classes
// store the current traversal position at all times.
// A list in TS does not have an iterator, hence we created our own implementing the 
// in-built TS iterator interface
class ListIterator<T> implements Iterator<T> {
    private collection: ListCollection<T>;
    private position: number = 0;

    constructor(collection: ListCollection<T>) {
        this.collection = collection;
    }

    next(): IteratorResult<T> {
        if (this.position >= this.collection.getCount()) {
            return {
                done: true,
                value: undefined
            }
        }

        const item = this.collection.getItems()[this.position];
        this.position++;

        return {
            done: false,
            value: item
        }
    }
}

// Concrete Collections provide one or several methods for retrieving fresh
// iterator instances, compatible with the collection class.
class ListCollection<T> implements Aggregator<T> {
    private items: T[] = [];

    getItems(): T[] {
        return this.items;
    }

    getCount(): number {
        return this.items.length;
    }

    addItem(item: T): void {
        this.items.push(item);
    }

    getIterator(): Iterator<T> {
        return new ListIterator(this);
    }
}

class MapCollection<T> implements Aggregator<T> {
    private items: Map<T, T> = new Map();

    getItems(): Map<T, T> {
        return this.items;
    }

    getCount(): number {
        return this.items.size;
    }

    addItem(item: T): void {
        this.items.set(item, item);
    }

    // We did not define a seperate MapIterator here like our list, because TS give a function
    // which does it for us and it implements the same interface
    getIterator(): Iterator<T> {
        return this.items.values();
    }
}

// This is a generic method to loop over any iterator and process the value
function iterateCollection<T>(collection: Aggregator<T>, cb: (val: T) => any) {
    const iterator = collection.getIterator();

    while (true) {
        const ele = iterator.next()
        if (ele.done) {
            return
        }

        cb(ele.value);
    }
}

function main(): void {
    const list = new ListCollection<string>();
    const map = new MapCollection<string>();

    list.addItem("first");
    list.addItem("second");

    map.addItem("firstMap");
    map.addItem("secondMap");

    iterateCollection(list, (val) => console.log(val));
    iterateCollection(map, (val) => console.log(val));
}