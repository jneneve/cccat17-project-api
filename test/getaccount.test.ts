import { signup } from "../src/signup";

test("Deve buscar uma conta que já foi criada", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        isPassenger: true
    };
    const accountId = await signup(input);
    const output = await getaccount(accountId);
    expect(output.accountId).toBe(accountId);
});
