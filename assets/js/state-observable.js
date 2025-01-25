export default class StateObservable {
  constructor() {
    this.observers = new Set();
  }

  createStream(name, initialValue) {
    console.log(`Created quantum stream: ${name}`);
  }
}
