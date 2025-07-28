export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string;
  categoryId: number;
  tagId: number;
  content: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPostResponse {
  success: boolean;
  statusCode: number;
  message: string;
  meta: {
    page: number;
    size: number;
    total: number;
    totalPage: number;
  };
  data: BlogPost[];
}



export interface Post {
    id: number;
    title: string;
    slug: string;
    author: string;
    categoryId: number;
    tagId: number;
    content: string;
    image: string;
    seoTitle: string;
    seoDescription: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}