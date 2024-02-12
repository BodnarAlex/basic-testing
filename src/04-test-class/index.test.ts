// Uncomment the code below and write your tests
import { getBankAccount } from '.';

const initialBalance = 8000;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const createAccount = getBankAccount(initialBalance);
    expect(createAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawing = 10000;
    const createAccount = getBankAccount(initialBalance);
    expect(() => createAccount.withdraw(withdrawing)).toThrowError();
  });

  test('should throw error when transferring more than balance', () => {
    const transferring = 10000;
    const createAccount = getBankAccount(initialBalance);
    const otherAccount = getBankAccount(transferring);

    expect(() => createAccount.transfer(transferring, otherAccount)).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const transferring = 10;
    const createAccount = getBankAccount(initialBalance);

    expect(() => createAccount.transfer(transferring, createAccount)).toThrowError();
  });

  test('should deposit money', () => {
    const newSumm = 500;
    let newBalance = newSumm + initialBalance;
    const createAccount = getBankAccount(initialBalance);

    expect(createAccount.deposit(newSumm).getBalance()).toBe(newBalance);
  });

  test('should withdraw money', () => {
    const withdraw = 500;
    let newBalance = initialBalance - withdraw ;
    const createAccount = getBankAccount(initialBalance);

    expect(createAccount.withdraw(withdraw).getBalance()).toBe(newBalance);
  });

  test('should transfer money', () => {
    const initialOther = 10000;
    const tranf = 500;
    const createAccount = getBankAccount(initialBalance);
    const otherAccount = getBankAccount(initialOther);
    let newMyBalance = initialBalance + tranf ;
    let newOtherBalance = initialOther - tranf ;

    expect(otherAccount.transfer(tranf, createAccount).getBalance()).toBe(newOtherBalance);
    expect(createAccount.getBalance()).toBe(newMyBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    // Write your tests here
  });

  test('should set new balance if fetchBalance returned number', async () => {
    // Write your tests here
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    // Write your tests here
  });
});
