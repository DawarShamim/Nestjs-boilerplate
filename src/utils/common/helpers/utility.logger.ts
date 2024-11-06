import { createLogger, format, transports } from 'winston';
import 'winston-mongodb';
import * as dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const { combine, timestamp } = format;

const loggerTransports: transports.StreamTransportInstance[] = [];

// if (process.env.NODE_ENV === 'production') {
loggerTransports.push(
  new transports.MongoDB({
    db: process.env.MONGO_URI as string,
    options: { useUnifiedTopology: true },
    level: 'error',
  }),
);
// } else {
// loggerTransports.push(
//   new transports.Console({
//     level: 'error',
//     format: combine(
//     //   timestamp(),
//     //   format.metadata(),
//       format.errors({ stack: true }), // Ensure the error stack is included
//     ),
//   }),
// );
// }

export const logger = createLogger({
  format: combine(
    timestamp(),
    format.errors({ stack: true }),
    format.metadata(), // Store the error object in the meta field
  ),
  transports: loggerTransports,
});
