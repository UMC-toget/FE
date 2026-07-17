import type { FundingDetail, FundingMessage } from '../../types/funding'

/**
 * 봉투 아래 표시할 발신자 이름을 결정합니다. (피그마 '축하 메세지창' 컴포넌트셋 #1200:8788 기준)
 * - 개설자: 비공개 편지도 실명 표시 ("개설자 버전에선 비공개 표시가 없습니다"), 익명 편지만 '익명'
 * - 참여자: 비공개 편지 '비공개', 익명 편지 '익명'
 * - D04 이름 공개 OFF: 이름 라벨 자체를 제거 (null 반환 — '익명' 표시 아님)
 */
export function getMessageDisplayName(message: FundingMessage, funding: FundingDetail): string | null {
  if (funding.isOwner) return message.isAnonymous ? '익명' : (message.senderName ?? '익명')
  if (!funding.visibility.showParticipantNames) return null
  if (message.isAnonymous) return '익명'
  if (message.isPrivate) return '비공개'
  return message.senderName ?? '익명'
}

/**
 * 봉투를 탭해서 편지 내용을 볼 수 있는지 결정합니다.
 * 개설자는 항상 가능, 참여자는 내용 공개 ON이면서 비공개 편지가 아닐 때만.
 */
export function canOpenMessage(message: FundingMessage, funding: FundingDetail): boolean {
  if (funding.isOwner) return true
  return funding.visibility.showMessages && !message.isPrivate
}

/**
 * 편지 내용 열람이 가능한 상태인지 (D04 내용 공개 OFF면 참여자는 열람 불가).
 * "봉투를 탭하면 메세지를 확인할 수 있어요" 안내 문구 표시 여부에 사용.
 */
export function canViewMessages(funding: FundingDetail): boolean {
  return funding.isOwner || funding.visibility.showMessages
}
