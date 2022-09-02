import { createClient } from 'supabase-wechat-stable'
// import { createClient } from '../supabase-wechat-stable/src/index'
// import { createClient } from 'supabase-minichat'
// import { createClient } from '../memfireSupabase/src/index'
const url = "https://cbr2dbi5g6h4sltf7a8g.baseapi.memfiredb.com"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzE5ODIxODk3NCwiaWF0IjoxNjYwMjk4OTc0LCJpc3MiOiJzdXBhYmFzZSJ9.N-8p-MyODWQjYd3-yGhngZDJusJpV7sBQZ-sEIHmzPw"
// import { URL } from 'url-parse-wechat'
// console.log(URL,'URL')
export const supabase = createClient(url, key)