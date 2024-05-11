export interface SearhInputProps {
  value: string
  settern: (value: string) => void
  disabled?: boolean
  visible?: boolean
  placeholder: string
  onSearch?: (value: string, lastSearch: string) => void
  setRefresh: (value: boolean) => void
}

export interface InputRef {
  blur: () => void
  focus: () => void
}

export type InputForwardedRef = (
  props: SearhInputProps & { ref?: React.ForwardedRef<InputRef> }
) => React.ReactElement

