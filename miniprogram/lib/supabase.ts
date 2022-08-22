import { createClient } from 'supabase-wechat-stable'
const url = ""
const key = ""

export const supabase = createClient(url, key)