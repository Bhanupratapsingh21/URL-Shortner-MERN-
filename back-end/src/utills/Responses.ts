class ApiError extends Error {
    statusCode: number;
    data: any;
    success: boolean;
    errors: string[];

    constructor(
        statusCode: number,
        message = "Something Went Wrong",
        errors: string | string[] = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = Array.isArray(errors) ? errors : [errors]; // Ensure `errors` is an array
        if (stack) {
            this.stack = stack;
        } else {
            (Error as any).captureStackTrace(this, this.constructor);
        }
    }

    toJson() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            errors: this.errors,
        };
    }
}

class ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
    success: boolean;

    constructor(statusCode: number, data: T, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // Success if status code is less than 400
    }

    toJson() {
        return {
            success: this.success,
            statusCode: this.statusCode,
            message: this.message,
            data: this.data,
        };
    }
}

export { ApiError, ApiResponse };
