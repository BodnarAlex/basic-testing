// Uncomment the code below and write your tests
import { SynchronizationFailedError, getBankAccount } from '.';
import lodash from 'lodash';

const initialBalance = 8000;

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const myAccount = getBankAccount(initialBalance);

    expect(myAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawing = 10000;
    const myAccount = getBankAccount(initialBalance);

    expect(() => myAccount.withdraw(withdrawing)).toThrowError();
  });

  test('should throw error when transferring more than balance', () => {
    const transferring = 10000;
    const myAccount = getBankAccount(initialBalance);
    const otherAccount = getBankAccount(transferring);

    expect(() => myAccount.transfer(transferring, otherAccount)).toThrowError();
  });

  test('should throw error when transferring to the same account', () => {
    const transferring = 10;
    const myAccount = getBankAccount(initialBalance);

    expect(() => myAccount.transfer(transferring, myAccount)).toThrowError();
  });

  test('should deposit money', () => {
    const newSumm = 500;
    const myAccount = getBankAccount(initialBalance);
    let newBalance = newSumm + initialBalance;

    expect(myAccount.deposit(newSumm).getBalance()).toBe(newBalance);
  });

  test('should withdraw money', () => {
    const withdraw = 500;
    const myAccount = getBankAccount(initialBalance);
    let newBalance = initialBalance - withdraw;

    expect(myAccount.withdraw(withdraw).getBalance()).toBe(newBalance);
  });

  test('should transfer money', () => {
    const initialOther = 10000;
    const tranf = 500;
    const myAccount = getBankAccount(initialBalance);
    const otherAccount = getBankAccount(initialOther);
    let newMyBalance = initialBalance + tranf;
    let newOtherBalance = initialOther - tranf;

    expect(otherAccount.transfer(tranf, myAccount).getBalance()).toBe(newOtherBalance);
    expect(myAccount.getBalance()).toBe(newMyBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const myAccount = getBankAccount(initialBalance);
    jest.spyOn(lodash, "random").mockReturnValue(initialBalance);

    await expect(myAccount.fetchBalance()).resolves.toBe(initialBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const myAccount = getBankAccount(initialBalance);
    const newBalance = 5000;
    jest.spyOn(myAccount, "fetchBalance").mockResolvedValue(newBalance);

    await myAccount.synchronizeBalance();
    expect(myAccount.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const myAccount = getBankAccount(initialBalance);
    jest.spyOn(myAccount, "fetchBalance").mockResolvedValue(null);

    expect(myAccount.synchronizeBalance.bind(myAccount)).rejects.toThrowError(SynchronizationFailedError);
  });
});
