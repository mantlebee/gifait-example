import { createTableKey } from "@mantlebee/fake-data-only";

import type { Post } from "./types";

export const PostsTableKey = createTableKey<Post>("Posts");
