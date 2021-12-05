export type Users = User[];

export type User = {
  name: string;
  biography: string;
  twitter?: string;
  github?: string;
  links: string[];
};

export type PostedUsers = PostedUser[];

export type PostedUser = User & {
  address: string;
  createdAt: Date;
  updatedAt: Date;
};

export function isUser(user: unknown): user is User {
  return (
    typeof user === "object" &&
    user !== null &&
    user !== undefined &&
    typeof (user as User).name === "string" &&
    typeof (user as User).biography === "string" &&
    (typeof (user as User).twitter === "string" ||
      typeof (user as User).twitter === "undefined") &&
    (typeof (user as User).github === "string" ||
      typeof (user as User).github === "undefined") &&
    Array.isArray((user as User).links) &&
    (user as User).links.every((link) => typeof link === "string")
  );
}

export function isPostedUser(user: unknown): user is PostedUser {
  return (
    typeof user === "object" &&
    user !== null &&
    user !== undefined &&
    typeof (user as PostedUser).address === "string" &&
    (user as PostedUser).createdAt instanceof Date &&
    (user as PostedUser).updatedAt instanceof Date
  );
}
