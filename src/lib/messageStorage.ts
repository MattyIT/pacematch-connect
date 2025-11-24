export type MessageRequestStatus = 'pending' | 'accepted' | 'declined';

export interface ConversationMetadata {
  userId: number;
  isMuted: boolean;
  isArchived: boolean;
  lastMessageTime: number;
}

// Message request management
export const getMessageRequestStatus = (userId: number): MessageRequestStatus | null => {
  const stored = localStorage.getItem('messageRequests');
  if (!stored) return null;
  
  const requests = JSON.parse(stored);
  return requests[userId] || null;
};

export const acceptMessageRequest = (userId: number): void => {
  const stored = localStorage.getItem('messageRequests') || '{}';
  const requests = JSON.parse(stored);
  requests[userId] = 'accepted';
  localStorage.setItem('messageRequests', JSON.stringify(requests));
};

export const declineMessageRequest = (userId: number): void => {
  const stored = localStorage.getItem('messageRequests') || '{}';
  const requests = JSON.parse(stored);
  requests[userId] = 'declined';
  localStorage.setItem('messageRequests', JSON.stringify(requests));
};

export const deleteMessageRequest = (userId: number): void => {
  const stored = localStorage.getItem('messageRequests') || '{}';
  const requests = JSON.parse(stored);
  delete requests[userId];
  localStorage.setItem('messageRequests', JSON.stringify(requests));
};

// Blocked users management
export const getBlockedUsers = (): number[] => {
  const stored = localStorage.getItem('blockedUsers');
  return stored ? JSON.parse(stored) : [];
};

export const blockUser = (userId: number): void => {
  const blocked = getBlockedUsers();
  if (!blocked.includes(userId)) {
    blocked.push(userId);
    localStorage.setItem('blockedUsers', JSON.stringify(blocked));
  }
};

export const unblockUser = (userId: number): void => {
  const blocked = getBlockedUsers();
  const updated = blocked.filter(id => id !== userId);
  localStorage.setItem('blockedUsers', JSON.stringify(updated));
};

export const isUserBlocked = (userId: number): boolean => {
  return getBlockedUsers().includes(userId);
};

// Conversation metadata management
export const getConversationMetadata = (userId: number): ConversationMetadata => {
  const stored = localStorage.getItem(`conversation-${userId}`);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    userId,
    isMuted: false,
    isArchived: false,
    lastMessageTime: Date.now(),
  };
};

export const muteConversation = (userId: number, mute: boolean): void => {
  const metadata = getConversationMetadata(userId);
  metadata.isMuted = mute;
  localStorage.setItem(`conversation-${userId}`, JSON.stringify(metadata));
};

export const archiveConversation = (userId: number, archive: boolean): void => {
  const metadata = getConversationMetadata(userId);
  metadata.isArchived = archive;
  localStorage.setItem(`conversation-${userId}`, JSON.stringify(metadata));
};

export const deleteConversation = (userId: number): void => {
  localStorage.removeItem(`conversation-${userId}`);
  deleteMessageRequest(userId);
};
