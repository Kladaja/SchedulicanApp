import React, { useEffect, useState } from 'react';

// custom component imports:
import CommentsScreenTemplate from '../../components/templates/CommentsScreenTemplate';

export default function CommentsScreen({ navigation, route }) {
  return (
    <CommentsScreenTemplate
      navigation={navigation}
      route={route}
      comments={route.params?.comments}
      refreshScreen={route.params?.refreshScreen}
    />
  );
}
