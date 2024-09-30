import axios from "axios";

test("Deve criar um conta via API", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        isPassenger: true
    };
    const response = await axios.post("http://localhost:3001/signup", input);
    const output = response.data;
    expect(output.accountId).toBeDefined();
});

test("Deve buscar uma conta que já foi criada via API", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        isPassenger: true
    };
    const responseSignup = await axios.post("http://localhost:3001/signup", input);
    const outputSignup = responseSignup.data;
    const responseGetAccount = await axios.get(`http://localhost:3001/getAccount/${outputSignup.accountId}`);
    const outputGetAccount = responseGetAccount.data;
    expect(outputGetAccount.accountId).toBe(outputSignup.accountId);
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.cpf).toBe(input.cpf);
    expect(outputGetAccount.isPassenger).toBe(input.isPassenger);
});
