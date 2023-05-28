class HttpError extends Error {

    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
  }
  
}

export default HttpError