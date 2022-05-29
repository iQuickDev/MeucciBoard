import express from "express"
import bodyParser from "body-parser";
import EnvVars from "./env-vars";

type CustomRouter = {
    routerName: string;
    route: express.Router;
}

class Server {
    public app: express.Application;
    public port: number;
    public middlwares: express.RequestHandler[] = [
        bodyParser.json(),
        bodyParser.urlencoded({extended: true})
    ];
    public routes: CustomRouter[] = [];
    private readonly apiVersion: string = "v1";

    constructor(port: number) {
        this.port = port;
        this.app = express();
    }

    public async start(): Promise<void> {
        await this.initRoutersAndMiddlewares()
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    public addMiddleware(
        middleware: express.RequestHandler
    ): void {
        this.middlwares.push(middleware);
    }

    public addRouter(
        routerName: string,
        route: express.Router
    ): void {
        this.routes.push({
            routerName,
            route
        });
    }

    private initRoutersAndMiddlewares(): void {
        if(this.middlwares) {
            this.middlwares.forEach(middleware => {
                this.app.use(middleware);
            });
        }

        if(this.routes) {
            this.routes.forEach(route => {
                this.app.use(`/api/${this.apiVersion}/${route.routerName}`, route.route);
            });
        }

    }
}

const server = new Server(EnvVars.serverPort);

export default server;