/**
 * This is our real backend. The purpose of this class is to talk to our actual backend and utilize its methods
 */
import axios from "axios";
import { UserAuth } from "../auth/UserAuth";
import { Ingredient } from "../models/Ingredient";
import { BackendInterface } from "./BackendInterface";

export class Backend implements BackendInterface {
	private userAuth: UserAuth;

	constructor(userAuth: UserAuth) {
		this.userAuth = userAuth;
	}

	// Method that returns all ingredients
	async getAllIngredients(): Promise<Ingredient[]> {
		try {
			const token = await this.userAuth.getAccessToken();
			const response = await axios.get<Ingredient[]>(`${process.env.REACT_APP_BACKEND_HOST}/api/get_all_ingredients`, {
				headers: { Authorization: "Bearer " + token },
			});
			this.userAuth.setAllIngredients!(response.data as Ingredient[]);
			return response.data["result"] as Ingredient[];
		} catch (error) {
			console.error(error);
			return [];
		}
	}
}
