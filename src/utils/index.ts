export const getInputType = (type: string) => {
  if (type === 'String') return 'text'
  if (type === 'Date') return 'date'
  return 'text'
} 

export const getCurrValue = (data: string, type: string) => {
  if (type !== 'Date') return data
  return data?.substring(0, 10) || ''
}

export const getDefaultValue = (type: string, defaultValue?: string) => {
  if (type === 'String') return ''
  if (type === 'Date' && defaultValue) return new Date().toISOString()
  return ''
}