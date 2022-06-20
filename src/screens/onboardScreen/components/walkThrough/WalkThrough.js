import React, { useState, useRef } from 'react'
import { Image, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import metrics from '../../../../theme/metrics'
import styles from './styles'
import logo from '../../../../assets/images/logo.png'
import { Text } from '../../../../components'
import { useFocusEffect } from '@react-navigation/native'

export const WalkThrough = ({ }) => {
  const [activeIndex, setActiveIndex] = useState(0)
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
    return (
      <>
        <Image source={logo} style={styles.logo} />
        <View style={styles.wrapper} key={index}>
          <Image source={item.image} style={styles.image} />
          <View>
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.desc}>{item?.desc}</Text>
          </View>
        </View>
      </>
    )
  }

  const carouselRef = useRef(null)

  useFocusEffect(() => {
    let pagerTimer = setInterval(() => {
      if (carouselRef.current?.currentIndex >= data.length - 1) {
        carouselRef.current.snapToItem(0, true);
      }

    }, 1000);
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
    image: require('../../../../assets/images/walkthrough/walkthrough-1.png'),
    title: 'Grow your business',
    desc: 'We are committed to going beyond to ensure smooth running of your business.'
  },
  {
    image: require('../../../../assets/images/walkthrough/walkthrough-2.png'),
    title: 'Manage Revenue',
    desc: 'Create instant, scheduled and recurring payments easily'
  },
  {
    image: require('../../../../assets/images/walkthrough/walkthrough-3.png'),
    title: '24/7 Support',
    desc: 'We are committed to going beyond to ensure smooth running of your business.'
  }
]
