import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 5, // 5 requests,
	standardHeaders: true,
	legacyHeaders: false,
	skipSuccessfulRequests: true,
});
