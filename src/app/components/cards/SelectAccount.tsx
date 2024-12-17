'use client';

import '../../styles/selectAccount.css';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { getAccounts } from '@/lib/features/accounts/accountsSlice';
import { Account } from '@/models/AccountsTypes';

import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { Loading } from '../Loading';
import { Transfer } from '../Transfer';

export const SelectAccount = () => {
  const t = useTranslations('SelectAccount');

  const dispatch = useAppDispatch();

  //Fetch the accounts from the back-end
  useEffect(() => {
    dispatch(getAccounts()).then((result: any) => {
      const payload = result.payload as Account[];
      if (payload) {
        setSelectAccount1(payload[0].name);
        setSelectAccount2(payload[1].name);
      }
    });
  }, []);

  const isLoading = useAppSelector((state) => {
    return state.status;
  });
  const accounts = useAppSelector((state) => {
    return state.accounts;
  });

  const [selectedAccountName1, setSelectAccount1] = useState<String>('');
  const [selectedAccountName2, setSelectAccount2] = useState<String>('');

  //TODO: selection should be done with ID not name
  const accountNamePredicate = (accountName: String) => (account: Account) =>
    account.name === accountName;

  return (
    <section className="select-account container">
      <h2>{t('accounts')}</h2>
      {isLoading === 'pending' ? (
        <Loading />
      ) : (
        <>
          {['from', 'to'].map((label, index) => (
            <div key={label}>
              <label>{t(label)}</label>
              <select
                onChange={(e) =>
                  index === 0
                    ? setSelectAccount1(e.target.value)
                    : setSelectAccount2(e.target.value)
                }
                value={
                  index === 0
                    ? selectedAccountName1.toString()
                    : selectedAccountName2.toString()
                }
                data-testid={`selectAccount${index}`}
              >
                <option disabled>{t(`${index + 1}th account`)}</option>
                {accounts.map((account: Account) => (
                  <option key={Number(account.id)}>{account.name}</option>
                ))}
              </select>
            </div>
          ))}
          <Transfer
            accountSelected1={accounts.find(
              accountNamePredicate(selectedAccountName1)
            )}
            accountSelected2={accounts.find(
              accountNamePredicate(selectedAccountName2)
            )}
          />
        </>
      )}
    </section>
  );
};
