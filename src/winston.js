import config from "./config.dotenv.js";
import winston from "winston";

// export const logger = winston.createLogger({
//     transports: [

//         new winston.transport.Console({
//             level: "http", 
//             format: winston.format.combine(
//                 winston.format.colorize(),
//                 winston.format.simple()
//             ),
//         }),

//         new winston.transport.File({
//             filename: "./logs-file.log",
//             level: "warn",
//             format: winston.format.combine(
//                 winston.format.timestamp(),
//                 winston.format.prettyPrint()
//             ),
//         }),
//     ],
// });

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: "red",
        warning: "yellow",
        information: "blue",
        debug: "green",
    },
};

// export const logger = winston.createLogger({
//     levels: customLevels.levels,
//     transports: [

//         new winston.transports.Console({
//             level: "debug",
//             format: winston.format.combine(
//                 winston.format.colorize({ colors: customLevels.colors }),
//                 winston.format.simple()
//             ),
//         }),

//         new winston.transports.File({
//             filename: "./errors.log",
//             level: "warning",
//             format: winston.format.combine(
//                 winston.format.timestamp(),
//                 winston.format.prettyPrint()
//             ),
//         }),
//     ]
// });


export let logger;

if (config.environment === "stage") {
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: "info",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevels.colors }),
                    winston.format.simple()
                ),
            }),

            new winston.transports.File({
                filename: "./errors.log",
                level: "error",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.prettyPrint()
                ),
            }),
        ]
    })
} else {
    //DEVELOPMENT
    logger = winston.createLogger({
        levels: customLevels.levels,
        transports: [
            new winston.transports.Console({
                level: "debug",
                format: winston.format.combine(
                    winston.format.colorize({ colors: customLevels.colors }),
                    winston.format.simple()
                )
            }),
        ]
    })

}