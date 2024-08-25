import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAssets, setQueue } from '../Fetures/Queue/QueueSlice';

const useMusicLibrary = (sortBy = MediaLibrary.SortBy.default) => {
  const [lastMusicAsset, setLastMusicAsset] = useState(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const assets = useSelector((state) => state.queue.assets);
  const dispatch = useDispatch();

  useEffect(() => {
      getAudios();
  }, []);


  const getAudios = async () => {
    try {
      const results = await MediaLibrary.getAssetsAsync({
        first: 10,
        mediaType: MediaLibrary.MediaType.audio,
        sortBy: [sortBy],
      });
      dispatch(setAssets(results.assets));
      dispatch(setQueue(results.assets));
      setLastMusicAsset(results.endCursor);
    } catch (error) {
      console.error('Error fetching audios:', error);
    }
  };

  const loadMore = async () => {
    if (!lastMusicAsset) return;

    setIsLoadingMore(true);
    // try {
      const results = await MediaLibrary.getAssetsAsync({
        first: 5,
        mediaType: MediaLibrary.MediaType.audio,
        sortBy: [sortBy],
        after: lastMusicAsset,
      });
      const newAssets = [...assets, ...results.assets];
      dispatch(setAssets(newAssets));
      dispatch(setQueue(newAssets));
      setLastMusicAsset(results.endCursor);
    // } catch (error) {
    //   console.error('Error loading more audios:', error);
    // } finally {
      setIsLoadingMore(false);
    // }
  };

  return { assets, isLoadingMore, loadMore };
};

export default useMusicLibrary;