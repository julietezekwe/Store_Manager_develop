class ErrorBag {
  constructor(errors) {
    return this.error(errors);
  }

  error(errors) {
    const errorBucket = [];
    errors.map(error => errorBucket.push(error.msg));
    return errorBucket;
  }
}

export default ErrorBag;
