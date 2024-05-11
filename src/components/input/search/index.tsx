/* Dependencies */
import { AntDesign } from '@expo/vector-icons'
import React, { useEffect } from 'react'
import {
  TextInput as NativeInput,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'

/* Project */
import type { InputForwardedRef, InputRef, SearhInputProps } from './types'

const BaseInput = (
  props: SearhInputProps,
  ref: React.ForwardedRef<InputRef>
) => {
  const {
    disabled = false,
    onSearch,
    placeholder,
    setRefresh,
    settern,
    value,
    visible = true,
    ...rest
  } = props

  const [lastSearch, setLastSearch] = React.useState<string>('')

  const refNativeInput = React.useRef<NativeInput>(null)
  React.useImperativeHandle(ref, () => ({
    blur: () => {
      refNativeInput.current?.blur()
    },
    focus: () => {
      refNativeInput.current?.focus()
    },
  }))

  useEffect(() => {
    if (!value) {
      setLastSearch('')
      onSearch?.('', '')
      return
    }

    setRefresh?.(true)
    try {
      const lastValue = value
      setTimeout(async () => {
        if (value === lastValue) {
          console.log('value:', value, 'lastvalue:', lastValue)
          await onSearch?.(props.value ?? '', lastSearch)
          if (lastSearch !== value) setLastSearch(value)
        }
      }, 60)
    } finally {
      setRefresh?.(false)
    }
  }, [value])

  return (
    <View style={{ ...styles.container, display: !visible ? 'none' : 'flex' }}>
      <Pressable
        disabled={disabled}
        onPress={() => {
          refNativeInput.current?.focus()
        }}
        style={styles.leftContainer}
      >
        <NativeInput
          selectionColor={'#666'}
          editable={!disabled}
          focusable={!disabled}
          textAlignVertical="center"
          ref={refNativeInput}
          style={styles.input}
          value={value}
          onChangeText={(value) => {
            settern(value)
          }}
          {...rest}
        />
      </Pressable>
      {!disabled && (
        <View
          style={{
            position: 'absolute',
            right: 14,
            flexDirection: 'row',
            gap: 2,
          }}
        >
          {value ? (
            <AntDesign
              onPress={() => settern('')}
              name={'close'}
              size={20}
              color="#444"
            />
          ) : (
            <AntDesign name={'search1'} size={20} color="#aaa" />
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    flexDirection: 'column',
    maxHeight: 54,
    minHeight: 54,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  input: {
    padding: 0,
    margin: 0,
    fontSize: 16,
  },
  inputContainer: {
    borderRadius: 6,
    flex: 1,
  },
  leftContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 0,
  },
})

export const Input = React.forwardRef(BaseInput) as InputForwardedRef

