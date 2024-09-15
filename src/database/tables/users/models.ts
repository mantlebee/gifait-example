import {
  CustomColumn,
  EmailColumn,
  FirstNameColumn,
  IdColumn,
  LastNameColumn,
  Table,
} from "@mantlebee/fake-data-only";
import { generateRandomNumber } from "@mantlebee/ts-random";

import { UsersTableKey } from "./constants";
import type { User } from "./types";

export class UsersTable extends Table<User> {
  public constructor() {
    super(
      UsersTableKey,
      [
        new IdColumn("id"),
        new FirstNameColumn("firstName"),
        new LastNameColumn("lastName"),
        new EmailColumn("email", ({ firstName, lastName }) => ({
          firstNames: [firstName],
          lastNames: [lastName],
        })),
        new CustomColumn(
          "username",
          ({ lastName }) =>
            lastName.toLowerCase() +
            generateRandomNumber(9) +
            generateRandomNumber(9)
        ),
      ],
      (a) => `${a.firstName} ${a.lastName}`
    );
  }
}
