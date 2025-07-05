// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';
import { random } from 'lodash';

const initialBalance = 8000;

jest.mock('lodash', () => ({
  random: jest.fn().mockReturnValue(0),
}));

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const myAccount = getBankAccount(initialBalance);
    expect(myAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawing = 10000;
    const myAccount = getBankAccount(initialBalance);
    expect(() => myAccount.withdraw(withdrawing)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferring = 10000;
    const myAccount = getBankAccount(initialBalance);
    const otherAccount = getBankAccount(transferring);

    expect(() => myAccount.transfer(transferring, otherAccount)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const transferring = 7000;
    const myAccount = getBankAccount(initialBalance);

    expect(() => myAccount.transfer(transferring, myAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const deposit = 10000;
    const myAccount = getBankAccount(initialBalance);
    const newBalance = deposit + initialBalance;

    expect(myAccount.deposit(deposit).getBalance()).toBe(newBalance);
  });

  test('should withdraw money', () => {
    const withdrawing = 1000;
    const myAccount = getBankAccount(initialBalance);
    const newBalance = initialBalance - withdrawing;

    expect(myAccount.withdraw(withdrawing).getBalance()).toBe(newBalance);
  });

  test('should transfer money', () => {
    const transferring = 2000;
    const initialOther = 10000;
    const myAccount = getBankAccount(initialBalance);
    const otherAccount = getBankAccount(initialOther);
    const newMyBalance = initialBalance - transferring;
    const newOtherBalance = initialOther + transferring;

    myAccount.transfer(transferring, otherAccount);

    expect(myAccount.getBalance()).toBe(newMyBalance);
    expect(otherAccount.getBalance()).toBe(newOtherBalance);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const myAccount = getBankAccount(initialBalance);

    (random as jest.Mock).mockReturnValueOnce(5000).mockReturnValueOnce(1);

    const balance = await myAccount.fetchBalance();
    expect(balance).toBe(5000);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const myAccount = getBankAccount(initialBalance);
    const newBalance = 5000;

    (random as jest.Mock)
      .mockReturnValueOnce(newBalance)
      .mockReturnValueOnce(1);

    const fetchBalance = await myAccount.fetchBalance();
    expect(typeof fetchBalance).toBe('number');
    expect(fetchBalance).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const myAccount = getBankAccount(initialBalance);
    jest.spyOn(myAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(myAccount.synchronizeBalance.bind(myAccount)).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
