import * as React from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Select } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'

export type SortDirection = 'asc' | 'desc'

export interface ColumnDef<T> {
  id: string
  header: string | React.ReactNode
  accessorKey?: keyof T
  cell?: (row: T, index: number) => React.ReactNode
  sortable?: boolean
  sortFn?: (a: T, b: T, dir: SortDirection) => number
  size?: string
}

export interface RowSelection {
  [key: string]: boolean
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  sortable?: boolean
  searchable?: boolean
  paginated?: boolean
  selectable?: boolean
  rowKey: keyof T | ((row: T) => string)
  getRowClassName?: (row: T, index: number) => string
  onRowClick?: (row: T, index: number) => void
  rowSelection?: RowSelection
  onRowSelectionChange?: (selection: RowSelection) => void
  pageSize?: number
  pageSizeOptions?: number[]
  searchPlaceholder?: string
  searchKeys?: (keyof T)[]
  emptyMessage?: string
  className?: string
}

function getKeyValue<T>(row: T, key: keyof T | ((row: T) => string)): string {
  if (typeof key === 'function') return key(row)
  return String(row[key])
}

function DataTableInner<T>({
  columns,
  data,
  sortable = true,
  searchable = false,
  paginated = true,
  selectable = false,
  rowKey,
  getRowClassName,
  onRowClick,
  rowSelection: controlledSelection,
  onRowSelectionChange,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  searchPlaceholder = 'Search...',
  searchKeys,
  emptyMessage = 'No data found',
  className,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [currentPageSize, setCurrentPageSize] = React.useState(pageSize)
  const [internalSelection, setInternalSelection] = React.useState<RowSelection>({})

  const rowSelection = controlledSelection ?? internalSelection
  const setSelection = onRowSelectionChange ?? setInternalSelection

  const filteredData = React.useMemo(() => {
    if (!searchable || !searchQuery.trim()) return data
    const query = searchQuery.toLowerCase()
    const keys = searchKeys ?? (columns.filter(c => c.accessorKey).map(c => c.accessorKey!) as (keyof T)[])
    return data.filter(row =>
      keys.some(key => {
        const value = row[key]
        return value != null && String(value).toLowerCase().includes(query)
      })
    )
  }, [data, searchQuery, searchable, searchKeys, columns])

  const sortedData = React.useMemo(() => {
    if (!sortable || !sortColumn) return filteredData
    const column = columns.find(c => c.id === sortColumn)
    if (!column) return filteredData

    const sorted = [...filteredData]
    if (column.sortFn) {
      sorted.sort((a, b) => column.sortFn!(a, b, sortDirection))
    } else if (column.accessorKey) {
      sorted.sort((a, b) => {
        const av = a[column.accessorKey!]
        const bv = b[column.accessorKey!]
        if (typeof av === 'number' && typeof bv === 'number') {
          return sortDirection === 'asc' ? av - bv : bv - av
        }
        const as = String(av ?? '')
        const bs = String(bv ?? '')
        return sortDirection === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as)
      })
    }
    return sorted
  }, [filteredData, sortable, sortColumn, sortDirection, columns])

  const totalPages = Math.max(1, Math.ceil(sortedData.length / currentPageSize))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedData = React.useMemo(() => {
    if (!paginated) return sortedData
    const start = (safePage - 1) * currentPageSize
    return sortedData.slice(start, start + currentPageSize)
  }, [sortedData, currentPageSize, safePage, paginated])

  const allSelected = paginatedData.length > 0 && paginatedData.every(
    row => rowSelection[getKeyValue(row, rowKey)]
  )

  const toggleAll = () => {
    const newSelection = { ...rowSelection }
    if (allSelected) {
      paginatedData.forEach(row => {
        delete newSelection[getKeyValue(row, rowKey)]
      })
    } else {
      paginatedData.forEach(row => {
        newSelection[getKeyValue(row, rowKey)] = true
      })
    }
    setSelection(newSelection)
  }

  const toggleRow = (key: string) => {
    const newSelection = { ...rowSelection }
    if (newSelection[key]) {
      delete newSelection[key]
    } else {
      newSelection[key] = true
    }
    setSelection(newSelection)
  }

  const handleSort = (colId: string, colSortable?: boolean) => {
    if (!sortable || colSortable === false) return
    if (sortColumn === colId) {
      setSortDirection(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortColumn(colId)
      setSortDirection('asc')
    }
  }

  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, currentPageSize])

  const fromEntry = sortedData.length === 0 ? 0 : (safePage - 1) * currentPageSize + 1
  const toEntry = Math.min(safePage * currentPageSize, sortedData.length)

  return (
    <div className={cn('w-full space-y-4', className)}>
      {searchable && (
        <div className="flex items-center gap-3">
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-gray-50/80 border-b border-gray-200">
              <tr>
                {selectable && (
                  <th className="h-11 px-4 w-12">
                    <Checkbox
                      checked={allSelected}
                      onChange={toggleAll as unknown as React.ChangeEventHandler<HTMLInputElement>}
                      aria-label="Select all"
                    />
                  </th>
                )}
                {columns.map(col => (
                  <th
                    key={col.id}
                    className={cn(
                      'h-11 px-4 text-left align-middle font-semibold text-gray-700',
                      col.sortable !== false && sortable ? 'cursor-pointer select-none hover:bg-gray-100/60 transition-colors' : '',
                      col.size
                    )}
                    onClick={() => handleSort(col.id, col.sortable)}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {col.header}
                      {col.sortable !== false && sortable && (
                        <span className="text-gray-400">
                          {sortColumn === col.id ? (
                            sortDirection === 'asc' ? (
                              <ArrowUp className="h-3.5 w-3.5 text-primary-600" />
                            ) : (
                              <ArrowDown className="h-3.5 w-3.5 text-primary-600" />
                            )
                          ) : (
                            <ArrowUpDown className="h-3.5 w-3.5" />
                          )}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 1 : 0)}
                    className="h-32 px-4 text-center align-middle text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm">{emptyMessage}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, i) => {
                  const key = getKeyValue(row, rowKey)
                  const isSelected = rowSelection[key]
                  return (
                    <tr
                      key={key}
                      className={cn(
                        'border-b border-gray-100 transition-colors hover:bg-gray-50/60',
                        isSelected && 'bg-primary-50/50 hover:bg-primary-50',
                        onRowClick && 'cursor-pointer',
                        getRowClassName?.(row, i)
                      )}
                      onClick={onRowClick ? () => onRowClick(row, i) : undefined}
                    >
                      {selectable && (
                        <td className="p-4 w-12" onClick={e => e.stopPropagation()}>
                          <Checkbox
                            checked={!!isSelected}
                            onChange={() => toggleRow(key)}
                            aria-label={`Select row ${key}`}
                          />
                        </td>
                      )}
                      {columns.map(col => (
                        <td key={col.id} className="p-4 align-middle text-gray-700">
                          {col.cell
                            ? col.cell(row, i)
                            : col.accessorKey
                            ? (row[col.accessorKey] as React.ReactNode)
                            : null}
                        </td>
                      ))}
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {paginated && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-gray-200 bg-gray-50/50">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>
                Showing <span className="font-medium text-gray-900">{fromEntry}</span>
                {'–'}
                <span className="font-medium text-gray-900">{toEntry}</span>
                {' of '}
                <span className="font-medium text-gray-900">{sortedData.length}</span> entries
              </span>
              <div className="flex items-center gap-2">
                <Select
                  value={String(currentPageSize)}
                  onChange={e => setCurrentPageSize(Number(e.target.value))}
                  size="sm"
                  className="w-[88px]"
                >
                  {pageSizeOptions.map(n => (
                    <option key={n} value={n}>{n} / page</option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(1)}
                disabled={safePage === 1}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="px-3 text-sm font-medium text-gray-700 min-w-[60px] text-center">
                Page {safePage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={safePage === totalPages}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const DataTable = DataTableInner as <T>(props: DataTableProps<T>) => React.ReactElement

export { DataTable }
