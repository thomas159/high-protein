export const useFormatText = () => {
  const formatText = (text: unknown, highlightColon: boolean = true): string => {
    if (!text) return ''

    // Ensure we are working with a string, handling objects defensively
    let formatted: string
    if (typeof text === 'string') {
      formatted = text
    } else if (typeof text === 'object' && text !== null) {
      const record = text as Record<string, unknown>
      if (typeof record.text === 'string') {
        formatted = record.text
      } else {
        const entries = Object.entries(record)
        formatted = entries.length > 0 ? entries.map(([k, v]) => `${k}: ${v}`).join(' ') : ''
      }
    } else {
      formatted = String(text)
    }
    
    if (highlightColon) {
      // Regex: ^ matches start of string, [\w\s]+ matches words/spaces, : matches colon
      // The 'gm' flags mean Global and Multiline (checks every new line)
      formatted = formatted.replace(/^([^:\n]+:)/gm, '<strong class="text-green-600 dark:text-green-400">$1</strong>')
    }
    
    // Format markdown links [text](url)
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-emerald-500 hover:underline">$1</a>')
    
    // Format bold text **text**
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    
    return formatted
  }

  return { formatText }
}
