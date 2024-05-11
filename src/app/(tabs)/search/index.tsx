import { post } from '@functions/server'
import { useEffect, useState } from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Empty, SearchBar } from '@components'
import colors from '@constants/colors'
import { SearchData } from './types'

export default () => {
  const [search, setSearch] = useState<string>('')
  const [refresh, setRefresh] = useState<boolean>(false)

  const [data, setData] = useState<SearchData[]>()
  const [filteredData, setFilteredData] = useState<SearchData[]>()

  async function handleOnSearch(
    value: string = search,
    lastSearch: string = ''
  ) {
    //console.log(value, search, lastSearch)
    if (!value) {
      setData([])
      setFilteredData([])
      return
    }

    if (
      !data ||
      !value.toLowerCase().startsWith(lastSearch.toLowerCase()) ||
      !lastSearch
    ) {
      const request = await post<SearchData[]>(`users/list`, { search: value })
      if (request.sucess) {
        setData(request.data)
        setFilteredData(request.data)
      }
    } else
      setFilteredData(
        data.filter((item) =>
          item.name.toLowerCase().startsWith(value.toLowerCase())
        )
      )
  }

  // async () => {
  //   const request = await post<any>(`auth/proximty`, { search })
  //   if (request.sucess) setData(request.data)
  // }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View
          style={{
            padding: 10,
          }}
        >
          <SearchBar
            value={search}
            settern={setSearch}
            placeholder={'Pesquisar'}
            onSearch={handleOnSearch}
            setRefresh={setRefresh}
          />
        </View>
        <FlatList
          data={filteredData}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={() => (
            <Empty
              message={!search ? 'Nada pesquisado ainda' : 'Nada encontrado'}
            />
          )}
          refreshControl={
            <RefreshControl
              colors={[
                colors.mainFirst,
                colors.mainSecond,
                colors.mainThird,
                colors.mainFourth,
                colors.mainFifith,
              ]}
              refreshing={refresh}
              onRefresh={() => handleOnSearch()}
            />
          }
          renderItem={({ item }) => (
            <View>
              <View>
                <Text>{item.id}</Text>
              </View>
              <View>
                <Text>{item.name}</Text>
                <Text>{item.username}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

