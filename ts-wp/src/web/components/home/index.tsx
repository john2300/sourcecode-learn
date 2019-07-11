// import * as React from 'react';
// const Home = () => {
//     return (<span>Home</span>)
// }

// export default Home;








import React, { Suspense } from 'react';
import { useFetch } from 'react-hooks-fetch';
 
const DisplayRemoteData = () => {
  const { error, data } = useFetch('http://...');
  if (error) return <span>Error:{error.message}</span>;
  if (!data) return null; // this is important
  return <span>RemoteData:{data}</span>;
};
 
const Home = () => (
  <Suspense fallback={<span>Loading...</span>}>
      {/* 这里会自动把值取出来 */}
    <DisplayRemoteData />
  </Suspense>
);
export default Home;