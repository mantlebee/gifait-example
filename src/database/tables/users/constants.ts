import { createTableKey } from "@mantlebee/fake-data-only";

import type { User } from "./types";

export const UsersTableKey = createTableKey<User>("Users");
