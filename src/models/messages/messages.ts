import { isPostedUser, PostedUser } from "../users";
import {
  Contents,
  isContents,
  PostedContents,
  isPostedContents,
} from "./contents";

export type Messages = Message[];

export type Message = {
  type: "thread" | "reply" | "direct";
  targetTransactionHash?: string;
  title: string;
  categories: string[];
  tags: string[];
  contents: Contents;
  archiverAddress: string;
  targetAddress?: string;
};

export type PostedMessages = PostedMessage[];

export type PostedMessage = Message & {
  transactionHash: string;
  sender: PostedUser;
  postedContents: PostedContents;
  status: "unknown" | "unconfirmed" | "confirmed" | "finalized";
  confirmedBlockHeight?: bigint;
  finalizedBlockHeight?: bigint;
  createdAt: Date;
  unconfirmedAt?: Date;
  confirmedAt?: Date;
  finalizedAt?: Date;
  updatedAt: Date;
};

export function isMessages(messages: unknown[]): messages is Messages {
  return Array.isArray(messages) && messages.every(isMessage);
}

export function isMessage(message: unknown): message is Message {
  return (
    typeof message === "object" &&
    message !== null &&
    message !== undefined &&
    ((message as Message).type === "thread" ||
      (message as Message).type === "reply" ||
      (message as Message).type === "direct") &&
    typeof (message as Message).title === "string" &&
    (typeof (message as Message).targetTransactionHash === "string" ||
      typeof (message as Message).targetTransactionHash === "undefined") &&
    Array.isArray((message as Message).categories) &&
    (message as Message).categories.every(
      (category) => typeof category === "string"
    ) &&
    Array.isArray((message as Message).tags) &&
    (message as Message).tags.every((tag) => typeof tag === "string") &&
    isContents((message as Message).contents) &&
    typeof (message as Message).archiverAddress === "string" &&
    (typeof (message as Message).targetAddress === "string" ||
      (message as Message).targetAddress === "undefined")
  );
}

export function isPostedMessages(
  messages: unknown[]
): messages is PostedMessages {
  return Array.isArray(messages) && messages.every(isPostedMessage);
}

export function isPostedMessage(message: unknown): message is PostedMessage {
  return (
    isMessage(message) &&
    typeof (message as PostedMessage).transactionHash === "string" &&
    isPostedUser((message as PostedMessage).sender) &&
    Array.isArray((message as PostedMessage).postedContents) &&
    isPostedContents((message as PostedMessage).postedContents) &&
    ((message as PostedMessage).status === "unknown" ||
      (message as PostedMessage).status === "unconfirmed" ||
      (message as PostedMessage).status === "confirmed" ||
      (message as PostedMessage).status === "finalized") &&
    (typeof (message as PostedMessage).confirmedBlockHeight === "bigint" ||
      typeof (message as PostedMessage).confirmedBlockHeight === "undefined") &&
    (typeof (message as PostedMessage).finalizedBlockHeight === "bigint" ||
      typeof (message as PostedMessage).finalizedBlockHeight === "undefined") &&
    (message as PostedMessage).createdAt instanceof Date &&
    ((message as PostedMessage).unconfirmedAt instanceof Date ||
      typeof (message as PostedMessage).unconfirmedAt === "undefined") &&
    ((message as PostedMessage).confirmedAt instanceof Date ||
      typeof (message as PostedMessage).confirmedAt === "undefined") &&
    ((message as PostedMessage).finalizedAt instanceof Date ||
      typeof (message as PostedMessage).finalizedAt === "undefined") &&
    (message as PostedMessage).updatedAt instanceof Date
  );
}
