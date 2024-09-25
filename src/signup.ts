import crypto from "crypto";
import pgp from "pg-promise";
import { validateCpf } from "./validateCpf";

export async function signup (input: any): Promise<any> {
	const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	try {
		const accountId = crypto.randomUUID();
		const [existingAccount] = await connection.query("select * from cccat17.account where email = $1", [input.email]);
		if (existingAccount) throw new Error("The email has already been used!");
		if (!isNameFieldValid(input.name)) throw new Error("The name is invalid!");
		if (!isEmailFieldValid(input.email)) throw new Error("The email is invalid!");
		if (!validateCpf(input.cpf)) throw new Error("The cpf is invalid!");
		if (input.isDriver && !isCarPlateFieldValid(input.carPlate)) throw new Error("The car plate is invalid!");
		await connection.query("insert into cccat17.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values ($1, $2, $3, $4, $5, $6, $7)", 
			[accountId, input.name, input.email, input.cpf, input.carPlate, !!input.isPassenger, !!input.isDriver]);
		return {
			accountId: accountId
		};		
	} finally {
		await connection.$pool.end();
	}
}

function isNameFieldValid(name: string) {
	return name.match(/[a-zA-Z] [a-zA-Z]+/);
}

function isEmailFieldValid(email: string) {
	return email.match(/^(.+)@(.+)$/);
}

function isCarPlateFieldValid(carPlate: string) {
	return carPlate.match(/[A-Z]{3}[0-9]{4}/);
}
