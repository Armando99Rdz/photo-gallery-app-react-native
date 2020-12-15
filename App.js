/**
 * Sample Photo Gallery App
 * API: https://picsum.photos/
 * by: Armando Rdz 
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useReducer, useCallback } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { getList } from "./api/picsum.photos";
import { actionCreators, initialState, reducer } from "./reducers/photos";
import PhotoGrid from "./components/PhotoGrid";
import SectionTitle from "./components/SectionTitle";

export default function App() {

  // call reducer with our initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  const { photos, nextPage, loading, error } = state;

  /** Request to web api to get photos.
   * We use useCallback because our fetchPhotos function is async, and we need 
   * to make sure we're working with up-to-date values. */
  const fetchPhotos = useCallback(async () => {
    dispatch(actionCreators.loading()) // set loading state

    try {
      const nextPhotos = await getList(nextPage)
      dispatch(actionCreators.success(nextPhotos, nextPage)) // set success state
    } catch (e) {
      dispatch(actionCreators.failure()) // set failure/error state
    }
  })

  /** fetch photos after the initial render */
  useEffect(() => {
    fetchPhotos()
  }, [])

  if (photos.length === 0 || loading) { // loading data / array empty
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} />
      </View>
    )
  }

  if (error) { // if error exists
    return (
      <View style={styles.container}>
        <Text style={{ color: 'red', textAlign: 'center' }}>
          😢️ Failed to load photos!
        </Text>
      </View>
    )
  }

  // all right!
  /** calling fetch photos any time onEndReached is called. */
  return (
    <View>
      <SectionTitle title="Photo Gallery App" />
      <PhotoGrid numColumns={3} photos={photos} onEndReached={fetchPhotos} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})