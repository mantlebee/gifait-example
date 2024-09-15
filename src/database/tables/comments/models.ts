import {
  DateFromRelationColumn,
  IdColumn,
  LookupRelationColumn,
  LoremIpsumColumn,
  Table,
} from "@mantlebee/fake-data-only";

import { PostsTableKey } from "../posts";
import { UsersTableKey } from "../users";
import { CommentsTableKey } from "./constants";
import type { Comment } from "./types";

export class CommentsTable extends Table<Comment> {
  public constructor() {
    super(CommentsTableKey, [
      new IdColumn("id"),
      new LookupRelationColumn("postId", 0, PostsTableKey, "id"),
      new LoremIpsumColumn("content", () => ({
        paragraphs: { max: 1, min: 1 },
        sentencesPerParagraph: { max: 5, min: 1 },
        wordsPerSentence: { max: 20, min: 1 },
      })),
      new DateFromRelationColumn(
        "createdOn",
        PostsTableKey,
        "createdOn",
        (c, p) => c.postId === p.id
      ),
      new LookupRelationColumn("createdBy", 0, UsersTableKey, "id"),
    ]);
  }
}
