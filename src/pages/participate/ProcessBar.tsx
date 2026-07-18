import CheckIcon from '../../components/icons/CheckIcon'

const STEP_LABELS = ['참여자 정보', '축하 메시지', '참여 금액 선택', '마음 전하기'] as const

interface ProcessBarProps {
  /** 현재 진행 중인 단계 (1~4) */
  currentStep: number
}

/**
 * E03 참여 프로세스 바 (피그마 '내 선물 참여 프로세스' 컴포넌트셋 #1057:4870 기준)
 * 완료: 검정 원 + 체크 / 진행 중: 검정 원 + 숫자 / 미완료: 회색 원 + 회색 숫자
 */
export default function ProcessBar({ currentStep }: ProcessBarProps) {
  return (
    <div className="flex items-start">
      {STEP_LABELS.map((label, index) => {
        const step = index + 1
        const isDone = step < currentStep
        const isActive = step === currentStep
        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full items-center">
              {/* 왼쪽 반선: 이전 단계→현재까지 진행됐으면 검정 (피그마 '완료' 커넥터) */}
              <div
                className={`h-[1.5px] flex-1 ${
                  index === 0 ? 'bg-transparent' : step <= currentStep ? 'bg-gray-900' : 'bg-gray-100'
                }`}
              />
              <div
                className={`flex size-[30px] items-center justify-center rounded-full ${
                  isDone || isActive ? 'bg-gray-900' : 'bg-gray-100'
                }`}
              >
                {isDone ? (
                  <CheckIcon className="size-6 text-white" />
                ) : (
                  <span className={`text-caption1-m font-bold ${isActive ? 'text-white' : 'text-[#978F96]'}`}>
                    {step}
                  </span>
                )}
              </div>
              {/* 오른쪽 반선: 다음 단계까지 진행됐으면 검정 */}
              <div
                className={`h-[1.5px] flex-1 ${
                  index === STEP_LABELS.length - 1
                    ? 'bg-transparent'
                    : step < currentStep
                      ? 'bg-gray-900'
                      : 'bg-gray-100'
                }`}
              />
            </div>
            <span
              className={`whitespace-nowrap text-caption2-m leading-normal ${isDone || isActive ? 'text-black' : 'text-gray-300'}`}
            >
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
