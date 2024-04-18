export interface Post {
  postId: number
  user: { username: string; userId: number }
  picture?: string
  comments: number
  likes: number
}
