import winston from "winston";
import { LogstashTransport } from "winston-logstash-transport";

const { combine, timestamp, json, printf } = winston.format;

// Custom log format
const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
});

// Create the logger instance
const logger = winston.createLogger({
  level: "info", // Default log level
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Timestamp format
    json(), // JSON format for structured logs
    myFormat // Custom formatted output
  ),
  transports: [
    // Logs to console
    new winston.transports.Console(),
    // Logs to a file
    new winston.transports.File({ filename: "logs/server.log" }),
    // Logstash transport (TCP connection to Logstash
  ],
});

// Handle logger errors
logger.on("error", (err) => {
  console.error("Logger encountered an error:", err.message);
});

// Export the logger
export default logger;
