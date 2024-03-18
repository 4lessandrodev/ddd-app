import Express, { Express as IExpress } from 'express';
import { Logger } from 'types-ddd';
import { Module } from './types';
import express from 'express';
import bodyParser from 'body-parser';

export class Server {
	
	private constructor(){}

	static build(routes: Array<Module>): Server {
		if (!Server.instance) Server.instance = Express();
		Server.applyMiddleware(express.json);
		Server.applyMiddleware(bodyParser.json);
		Server.applyRoutes(routes);
		return Server;
	}

	private static applyRoutes(modules: Array<Module>): Server {
		modules.forEach((module) => {
			const { controller } = module;
			const methods: Array<keyof typeof controller> = Object.keys(controller) as [];
			methods.forEach((method) => {
				Server.instance.use(controller[method]);
			});
		});
		return Server;
	}

	public static applyMiddleware(middleware: any): void {
		Server.instance.use(middleware());
	}

	static start(port: number = 3000): void {
		if (!Server.instance) return Logger.error("You must build the app before start it.");
		const callback = () => Logger.info(`Running on port: ${port}`);
		Server.instance.on('online', callback);
		Server.instance.listen(port);
		Server.instance.emit('online');
	}

	private static instance: IExpress;
}
