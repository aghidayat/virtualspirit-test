/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';

const DATA = [
  {
    id: 1,
    likes: 0,
    image:
      'https://img.freepik.com/free-vector/colourful-dynamic-flow-background_52683-42964.jpg',
  },
  {
    id: 2,
    likes: 0,
    image:
      'https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2545.jpg',
  },
  {
    id: 3,
    likes: 0,
    image:
      'https://img.freepik.com/free-photo/vivid-blurred-colorful-background_58702-2554.jpg',
  },
];

const PostItem = ({post, likes, onLike, onDislike}) => {
  return (
    <View style={styles.card}>
      <Image
        source={{uri: post.image}}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        <View style={styles.itemLikeBox}>
          <Text>{likes} Like</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 10}}>
          <Pressable onPress={() => onLike(post.id)} style={styles.likeButton}>
            <Text style={styles.textButton}>Like</Text>
          </Pressable>
          <Pressable
            style={styles.dislikeButton}
            onPress={() => onDislike(post.id)}>
            <Text style={styles.textButton}>Dislike</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

function App() {
  const [likes, setLikes] = useState(DATA.map(post => post.likes));

  const handleLikeAll = () => {
    setLikes(likes.map(like => like + 1));
  };

  const handleDislikeAll = () => {
    setLikes(likes.map(like => (like > 0 ? like - 1 : 0)));
  };

  const handleResetAll = () => {
    setLikes(likes.map(like => 0));
  };

  return (
    <SafeAreaView style={{padding: 16}}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Pressable style={styles.likeButton} onPress={handleLikeAll}>
              <Text style={styles.textButton}>Like All</Text>
            </Pressable>
            <Pressable style={styles.resetButton} onPress={handleResetAll}>
              <Text style={styles.textLightButton}>Reset All</Text>
            </Pressable>
            <Pressable style={styles.dislikeButton} onPress={handleDislikeAll}>
              <Text style={styles.textButton}>Dislike All</Text>
            </Pressable>
          </View>
          <View style={{marginTop: 10}}>
            <FlatList
              data={DATA}
              renderItem={({item, index}) => (
                <PostItem
                  post={item}
                  likes={likes[index]}
                  onLike={postId =>
                    setLikes(prevLikes =>
                      prevLikes.map((like, index) =>
                        index === postId - 1 ? like + 1 : like,
                      ),
                    )
                  }
                  onDislike={postId =>
                    setLikes(prevLikes =>
                      prevLikes.map((like, index) =>
                        index === postId - 1 ? like - 1 : like,
                      ),
                    )
                  }
                />
              )}
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mytext: {
    color: 'red',
  },
  textButton: {
    color: 'white',
  },
  textLightButton: {
    color: 'black',
  },
  likeButton: {
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#3F70BE',
  },
  resetButton: {
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dislikeButton: {
    padding: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#C93E36',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardBody: {
    padding: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemLikeBox: {
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 2,
    justifyContent: 'center',
    borderRadius: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
});

export default App;
