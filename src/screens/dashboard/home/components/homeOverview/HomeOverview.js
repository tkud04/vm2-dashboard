import React, { useState, useEffect, useRef } from 'react'
import { Image, View, TouchableOpacity } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import metrics from '../../../../../theme/metrics'
import { Text } from '../../../../../components'
import { useFocusEffect } from '@react-navigation/native'

import { toCurrency, hideFigures } from '../../../../../utils/helpers'
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './styles'

export const HomeOverview = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showFigures, setShowFigures] = useState(false)
  const [showFiguresIcon, setShowFiguresIcon] = useState('eye-outline')

  const toggleFigures = () => {
    setShowFigures(!showFigures)
    setShowFiguresIcon(showFigures ? "eye-outline" : "eye-off-outline")
  }

  const addBusiness = () => {
    console.log("adding a business");
  }

  const renderPagination = () => {
    return (
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={1}
        inactiveDotScale={0.9}
      />
    )
  }
  const renderContent = ({ item, index }) => {
    let availableBalance = toCurrency(item?.availableBalance),
        overdraftAmount = toCurrency(item?.overdraftAmount),
        availableBalanceHidden = hideFigures(availableBalance),
        overdraftAmountHidden = hideFigures(overdraftAmount)

    return (
      <>
        <View style={styles.container} key={index}>
           <View style={styles.overviewRow}>
             <View>
               <Text style={styles.descriptionText}>Available balance</Text>
               <Text style={styles.availableBalanceText}>&#8358;{showFigures ? availableBalance : availableBalanceHidden}</Text>
             </View>
             <View>
                <TouchableOpacity
                 onPress={toggleFigures}
                 >
                  <Ionicons name={showFiguresIcon} size={20} style={styles.showFiguresIcon}  />
                 </TouchableOpacity>
             </View>
           </View>
           <View style={[styles.overviewRow,]}>
              <View style={{marginTop: 10}}>
                <Text style={styles.descriptionText}>Overdraft amount</Text>
                <Text style={styles.overdraftAmountText}>&#8358;{showFigures ? overdraftAmount : overdraftAmountHidden}</Text>
              </View>
              <View style={{marginTop: 10}}>
                <TouchableOpacity
                 onPress={addBusiness}
                 >
                  <Text style={styles.addBusinessText}>
                  <Ionicons name="add" size={15} style={styles.addBusinessIcon}  /> Add business
                  </Text>
                 </TouchableOpacity>
             </View>
           </View>
        </View>
      </>
    )
  }

  const carouselRef = useRef(null)

  useEffect(() => {
    let pagerTimer = setInterval(() => {
      if (carouselRef.current?.currentIndex >= data.length - 1) {
        setTimeout(() => {carouselRef.current.snapToItem(0, true)},1000)
      }

    }, 2000);
    // carouselRef.current?.startAutoplay(true);
    return () => clearInterval(pagerTimer);
  })

  return (
    <View>
      <Carousel
        data={data}
        ref={carouselRef}
        autoplay={true}
        onSnapToItem={index => setActiveIndex(index)}
        renderItem={renderContent}
        sliderWidth={metrics.screenWidth}
        itemWidth={metrics.screenWidth}
      />
      {renderPagination()}
    </View>
  )
}

const data = [
  {
    availableBalance: 4600000,
    overdraftAmount: 100000
  },
  {
    availableBalance: 1000000,
    overdraftAmount: 45000
  },
]
