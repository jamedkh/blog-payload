import { Post } from '@/payload-types'
import { convertLexicalToPlaintext } from 'node_modules/@payloadcms/richtext-lexical/dist/features/converters/lexicalToPlaintext/sync'
import { FieldHook } from 'payload'

const MAX_EXCERPT_LENGTH = 160
export const generateExcerptHook: FieldHook<Post, string> = ({ value, data }) => {
  if (value) return value.trim()
  if (!data?.content) return ''

  const text = convertLexicalToPlaintext({ data: data?.content }).trim()
  if (!text) return ''
  return text.length > MAX_EXCERPT_LENGTH ? `${text.slice(0, MAX_EXCERPT_LENGTH - 3)}...` : text
}
