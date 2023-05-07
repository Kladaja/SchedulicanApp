import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

// custom component imports:
import Container from '../atoms/display/Container';
import CompanyInfo from '../molecules/CompanyInfo';
import CompanyCounters from '../molecules/CompanyCounters';
import ServiceCardList from '../lists/ServiceCardList';
import HomePostList from '../lists/HomePostList';
import { fetchPostsWithUserID, fetchUserForCompany } from '../../services/fetchData';
import { fetchServicesWithCompanyID } from '../../services/fetchData';

export default function CompanyScreenTemplate({ navigation, route, companyData, editAllowed }) {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [services, setServices] = useState([]);
  const [companyCounters, setCompanyCounters] = useState({
    followers: 0,
    posts: 0,
    likes: 0,
  });

  // get the list of the users who are connected to the current company
  useEffect(() => {
    fetchUserForCompany(companyData.id, setUsers);
  }, []);

  // get the list of the services which are connected to the current company
  useEffect(() => {
    fetchServicesWithCompanyID(companyData.id, setServices);
  }, []);

  // the company counters are counted based on the users who are connected with the company
  useEffect(() => {
    let counter = {
      followers: 0,
      posts: 0,
      likes: 0,
    };
    users.forEach((user) => {
      counter.followers += user.userFollowerCounter;
      counter.posts += user.userPostCounter;
      counter.likes += user.userLikeCounter;
    });
    setCompanyCounters(counter);
  }, [users]);

  useEffect(() => {
    users.forEach((user) => {
      fetchPostsWithUserID(user.userID, setPosts);
    });
  }, [users]);

  return (
    <Container>
      <ScrollView>
        <CompanyInfo
          companyName={companyData.companyName}
          companyDescription={companyData.companyDescription}
          companyLogo={companyData.companyLogo}
        />
        {companyCounters && (
          <CompanyCounters
            companyFollowerCounter={companyCounters?.followers}
            companyPostCounter={companyCounters?.posts}
            companyLikeCounter={companyCounters?.likes}
          />
        )}
        {companyData && companyData.companyName && (
          <ServiceCardList
            services={services}
            companyData={companyData}
            navigation={navigation}
            editMode={editAllowed}
          />
        )}
        {posts && (
          <View>
            <HomePostList posts={posts} navigation={navigation} />
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
