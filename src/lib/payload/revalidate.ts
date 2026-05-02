import { revalidatePath } from 'next/cache'

export const revalidateHomepage = () => {
  revalidatePath('/')
}

export const revalidateBlogListing = () => {
  revalidatePath('/blog')
}

export const revalidateBlogPost = (slug?: string | null) => {
  if (slug) {
    revalidatePath(`/blog/${slug}`)
  }

  revalidatePath('/blog')
}
