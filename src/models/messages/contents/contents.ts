export type Contents = Content[];

export type Content = Text | Link;

export type PostedContents = PostedContent[];

export type PostedContent = Content & {
  transactionHash: string;
  innerTransactionHash: string;
};

export type Text = {
  key: number;
  type: "text";
  text: string;
  lang: "en" | "ja";
};

export type Link = {
  key: number;
  type: "link";
  url: string;
  alt?: string;
  title?: string;
};

export function isContents(contents: unknown[]): contents is Contents {
  return Array.isArray(contents) && contents.every(isContent);
}

export function isContent(content: unknown): content is Content {
  return isText(content) || isLink(content);
}

export function isPostedContents(
  contents: unknown[]
): contents is PostedContents {
  return Array.isArray(contents) && contents.every(isPostedContent);
}

export function isPostedContent(content: unknown): content is PostedContent {
  return (
    isContent(content) &&
    typeof content === "object" &&
    content !== null &&
    content !== undefined &&
    typeof (content as PostedContent).transactionHash === "string" &&
    typeof (content as PostedContent).innerTransactionHash === "string"
  );
}

export function isText(content: unknown): content is Text {
  return (
    typeof content === "object" &&
    content !== null &&
    content !== undefined &&
    typeof (content as Text).key === "number" &&
    (content as Text).type === "text" &&
    typeof (content as Text).text === "string" &&
    ((content as Text).lang === "en" || (content as Text).lang === "ja")
  );
}

export function isLink(content: unknown): content is Link {
  return (
    typeof content === "object" &&
    content !== null &&
    content !== undefined &&
    typeof (content as Link).key === "number" &&
    (content as Link).type === "link" &&
    typeof (content as Link).url === "string" &&
    (typeof (content as Link).alt === "string" ||
      typeof (content as Link).alt === "string") &&
    (typeof (content as Link).title === "string" ||
      typeof (content as Link).title === "string")
  );
}
