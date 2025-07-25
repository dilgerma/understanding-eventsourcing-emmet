const crypto = require('crypto');
import { Request, Response, NextFunction } from 'express';

/**
 * Simple correlation and causation ID middleware
 * Works purely with request/response headers
 */
interface MiddlewareOptions {
    correlationHeader?: string;
    causationHeader?: string;
}

const correlationCausationMiddleware = (options: MiddlewareOptions = {}) => {
    const {
        correlationHeader = 'x-correlation-id',
        causationHeader = 'x-causation-id'
    } = options;

    return (req: Request, res: Response, next: NextFunction) => {
        // Get causation ID or generate new one
        let causationId = req.get(causationHeader);
        if (!causationId) {
            causationId = crypto.randomUUID();
        }

        // Get correlation ID or use causation ID as fallback
        let correlationId = req.get(correlationHeader);
        if (!correlationId) {
            correlationId = causationId;
        }

        // Set response headers
        if (correlationId) {
            res.set(correlationHeader, correlationId);
        }
        if (causationId) {
            res.set(causationHeader, causationId);
        }

        next();
    };
};

module.exports = correlationCausationMiddleware;