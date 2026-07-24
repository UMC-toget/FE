import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Header from '../../components/common/Header'
import TextField from '../../components/common/TextField'
import Button from '../../components/common/Button'
import ChevronRightIcon from '../../components/icons/ChevronRightIcon'
import BankSelectSheet from './BankSelectSheet'
import { useUserAccounts, USER_ACCOUNTS_QUERY_KEY } from '../../hooks/useUserAccounts'
import { createUserAccount, updateUserAccount, BANK_NAME_LABELS } from '../../api/userAccounts'
import type { BankName } from '../../api/userAccounts'

/** 계좌 등록/수정 폼 (I. 마이 > 계좌). id가 있으면 수정, 없으면 새 계좌 등록입니다. */
export default function AccountFormPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data: accounts } = useUserAccounts()
  const editingAccount = id ? accounts?.find((a) => a.userAccountId === Number(id)) : undefined
  const queryClient = useQueryClient()

  const [bankName, setBankName] = useState<BankName | ''>(editingAccount?.bankName ?? '')
  const [accountNumber, setAccountNumber] = useState(editingAccount?.account ?? '')
  const [accountHolder, setAccountHolder] = useState(editingAccount?.accountOwner ?? '')
  const [bankSheetOpen, setBankSheetOpen] = useState(false)

  const isValid = bankName !== '' && accountNumber.length > 0 && accountHolder.length > 0

  const saveMutation = useMutation({
    mutationFn: () => {
      if (bankName === '') throw new Error('은행을 선택해 주세요')
      const payload = { bankName, accountOwner: accountHolder, account: accountNumber }
      return editingAccount
        ? updateUserAccount(editingAccount.userAccountId, payload)
        : createUserAccount(payload)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_ACCOUNTS_QUERY_KEY })
      navigate('/my/accounts')
    },
  })

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[402px] flex-col bg-white">
      <Header title={editingAccount ? '계좌 수정하기' : '계좌 등록하기'} />

      <div className="flex flex-col gap-4 px-[18px] pt-4">
        <div className="flex flex-col gap-2">
          <label className="text-b1-m text-black">
            은행명 <span className="text-pink-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => setBankSheetOpen(true)}
            className="flex h-12 w-full items-center justify-between gap-2 rounded-lg bg-background px-4"
          >
            <span className={`text-b1-m ${bankName ? 'text-black' : 'text-gray-400'}`}>
              {bankName ? BANK_NAME_LABELS[bankName] : '은행을 선택해 주세요'}
            </span>
            <ChevronRightIcon className="size-6 shrink-0 text-black" />
          </button>
        </div>

        <TextField
          label={
            <>
              계좌번호 <span className="text-pink-500">*</span>
            </>
          }
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
          placeholder="계좌번호를 입력해 주세요 (- 없이)"
          inputMode="numeric"
        />

        <TextField
          label={
            <>
              예금주 <span className="text-pink-500">*</span>
            </>
          }
          value={accountHolder}
          onChange={(e) => setAccountHolder(e.target.value)}
          placeholder="예금주명을 입력해 주세요"
        />

        {saveMutation.isError && (
          <p className="text-caption1-r text-pink-500">
            {editingAccount ? '계좌 수정' : '계좌 등록'}에 실패했어요. 다시 시도해 주세요.
          </p>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-3 px-[18px] pb-8 pt-4">
        <Button disabled={!isValid || saveMutation.isPending} onClick={() => saveMutation.mutate()}>
          {editingAccount ? '저장하기' : '등록하기'}
        </Button>
      </div>

      <BankSelectSheet
        open={bankSheetOpen}
        onClose={() => setBankSheetOpen(false)}
        onSelect={(bank) => {
          setBankName(bank)
          setBankSheetOpen(false)
        }}
      />
    </div>
  )
}
