/* Dependencies */
import type { TextInputProps, TextStyle, ViewStyle } from 'react-native'

export interface DefaultInputProps extends TextInputProps {
  disabled?: boolean
  label?: string
  visible?: boolean
  type?: 'text' | 'password' | 'numeric' | 'search'
  value: string | undefined
  onChangeText: (value: string) => void
  onFormat?: (value: string) => Promise<string> | string
}

export interface InputRef {
  blur: () => void
  focus: () => void
}

export type InputForwardedRef = (
  props: DefaultInputProps & { ref?: React.ForwardedRef<InputRef> }
) => React.ReactElement

