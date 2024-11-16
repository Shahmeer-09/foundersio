import { defineQuery } from "next-sanity";

export const Startup_query = defineQuery(`*[
  _type == "startup" &&
  defined(slug.current) &&
  (!defined($search) || category match $search || title match $search || author->name match $search)
] | order(_createdAt desc) {
  image,
  _createdAt,
  description,
  title,
  _id,
  category,
  views,
  author->{
    _id, name, profilepic, bio
  },
  slug,
}`);
export const Startup_query_By_AuthorID = defineQuery(`*[
  _type == "startup" &&
  defined(slug.current) &&
  author._ref==$id
] | order(_createdAt desc) {
  image,
  _createdAt,
  description,
  title,
  _id,
  category,
  views,
  author->{
    _id, name, profilepic, bio
  },
  slug,
}`);

export const Startup_detail = defineQuery(`*[_type=="startup" && _id==$id]{
    image,
    _createdAt,
    description,
    title,
    _id,
    category,
    views,
      author->{
        _id, name, username,profilepic, bio
      },
      slug,
     pitch
}[0]`);

export const Startup_view = defineQuery(`*[_type=="startup" && _id==$id]{
    _id,views
}[0]`);

export const Get_User = defineQuery(`*[_type=="author" && id==$id][0]{
      id,
      _id,
      name,
      username,
      profilepic,
      bio,
      email
  }`);
export const Get_User_byId = defineQuery(`*[_type=="author" && _id==$id ][0]{
      id,
      _id,
      name,
      username,
      profilepic,
      bio,
      email
  }`);

export const Get_editorsPic =
  defineQuery(`*[_type=="playlist" && slug.current == $slug  ][0]{
    title,
    slug,
    select[]->{
      image,
    _createdAt,
    description,
    title,
    _id,
    category,
    views,
      author->{
        _id, name, username,profilepic, bio
      },
      slug,
     pitch
    }
  }`);
