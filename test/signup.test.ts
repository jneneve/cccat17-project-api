import { signup } from "../src/signup";

test("Deve criar uma conta para um passageiro", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        isPassenger: true
    };
    const output = await signup(input);
    expect(output.accountId).toBeDefined();
});

test("Não deve criar uma conta se o e-mail já estiver cadastrado", async function () {
    const email = `john.doe${Math.random()}@gmail.com`;
    const input = {
        name: "John Doe",
        email,
        cpf: "97456321558",
        password: "123456",
        isPassenger: true
    };
    const inputForNewSignup = {
        name: "John Doe",
        email,
        cpf: "97456321558",
        password: "123456",
        isPassenger: true
    };
    await signup(input);
    await expect(() => signup(inputForNewSignup)).rejects.toThrow(new Error("The email has already been used!"));
});

test("Não deve criar uma conta se o nome for inválido", async function () {
    const input = {
        name: "JohnDoe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        isPassenger: true
    };
    await expect(() => signup(input)).rejects.toThrow(new Error("The name is invalid!"));
});

test("Não deve criar uma conta se o e-mail for inválido", async function () {
    const input = {
        name: "John Doe",
        email: "@gmail.com",
        cpf: "97456321558",
        password: "123456",
        isPassenger: true
    };
    await expect(() => signup(input)).rejects.toThrow(new Error("The email is invalid!"));
});

test("Não deve criar uma conta se o cpf for inválido", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "11111111111",
        password: "123456",
        isPassenger: true
    };
    await expect(() => signup(input)).rejects.toThrow(new Error("The cpf is invalid!"));
});

test("Deve criar uma conta para um motorista", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        carPlate: "AAA9999",
        isDriver: true
    };
    const output = await signup(input);
    expect(output.accountId).toBeDefined();
});

test("Não deve criar uma conta se a placa do veículo for inválida", async function () {
    const input = {
        name: "John Doe",
        email: `john.doe${Math.random()}@gmail.com`,
        cpf: "97456321558",
        password: "123456",
        carPlate: "AAA99",
        isDriver: true
    };
    await expect(() => signup(input)).rejects.toThrow(new Error("The car plate is invalid!"));
});
