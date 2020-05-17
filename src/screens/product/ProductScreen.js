/**
 * @flow
 * Created by Dima Portenko on 07.05.2020
 */
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Platform } from 'react-native';
import { View, Colors, Constants, Text } from 'react-native-ui-lib';
import { useRoute } from '@react-navigation/native';

import type { Product } from '../../logic/types/magento';

import { useProductDetails } from '../../logic/product/useProductDetails';
import { MediaGallery } from '../../components/media/MediaGallery';
import { BackButton } from '../../components/controls/BackButton';
import { Price } from '../../components/price/Price';
import { isProductConfigurable } from '../../logic/utils/isProductConfigurable';
import { Options } from '../../components/product/Options';
import { clearHtmlText } from '../../logic/utils/clearHtmlText';
import { Stepper } from '../../components/controls/stepper/Stepper';


export const ProductScreen = () => {
  const route = useRoute();
  const [product] = useState((route.params.product: Product));
  const {
    mediaGalleryEntries,
    productDetails,
    handleSelectionChange,
    handleSetQuantity,
    quantity,
  } = useProductDetails({ product });

  const options = isProductConfigurable(product) ? (
    <Options
      onSelectionChange={handleSelectionChange}
      options={product.configurable_options}
    />
  ) : null;

  return (
    <ScrollView style={styles.container}>
      <View flex>
        <MediaGallery entries={mediaGalleryEntries} />
        <View row padding-page spread>
          <Text productDetailsTitle>{clearHtmlText(product.name)}</Text>
          <Price
            currency={productDetails.price.currency}
            value={productDetails.price.value}
            textProps={{
              productDetailsTitle: true,
            }}
          />
        </View>
        <View paddingH-page paddingB-30>
          {options}
          <Stepper value={quantity} onValueChange={handleSetQuantity} />
        </View>
        <BackButton />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: Platform.select({
      ios: Constants.statusBarHeight,
      android: 0,
    }),
  },
});
