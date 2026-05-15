export const useFormatText = () => {
  const formatText = (text: string | undefined | null) => {
    if (!text) return ''

    // Regex: ^ matches start of string, [\w\s]+ matches words/spaces, : matches colon
    // The 'gm' flags mean Global and Multiline (checks every new line)
    let formatted = text.replace(/^([^:\n]+:)/gm, '<strong class="text-green-600 dark:text-green-400">$1</strong>')
    
    // Format markdown links [text](url)
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-emerald-500 hover:underline">$1</a>')
    
    // Format bold text **text**
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    
    return formatted
  }

  return { formatText }
}
