import {
  DateColumn,
  IdColumn,
  LookupRelationColumn,
  LoremIpsumColumn,
  Table,
} from "@mantlebee/fake-data-only";

import { UsersTableKey } from "../users";
import { PostsTableKey } from "./constants";
import type { Post } from "./types";

export class PostsTable extends Table<Post> {
  public constructor() {
    super(
      PostsTableKey,
      [
        new IdColumn("id"),
        new LoremIpsumColumn("title", () => ({
          paragraphs: { max: 1, min: 1 },
          sentencesPerParagraph: { max: 1, min: 1 },
          wordsPerSentence: { max: 10, min: 5 },
        })),
        new LoremIpsumColumn("content", () => ({
          paragraphs: { max: 5, min: 1 },
          sentencesPerParagraph: { max: 5, min: 1 },
          wordsPerSentence: { max: 30, min: 5 },
        })),
        new DateColumn("createdOn", () => ({ from: new Date(2024, 1, 1) })),
        new LookupRelationColumn("createdBy", 0, UsersTableKey, "id"),
      ],
      (a) => a.title
    );
  }
}
