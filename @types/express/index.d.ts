declare namespace Express {
	interface Request {
		tokenData?: {
			action: string;
			email: string;
			id: Identifier;
			// Add other properties as needed
		};
		user: {};
	}
}
