import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import { allowedOrigins } from './allowedOrigins'

export const corsOptions: CorsOptions = {
    // checks allowedOrigins if the origin is listed in allowed origins
    // return -1 if the origin is not included in the allowed origins array
    // !origin allows softwares like postman to access our api
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
}