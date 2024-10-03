'use client';

import Script from 'next/script';

function KakaoScript() {
  const onLoad = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    console.log(window.Kakao.isInitialized());

    // window.Kakao.Link.createDefaultButton({
    //   container: '#my-bucket-share-btn',
    //   objectType: 'feed',
    //   content: {
    //     title: '땡스버킷',
    //     description: '친구의 버킷 공유',
    //     imageUrl: 'https://thanks-bucket.s3.ap-northeast-2.amazonaws.com/images/icons/main-icon.svg',
    //     link: {
    //       mobileWebUrl: 'https://thanks-bucket.vercel.app',
    //       webUrl: 'https://thanks-bucket.vercel.app'
    //     }
    //   }
    // });
  };

  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async onLoad={onLoad} />
    </>
  );
}

export default KakaoScript;
