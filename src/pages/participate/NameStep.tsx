import TextField from '../../components/common/TextField'
import CheckOption from './CheckOption'

interface NameStepProps {
  name: string
  isAnonymous: boolean
  onNameChange: (name: string) => void
  onAnonymousChange: (isAnonymous: boolean) => void
}

/** E03 1단계: 참여자 정보 (피그마 #1714:68390 기준) */
export default function NameStep({ name, isAnonymous, onNameChange, onAnonymousChange }: NameStepProps) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-h3-sb leading-normal text-black">1. 참여자 정보</h2>
      {/* 스텝 제목 번호는 실제 단계 번호 사용 (피그마 원문은 전부 '1.'이지만 넘버링 오타로 판단) */}
      <div className="flex flex-col gap-2">
        {/* 익명 설정 체크 시 이름 입력 비활성화 (이름을 적어놨어도 익명으로 전송·표시됨) */}
        <TextField
          label="이름"
          value={name}
          placeholder="이름 또는 닉네임 입력"
          onChange={(e) => onNameChange(e.target.value)}
          disabled={isAnonymous}
          className={isAnonymous ? 'opacity-50' : ''}
        />
        <CheckOption label="익명 설정" checked={isAnonymous} onChange={onAnonymousChange} />
      </div>
    </div>
  )
}
