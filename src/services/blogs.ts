// import { OperationType } from "../deps/fetch_graphql.ts";

// import {
//   DeleteBlogInput,
//   GetBlogInput,
//   SaveBlogInput,
//   SearchBlogsFilters,
//   SearchBlogsInput,
// } from "../../../common/src/gql/blog.graphql.ts";
import { Blog } from "../../../common/src/models/Blog.ts";
import { SearchBlogsParams } from "../../../common/src/models/params/SearchBlogsParams.ts";

import { DataStore } from "./DataStore.ts";
import { RestClient } from "./RestClient.ts";
// import { GraphQLClientWrapper } from "./GraphQLClientWrapper.ts";

// const SEARCH_BLOGS_QUERY = {
//     operationType: OperationType.Query,
//     name: "SearchBlogs",
//     variableDefs: [
//       {
//         name: "filters",
//         graphqlType: "SearchBlogsFilters!",
//       },
//     ],
//     field: {
//       name: "blogs",
//       args: [
//         {
//           name: "filters",
//           fromVariable: "filters",
//         }
//       ],
//       children: [ 
//         "id",
//         "slug",
//         "title",
//         "category",
//         "logoFileId",
//         "createdAt",
//         "updatedAt",
//         {
//             name: "ownerUser",
//             children: [
//                 "id",
//                 "username",
//                 "displayName",
//                 "avatarFileId",
//             ],
//         },
//       ],
//     },
// };

// const GET_BLOG_QUERY = {
//     operationType: OperationType.Query,
//     name: "GetBlog",
//     variableDefs: [
//       {
//         name: "id",
//         graphqlType: "String!",
//       },
//     ],
//     field: {
//       name: "blog",
//       args: [
//         {
//           name: "id",
//           fromVariable: "id",
//         }
//       ],
//       children: [ 
//         "id",
//         "slug",
//         "title",
//         "category",
//         "logoFileId",
//         "description",
//         "createdAt",
//         "updatedAt",
//         {
//             name: "ownerUser",
//             children: [
//                 "id",
//                 "username",
//                 "displayName",
//                 "avatarFileId",
//             ],
//         },
//       ],
//     },
// };

// const SAVE_BLOG_MUTATION = {
//     operationType: OperationType.Mutation,
//     name: "SaveBlog",
//     variableDefs: [
//       {
//         name: "input",
//         graphqlType: "SaveBlogInput!",
//       },
//     ],
//     field: {
//       name: "saveBlog",
//       args: [
//         {
//           name: "input",
//           fromVariable: "input",
//         }
//       ],
//       children: [ 
//         "id",
//         "createdAt",
//         "updatedAt",
//       ],
//     },
// };

// const DELETE_BLOG_MUTATION = {
//     operationType: OperationType.Mutation,
//     name: "DeleteBlog",
//     variableDefs: [
//       {
//         name: "id",
//         graphqlType: "String!",
//       },
//     ],
//     field: {
//       name: "deleteBlog",
//       args: [
//         {
//           name: "id",
//           fromVariable: "id",
//         }
//       ],
//     },
// };


// extends GraphQLClientWrapper
export class BlogsDataStore implements DataStore<Blog, number, SearchBlogsParams> {
  restClient: RestClient;
  
  public constructor(backendApiUrl: string) {
    this.restClient = new RestClient(backendApiUrl);
  }

  public async search(filters?: SearchBlogsParams): Promise<Blog[]> {
    return await this.restClient.get("blogs", filters)

    // return await this.callGraphQL<SearchBlogsInput, Blog[]>(
    //   SEARCH_BLOGS_QUERY,
    //   { filters },
    // )
  }

  public async getItem(id: number): Promise<Blog> {
    return await this.restClient.get(`blogs/${id}`)

    // return await this.callGraphQL<GetBlogInput, Blog>(
    //   Get_BLOG_QUERY,
    //   { id },
    // )
  }

  public async save(item: Blog): Promise<Blog> {
    return await (item.id <= 0)
      ? this.restClient.post("blogs", item)
      : this.restClient.put(`blogs/${item.id}`, item)

    // return await this.callGraphQL<SaveBlogInput, Blog>(
    //   SAVE_BLOG_MUTATION,
    //   { input: item },
    // )
  }

  public async deleteItem(item: Blog): Promise<Blog> {
    return await this.restClient.delete(`blogs/${item.id}`)

    // return await this.callGraphQL<DeleteBlogInput, Blog>(
    //     DELETE_BLOG_MUTATION,
    //     { id: item.id },
    //   )
    // }
  }
}
