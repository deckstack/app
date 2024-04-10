/* Dependencies */
import type { TextInputProps, TextStyle, ViewStyle } from "react-native"

export interface InputProps extends TextInputProps {
  disabled?: boolean
  label?: string
  visible?: boolean
  type?: "text" | "password" | "numeric"
  value: string | undefined
  onChangeText: (value: string) => void
  onFormat?: (value: string) => Promise<string> | string
}

export interface InputRef {
  blur: () => void
  focus: () => void
}

export type InputForwardedRef = (
  props: InputProps & { ref?: React.ForwardedRef<InputRef> }
) => React.ReactElement
