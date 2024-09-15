import { Database } from "@mantlebee/fake-data-only";

import {
  CommentsTable,
  CommentsTableKey,
  PostsTable,
  PostsTableKey,
  UsersTable,
  UsersTableKey,
} from "./tables";

export class AppDatabase extends Database {
  public constructor() {
    super([new CommentsTable(), new PostsTable(), new UsersTable()]);
    this.seed({
      [CommentsTableKey]: 500,
      [PostsTableKey]: 100,
      [UsersTableKey]: 20,
    });
  }
}
