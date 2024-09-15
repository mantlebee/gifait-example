import { createTableKey } from "@mantlebee/fake-data-only";

import type { Comment } from "./types";

export const CommentsTableKey = createTableKey<Comment>("Comments");
