import React, { useState } from 'react';

// custom component imports:
import CompanyScreenTemplate from '../../components/templates/CompanyScreenTemplate';

export default function MyCompanyScreen({ navigation, route }) {
  const [companyData, setCompanyData] = useState(route.params?.companyData);

  return companyData && <CompanyScreenTemplate navigation={navigation} companyData={companyData} />;
}
