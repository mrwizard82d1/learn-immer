import { O } from '@mobily/ts-belt';

type UserId = number;
type UserName = string;
export type User = { id: UserId, name: UserName };

export const allUsers: User[] = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐒",
  "🦇",
  "🦉",
  "🦅",
  "🦆",
  "🐦",
  "🐧",
  "🐔",
  "🐺",
  "🐗",
  "🐴",
  "🦄",
  "🐝",
  "🐛",
  "🦋",
  "🐌",
  "🐜",
  "🐢"
].map((emoji, idx) => ({
  id: idx,
  name: emoji
}))

export function getCurrentUser() {
  if (typeof sessionStorage === "undefined") return null // not a browser no current user
  // picks a random user, and stores it on the session storage to preserve identity during hot reloads
  const maybeCurrentUserId = O.fromNullable(sessionStorage.getItem("user") ||
                                                Math.round(Math.random() * (allUsers.length - 1)));
  const currentUserId = O.getExn(maybeCurrentUserId) as string;
  sessionStorage.setItem("user", currentUserId)

  return allUsers[parseInt(currentUserId)]
}
