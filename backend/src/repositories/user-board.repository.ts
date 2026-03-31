const userBoardMap = new Map<string, string>()

const findBoardIdByUserId = (userId: string): string | null => {
  return userBoardMap.get(userId) ?? null
}

const linkUserToBoard = (userId: string, boardId: string): void => {
  userBoardMap.set(userId, boardId)
}

export { findBoardIdByUserId, linkUserToBoard }
