import pgp from "pg-promise";

export async function getAccount(accountId: string): Promise<any> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
	try {
		const [existingAccount] = await connection.query("select * from cccat17.account where account_id = $1", [accountId]);
        if (!existingAccount) throw new Error("The account not found!");
        return {
            accountId: existingAccount.account_id,
            name: existingAccount.name,
            email: existingAccount.email,
            cpf: existingAccount.cpf,
            password: existingAccount.password,
            carPlate: existingAccount.car_plate,
            isPassenger: existingAccount.is_passenger,
            isDriver: existingAccount.is_driver
        }
	} finally {
		await connection.$pool.end();
	}
}
