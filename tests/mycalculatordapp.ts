const assert = require('assert')
const anchor = require('@project-serum/anchor')
const {SystemProgram} = anchor.web3

describe('mycalculatordapp', () => {
    const provider = anchor.AnchorProvider.local();
    anchor.setProvider(provider);
    const calculator = anchor.web3.Keypair.generate();
    const program = anchor.workspace.Mycalculatordapp;

    it('Creates a calculator', async()=>{
        await program.rpc.create("Welcome to Solana", {
            accounts:{
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers: [calculator]
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.greeting === "Welcome to Solana")
    })
    it('Add 2 numbers', async()=>{
        await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
            accounts:{
                calculator: calculator.publicKey,
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(5)))
    })
    it('Subtract 2 numbers', async()=>{
        await program.rpc.sub(new anchor.BN(2), new anchor.BN(3), {
            accounts:{
                calculator: calculator.publicKey,
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(-1)))
    })
    it('Multiply 2 numbers', async()=>{
        await program.rpc.mul(new anchor.BN(2), new anchor.BN(3), {
            accounts:{
                calculator: calculator.publicKey,
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(6)))
    })
    it('Divide 2 numbers', async()=>{
        await program.rpc.div(new anchor.BN(2), new anchor.BN(3), {
            accounts:{
                calculator: calculator.publicKey,
            }
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(0)))
        assert.ok(account.remainder.eq(new anchor.BN(2)))
    })
})

// import * as anchor from "@project-serum/anchor";
// import { Program } from "@project-serum/anchor";
// import { Mycalculatordapp } from "../target/types/mycalculatordapp";

// describe("mycalculatordapp", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Mycalculatordapp as Program<Mycalculatordapp>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });
