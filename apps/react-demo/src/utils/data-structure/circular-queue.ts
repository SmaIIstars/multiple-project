export type CircularQueueConfig<V> = {
  queue: Array<V | undefined>;
  front: number;
  rear: number;
  capacityFactor: number;
};

class CircularQueue<V> {
  get [Symbol.toStringTag]() {
    return 'CircularQueue';
  }

  [Symbol.toPrimitive] = (hint: string) => {
    if (hint === 'string') return `CircularQueue: [ ${this._queue} ]`;
    else
      throw new Error(
        `CircularQueue does not support conversion to ${hint} type`,
      );
  };

  toString() {
    return 'CircularQueue: ' + this._queue.toString();
  }

  private _queue: Array<V | undefined>;
  get queue(): Array<V | undefined> {
    return this._queue;
  }
  private set queue(v: Array<V | undefined>) {
    this._queue = v;
  }

  private _front = 0;
  public get front(): number {
    return this._front;
  }
  private set front(v: number) {
    this._front = v;
  }

  private _rear = 0;
  public get rear(): number {
    return this._rear;
  }
  private set rear(v: number) {
    this._rear = v;
  }

  private _capacityFactor = 0;
  public get capacityFactor(): number {
    return this._capacityFactor;
  }
  private set capacityFactor(v: number) {
    this._capacityFactor = v;
  }

  private readonly baseCapacity: number;

  // Get the capacity of queue
  get capacity() {
    return this.baseCapacity * Math.pow(2, this.capacityFactor);
  }

  // Get the length of current elements in the queue
  get length() {
    return (this._rear + this.capacity - this._front) % this.capacity;
  }

  /**
   * Initialize Circular Queue
   * @param _queueLength Queue's capacity
   */
  constructor(
    _queueLength = 100,
    config: Partial<CircularQueueConfig<V>> = {},
  ) {
    this.baseCapacity = _queueLength;
    this._queue = Array(this.baseCapacity + 1);

    const { queue = [], front = 0, rear = 0, capacityFactor = 0 } = config;

    if (queue) queue?.forEach((_) => this.push(_));
    if (typeof front === 'number') this.front = front;
    if (typeof rear === 'number') this.rear = rear;
    if (typeof capacityFactor === 'number')
      this.capacityFactor = capacityFactor;
  }

  private resizeCapacity(newCapacity: number) {
    if (newCapacity < 0) throw new Error('capacity must >= 0!');

    const newQueue = Array(this.baseCapacity * Math.pow(2, newCapacity) + 1);

    for (let i = 0; i < this.length; i++) {
      newQueue[i] = this.queue[(this.front + i) % this.capacity];
    }
    this.queue = newQueue;

    this.rear = this.length;
    this.front = 0;
    this.capacityFactor = newCapacity;
  }

  // Check if the queue is empty
  isEmpty() {
    return this._front === this._rear;
  }

  // Check if the queue is full
  isFull() {
    return (this._rear + 1) % this.capacity === this._front;
  }

  // Clear the queue
  clear() {
    this._queue.fill(undefined);
    this._front = this._rear = 0;
  }

  // Pop the head element of queue
  popHead() {
    if (this.isEmpty()) return undefined;

    const el = this._queue[this._front];
    this._queue[this._front] = undefined;
    this._front = (this._front + 1) % (this.capacity + 1);

    if (
      this.length === this.capacity / 4 &&
      this.capacity / 2 !== 0 &&
      this.capacityFactor > 0
    ) {
      this.resizeCapacity(this.capacityFactor - 1);
    }

    return el;
  }

  /**
   * Append an element to the end of queue
   * @param element
   * @param autoCover if the queue is full, overwrite the head element of queue
   */
  push(element: V, autoCover = true) {
    if (this.isFull() && element) {
      if (this.capacityFactor < 2) {
        this.resizeCapacity(this.capacityFactor + 1);
      } else {
        if (autoCover) {
          this._queue[this._front] = undefined;
          this._front = (this._front + 1) % (this.capacity + 1);
        } else {
          throw new Error('CircularQueue.push Error: Queue is full');
        }
      }
    }

    this._queue[this._rear] = element;
    this._rear = (this._rear + 1) % (this.capacity + 1);
  }

  // Get the head element of queue
  getHead() {
    return this.isEmpty() ? undefined : this._queue[this._front];
  }

  // Get the end element of queue
  getEnd() {
    return this.isEmpty()
      ? undefined
      : this._queue[(this._rear + this.baseCapacity) % (this.baseCapacity + 1)];
  }

  // Get the element in queue by index
  getElement(index: number) {
    if (index >= this.length)
      throw new Error('CircularQueue.getElement Error: index索引越界');

    return this._queue[(this._front + index) % (this.capacity + 1)];
  }
}

export default CircularQueue;
