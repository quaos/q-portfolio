// import { OperationType } from "../deps/fetch_graphql.ts";  

// import {
//     DeleteBlogPostInput,
//     GetBlogPostInput,
//     SaveBlogPostInput,
//     SearchBlogPostsFilters,
//     SearchBlogPostsInput,
// } from "../../../common/src/gql/blog.graphql.ts";
import { BlogPost } from "../../../common/src/models/BlogPost.ts";
import { SearchBlogPostsParams } from "../../../common/src/models/params/SearchBlogPostsParams.ts";

import { DataStore } from "./DataStore.ts";
import { RestClient } from "./RestClient.ts";
// import { GraphQLClientWrapper } from "./GraphQLClientWrapper.ts";

// const SEARCH_BLOG_POSTS_QUERY = {
//   operationType: OperationType.Query,
//   name: "SearchBlogPosts",
//   variableDefs: [
//     {
//       name: "filters",
//       graphqlType: "SearchBlogPostsFilters!",
//     },
//   ],
//   field: {
//     name: "blogPosts",
//     args: [
//       {
//         name: "filters",
//         fromVariable: "filters",
//       }
//     ],
//     children: [
//       "id",
//       "title",
//       "tags",
//       "createdAt",
//       "updatedAt",
//       {
//         name: "blog",
//         children: [
//           "slug",
//           "title",
//           "category",
//           "logoFileId",
//           "createdAt",
//           "updatedAt",
//           {
//             name: "ownerUser",
//             children: [
//               "id",
//               "username",
//               "displayName",
//               "avatarFileId",
//             ],
//           },
//         ],
//       },
//     ],
//   },
// };

// const GET_BLOG_POST_QUERY = {
//   operationType: OperationType.Query,
//   name: "GetBlogPost",
//   variableDefs: [
//     {
//       name: "id",
//       graphqlType: "String!",
//     },
//   ],
//   field: {
//     name: "blog",
//     args: [
//       {
//         name: "id",
//         fromVariable: "id",
//       }
//     ],
//     children: [
//       "id",
//       "title",
//       "tags",
//       "content",
//       "createdAt",
//       "updatedAt",
//       {
//         name: "blog",
//         children: [
//           "slug",
//           "title",
//           "category",
//           "logoFileId",
//           "createdAt",
//           "updatedAt",
//           {
//             name: "ownerUser",
//             children: [
//               "id",
//               "username",
//               "displayName",
//               "avatarFileId",
//             ],
//           },
//         ],
//       },
//     ],
//   },
// };

// const SAVE_BLOG_POST_MUTATION = {
//   operationType: OperationType.Mutation,
//   name: "SaveBlogPost",
//   variableDefs: [
//     {
//       name: "input",
//       graphqlType: "SaveBlogPostInput!",
//     },
//   ],
//   field: {
//     name: "saveBlogPost",
//     args: [
//       {
//         name: "input",
//         fromVariable: "input",
//       }
//     ],
//     children: [
//       "id",
//       "createdAt",
//       "updatedAt",
//     ],
//   },
// };

// const DELETE_BLOG_POST_MUTATION = {
//   operationType: OperationType.Mutation,
//   name: "DeleteBlogPost",
//   variableDefs: [
//     {
//       name: "id",
//       graphqlType: "String!",
//     },
//   ],
//   field: {
//     name: "deleteBlogPost",
//     args: [
//       {
//         name: "id",
//         fromVariable: "id",
//       }
//     ],
//   },
// };

export class BlogPostsDataStore implements DataStore<BlogPost, number, SearchBlogPostsParams> {
  restClient: RestClient;

  public constructor(backendApiUrl: string) {
    this.restClient = new RestClient(backendApiUrl);
    this.restClient.withQueryParamConverter("tags", (value) => (<string[]>value).join(","))
  }

  public async search(filters?: SearchBlogPostsParams): Promise<BlogPost[]> {
    return await this.restClient.get("blog-posts", filters)

    // return await this.callGraphQL<SearchBlogPostsInput, BlogPost[]>(
    //   SEARCH_BLOG_POSTS_QUERY,
    //   { filters },
    // )
  }

  public async getItem(id: number): Promise<BlogPost> {
    return await this.restClient.get(`blog-posts/${id}`)

    // return await this.callGraphQL<GetBlogPostInput, BlogPost>(
    //     Get_BLOG_POST_QUERY,
    //     { id },
    // )
  }

  public async save(item: BlogPost): Promise<BlogPost> {
    return await (item.id <= 0)
      ? this.restClient.post("blog-posts", item)
      : this.restClient.put(`blog-posts/${item.id}`, item)

    // return await this.callGraphQL<SaveBlogPostInput, BlogPost>(
    //   SAVE_BLOG_POST_MUTATION,
    //   { input: item },
    // )
  }

  public async deleteItem(item: BlogPost): Promise<BlogPost> {
    return await this.restClient.delete(`blog-posts/${item.id}`)

    // return await this.callGraphQL<DeleteBlogPostInput, BlogPost>(
    //   DELETE_BLOG_POST_MUTATION,
    //   { id: item.id },
    // )
  }
}

