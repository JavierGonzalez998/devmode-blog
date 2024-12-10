'use server'
import {prisma} from  "@/prisma"

export async function getCategories() {
    const categories = await prisma.categories.findMany()
    return categories
  }