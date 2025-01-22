class ApiError extends Error {
    status: number;
    message: string;
    error?: any;

    constructor(status: number, message: string, error?: any) {
        super(message);  // Pass the message to the parent Error class
        this.status = status;
        this.message = message;
        this.error = error;

        // Set the prototype explicitly (this is necessary for TypeScript to recognize the correct class methods)
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}


class ApiResponse {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;

    constructor(statusCode: number, data: any, message: string = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}

export { ApiError, ApiResponse };
