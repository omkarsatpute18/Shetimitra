import * as React from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  debounced?: boolean
  debounceMs?: number
  showClear?: boolean
  size?: 'sm' | 'default' | 'lg'
  className?: string
}

const SearchBar = ({
  placeholder = 'Search...',
  value: controlledValue,
  onChange,
  onSearch,
  debounced = true,
  debounceMs = 300,
  showClear = true,
  size = 'default',
  className,
}: SearchBarProps) => {
  const [internalValue, setInternalValue] = React.useState('')
  const value = controlledValue ?? internalValue
  const setValue = onChange ?? setInternalValue
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    setValue(next)

    if (onSearch) {
      if (debounced) {
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => onSearch(next), debounceMs)
      } else {
        onSearch(next)
      }
    }
  }

  const handleClear = () => {
    setValue('')
    onSearch?.('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value)
    }
  }

  React.useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div className={cn('relative w-full', className)}>
      <Search className={cn(
        'pointer-events-none absolute text-gray-400',
        size === 'sm' ? 'left-2.5 top-1/2 h-4 w-4 -translate-y-1/2' :
        size === 'lg' ? 'left-3.5 top-1/2 h-5 w-5 -translate-y-1/2' :
        'left-3 top-1/2 h-4 w-4 -translate-y-1/2'
      )} />
      <Input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        size={size}
        className={cn(
          size === 'sm' ? 'pl-8 pr-8' : size === 'lg' ? 'pl-11 pr-11' : 'pl-9 pr-9'
        )}
      />
      {showClear && value && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className={cn(
            'absolute text-gray-400 hover:text-gray-700 hover:bg-transparent',
            size === 'sm' ? 'right-1 top-1/2 h-6 w-6 -translate-y-1/2' :
            size === 'lg' ? 'right-2 top-1/2 h-9 w-9 -translate-y-1/2' :
            'right-1.5 top-1/2 h-8 w-8 -translate-y-1/2'
          )}
          aria-label="Clear search"
        >
          <X className={cn(size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-4.5 w-4.5' : 'h-4 w-4')} />
        </Button>
      )}
    </div>
  )
}

SearchBar.displayName = 'SearchBar'

export { SearchBar }
