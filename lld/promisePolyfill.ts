enum State {
    FULLFILLED,
    PENDING,
    REJECTED
}

class MyPromise<T> {
    private thenCbs: ((value: T) => void)[] = [];
    private catchCbs: ((value: any) => void)[] = [];
    private state: State = State.PENDING;
    private value: T;
    private onSuccessBinded = this.onSuccess.bind(this);
    private onFailBinded = this.onFail.bind(this);

    constructor(cb: (resolve: (data: T) => void, reject: (data: any) => void) => void) {
        try {
            cb(this.onSuccessBinded, this.onFailBinded);
        } catch (error) {
            this.onFail(error);
        }
    }

    private runCallbacks() {
        if (this.state === State.FULLFILLED) {
            this.thenCbs.forEach(callback => {
                callback(this.value)
            })

            this.thenCbs = [];
        }

        if (this.state === State.REJECTED) {
            this.catchCbs.forEach(callback => {
                callback(this.value)
            })

            this.catchCbs = [];
        }
    }

    private onSuccess(value: T) {
        if (this.state !== State.PENDING) {
            return
        }
        this.value = value;
        this.state = State.FULLFILLED;
        this.runCallbacks();
    }

    private onFail(value: any) {
        if (this.state !== State.PENDING) {
            return
        }
        this.value = value;
        this.state = State.REJECTED;
        this.runCallbacks();
    }

    then(thenCb?: (value: T) => T, catchCb?: (value: any) => any) {
        return new MyPromise<T>((resolve, reject) => {
            this.thenCbs.push(result => {
                if (thenCb == null) {
                    resolve(result);
                    return
                }

                try {
                    resolve(thenCb(result))
                } catch (error) {
                    reject(error)
                }
            })

            this.catchCbs.push(result => {
                if (catchCb == null) {
                    reject(result);
                    return
                }

                try {
                    resolve(catchCb(result))
                } catch (error) {
                    reject(error)
                }
            })
           

            this.runCallbacks();
        })
    }

    catch(cb: (value: any) => any) {
        this.then(undefined, cb);
    }

    finally() { }
}