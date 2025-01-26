// Decorator is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside 
// special wrapper objects that contain the behaviors.
// Also known as Wrapper

// Component interface
interface DataSource {
    readData(): string;
    writeData(data: string): void;
}

// Concrete component
class FileDataSource implements DataSource {
    private fileName: string;

    constructor(fileName: string) {
        this.fileName = fileName;
    }

    readData(): string {
        console.log("Reading from file " + this.fileName);
        return 'data'
    }
    writeData(data: string): void {
        console.log("Writing to file data " + data);
    }

}

class DataSourceDecorator implements DataSource {
    protected wrapee: DataSource;

    constructor(source: DataSource) {
        this.wrapee = source;
    }

    readData(): string {
        return this.wrapee.readData();
    }

    writeData(data: string): void {
        this.wrapee.writeData(data);
    }


}

class EncryptionDecorator extends DataSourceDecorator {
    writeData(data: string): void {
        const encryptedData = data; // Encrypt the data here
        this.wrapee.writeData(encryptedData);
    }

    readData(): string {
        const data = this.wrapee.readData();
        const decryptedData = data; // Decrypt the data here if its encrypted
        return decryptedData;
    }
}

class CompressionDecorator extends DataSourceDecorator {
    writeData(data: string): void {
        const compressedData = data; // Compress the data here
        this.wrapee.writeData(compressedData);
    }

    readData(): string {
        const data = this.wrapee.readData();
        const decompressedData = data; // DeCompress the data here if its compressed
        return decompressedData;
    }
}

function main(): void {
    let source: DataSource = new FileDataSource("file1.txt");
    source.writeData("random text"); // The target file has been written with plain data.  

    source = new CompressionDecorator(source);
    source.writeData("random data"); // The target file has been written with compressed data.

    source = new EncryptionDecorator(source);
    source.writeData("random data to enc"); // // The file has been written with compressed and enc data

    // Similar to above but in one line
    const dataSrc = new CompressionDecorator(new EncryptionDecorator(new FileDataSource('file2.txt')));
}

main();