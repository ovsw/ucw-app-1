// ./nextjs-app/sanity/lib/queries.ts

import { groq } from "next-sanity";

// to run the groq queries in VSCode with the Sanity plugin,
// check that the sanity.json file in the root of the project
// has the correct sanity ID.
// that is the file's single purpose and it should look like:
// {
//   "api": {
//     "projectId": "mre92862",
//     "dataset": "production"
//   }
// }

// If the GROQ file/query has any variables, then extension asks for a relative filename of a JSON-file containing an object of key-value mappings.
// It autofills the param filename based on the current file with a.json extension, if it exists.

// Get all posts
export const postsQuery = groq`*[_type == "post" && defined(slug.current)]{
    _id, title, slug
  }`;

// Get a single post by its slug
export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{ 
    title, mainImage, body
  }`;

// Get all post slugs
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;
