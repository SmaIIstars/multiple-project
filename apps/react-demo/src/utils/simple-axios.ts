class InterceptorManager {
  private handlers: any[] = [];

  use(fulfilled: (config: any) => any, rejected?: (error: any) => any) {
    this.handlers.push({ fulfilled, rejected });
    return this.handlers.length - 1;
  }

  eject(id: number) {
    if (this.handlers[id]) this.handlers[id] = null;
  }

  forEach(fn: (handler: any) => void) {
    this.handlers.forEach((h) => {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

class Axios {
  private interceptors: any = {
    request: new InterceptorManager(),
    response: new InterceptorManager(),
  };

  request(config: any) {
    let chain: any[] = [
      {
        fulfilled: (config: any) => config,
        rejected: (error: any) => Promise.reject(error),
      },
    ];

    this.interceptors.request.forEach((interceptor: any) => {
      chain.unshift(interceptor);
    });

    this.interceptors.response.forEach((interceptor: any) => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      const { fulfilled, rejected } = chain.shift();
      promise = promise.then(fulfilled, rejected);
    }

    return promise;
  }
}

export default new Axios();
