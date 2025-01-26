// Template Method design pattern
// This is a behaviorial design pattern
// It defines a skeleton of an algorithm in the superclass but lets 
// subclasses override specific steps of the algorithm without changing its structure
// eg. Say you have a data mining application, which parses data from various formats such as 
// csv, doc, pdf, etc. The data mining code is different for each, but the data processing 
// is the same.

// Use Cases:
// 1. Use the Template Method pattern when you want to let clients extend only particular steps of an algorithm,
// but not the whole algorithm or its structure.

abstract class AbstractClass {

    // This exposed method defines the skeleton of the whole algorithm which will be called
    // by the caller code
    public templateMethod(): void {
        this.baseOperation1();
        this.requiredOperations1();
        this.baseOperation2();
        this.hook1();
        this.requiredOperation2();
        this.baseOperation3();
        this.hook2();
    }

    // Base operations are fixed steps and should not be overriden
    protected baseOperation1(): void {
        console.log("Base operation 1 in abs class")
    }

    protected baseOperation2(): void {
        console.log("Base operation 2 in abs class")
    }

    protected baseOperation3(): void {
        console.log("Base operation 3 in abs class")
    }

    // These required operations have to be overriden by the child classes
    protected abstract requiredOperations1(): void;

    protected abstract requiredOperation2(): void;

    // These can be optionally overriden, but have a default implementation (Empty in this case)
    protected hook1(): void { }

    protected hook2(): void { }
}

class ConcreteClass1 extends AbstractClass {

    protected requiredOperations1(): void {
        console.log('Required operation 1 in con class1')
    }
    
    protected requiredOperation2(): void {
        console.log('Required operation 2 in con class1')
    }
}

class ConcreteClass2 extends AbstractClass {
    protected requiredOperations1(): void {
        console.log('Required operation 1 in con class2')
    }

    protected requiredOperation2(): void {
        console.log('Required operation 2 in con class2')
    }

    protected hook1(): void {
        console.log('Hook 1 in con class2')
    }
}