import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { fetchPosts, fetchServices } from '../../services/fetchData';

// custom component imports
import Container from '../../components/atoms/display/Container';
import ServiceCardList from '../../components/lists/ServiceCardList';
import HomePostList from '../../components/lists/HomePostList';

export default function ExploreScreen({ navigation }) {
  const [services, setServices] = useState([]);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPosts([]);
    fetchPosts(setPosts).then(() => {
      setRefreshing(false);
    });
  }, []);

  // filling up the services array with the actual services' data:
  useEffect(() => {
    fetchServices(setServices);
  }, []);

  // filling up the posts array with the actual posts' data:
  useEffect(() => {
    fetchPosts(setPosts);
  }, []);

  return (
    <Container>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {services && <ServiceCardList services={services} />}
        {posts && <HomePostList posts={posts} />}
      </ScrollView>
    </Container>
  );
}
