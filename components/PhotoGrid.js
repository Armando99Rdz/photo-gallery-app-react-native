/** component para el grid de fotos */

import React from "react";
import { StyleSheet, Dimensions, FlatList, Image } from "react-native";

import { formatPhotoUri } from "../api/picsum.photos"

/** se obtiene el ancho de la pantalla para despues dividirlo entre el numColumns
 * y obtener las dimisiones de cada imagen (cada celda del grid). */
export default function PhotoGrid({ photos, numColumns, onEndReached }) {

  const { width } = Dimensions.get('window'); // determine width of screen
  const size = width / numColumns; // get size of image on every cell

  return (
    <FlatList 
      data={photos}
      keyExtractor={(item) => item.id}
      numColumns={numColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <Image
          style={styles.image} 
          source={{
            width: size,
            height: size,
            uri: formatPhotoUri(item.id, size, size)
          }}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    margin: 1
  }
})