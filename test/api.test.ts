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
