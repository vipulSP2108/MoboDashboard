import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, View, Text, ActivityIndicator, Button } from 'react-native';

// Sample data fetching function
const fetchData = async (start, limit) => {
  // Replace this with your data fetching logic
  const newData = Array.from({ length: limit }, (_, i) => `Item ${start + i + 1}`);
  return newData;
};

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const limit = 10;

  const loadMoreData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newData = await fetchData(startIndex, limit);
      if (newData.length < limit) {
        setHasMore(false);
      }
      setData(prevData => [...prevData, ...newData]);
      setStartIndex(prevStartIndex => prevStartIndex + limit);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load initial data
    loadMoreData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 16 }}>
      <Text>{item}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={{ padding: 16 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      ListHeaderComponent={
        <Text style={{marginTop: 10}}>{data.length}</Text>
      }
      renderItem={renderItem}
      keyExtractor={(item) => item}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5} // Trigger load more when user is 50% away from the end
      ListFooterComponent={renderFooter}
    />
  );
};

export default App;
