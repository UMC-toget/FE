import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/common/Header'
import Button from '../../components/common/Button'
import ConfirmModal from '../../components/common/ConfirmModal'
import { useMockFunding } from '../funding/useMockFunding'
import { LETTER_COLORS } from './letterColors'
import ProcessBar from './ProcessBar'
import NameStep from './NameStep'
import LetterStep from './LetterStep'
import AmountStep from './AmountStep'
import DepositStep from './DepositStep'

/**
 * E03) 내 선물 참여: 축하 페이지 (/funding/:id/participate)
 * 4단계 참여 흐름: 참여자 정보 → 축하 메시지 → 참여 금액 선택 → 마음 전하기.
 * 자동 저장 없음(E 정책) — 이탈 시 ConfirmModal로 확인.
 */
export default function ParticipatePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const funding = useMockFunding()

  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [letter, setLetter] = useState('')
  const [letterColor, setLetterColor] = useState(LETTER_COLORS[7]) // 기본 화이트
  const [isPrivate, setIsPrivate] = useState(false)
  const [amount, setAmount] = useState<number | null>(null)
  const [showExitModal, setShowExitModal] = useState(false)

  const canGoNext = [
    name.trim() !== '' || isAnonymous, // 1단계: 이름 입력 (익명이면 생략 가능)
    letter.trim() !== '', // 2단계: 편지 내용 필수 (화면설계서: 미입력 시 비활성화)
    amount != null, // 3단계: 금액 선택 or 직접 입력 or 금액 없음(0)
    true, // 4단계: 항상 활성
  ][step - 1]

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
    else setShowExitModal(true)
  }

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
      return
    }
    // TODO: BE 연동 시 참여 데이터(name/isAnonymous/letter/letterColor/isPrivate/amount) 전송
    // TODO: E04(#30) 축하 완료 페이지 머지 전까지는 /funding/:id/complete 라우트가 없어 빈 화면으로 이동함
    navigate(`/funding/${id}/complete`)
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[402px] flex-col bg-white pb-[140px]">
      <Header
        title={`${funding.hostName}에게`}
        onBack={handleBack}
        right={
          <button type="button" onClick={() => setShowExitModal(true)} className="text-b2-m text-black">
            나가기
          </button>
        }
      />

      <div className="flex flex-col gap-5 px-[18px] pt-6">
        <ProcessBar currentStep={step} />

        {step === 1 && (
          <NameStep
            name={name}
            isAnonymous={isAnonymous}
            onNameChange={setName}
            onAnonymousChange={setIsAnonymous}
          />
        )}
        {step === 2 && (
          <LetterStep
            hostName={funding.hostName}
            letter={letter}
            letterColor={letterColor}
            isPrivate={isPrivate}
            onLetterChange={setLetter}
            onColorChange={setLetterColor}
            onPrivateChange={setIsPrivate}
          />
        )}
        {step === 3 && <AmountStep funding={funding} amount={amount} onAmountChange={setAmount} />}
        {step === 4 && (
          <DepositStep hostName={funding.hostName} letter={letter} letterColor={letterColor} amount={amount ?? 0} />
        )}
      </div>

      {/* 하단 고정 CTA (흰색 페이드 그라디언트) */}
      <div className="pointer-events-none fixed bottom-0 left-1/2 w-full max-w-[402px] -translate-x-1/2 bg-gradient-to-b from-white/0 to-white/80 px-[18px] pb-[34px] pt-10">
        <Button className="pointer-events-auto" disabled={!canGoNext} onClick={handleNext}>
          {step < 4 ? '다음' : '마음 보내기'}
        </Button>
      </div>

      {/* 피그마 '이모티콘 있는 팝업' 기준: 좌측 회색=나가기(이탈), 우측 검정=이어서 작성하기(닫기).
          공용 ConfirmModal 구조상 딤 클릭도 좌측(나가기) 동작을 타는 점은 팀 확인 필요 */}
      <ConfirmModal
        open={showExitModal}
        title="페이지를 나가시겠어요?"
        description={'지금 나가면, 작성 중인 메세지가\n사라질 수 있어요'}
        cancelText="나가기"
        confirmText="이어서 작성하기"
        onCancel={() => navigate(`/funding/${id}`)}
        onConfirm={() => setShowExitModal(false)}
      />
    </div>
  )
}
