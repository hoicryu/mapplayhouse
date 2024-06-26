import React, { useEffect, useState } from 'react';
import { f7 } from 'framework7-react';
import { oauthLoginApi } from '@api';
import { PageRouteProps } from '@constants';
import useAuth from '@hooks/useAuth';
import SheetAlert from '@components/shared/SheetAlert';
import kakaoIcon from '@assets/icons/kakao.png';

interface KakaoShareButtonProps {
  marketItemId: number;
  marketId: number;
  name: string;
  imageUrl: string;
}

const KakaoShareButton = ({ marketItemId, marketId, name, imageUrl }: KakaoShareButtonProps) => {
  const [market, setMarket] = useState<Market>();
  const queryClient = useQueryClient();

  useEffect(() => {
    (async () => {
      await queryClient.prefetchQuery(`market_${marketId}`, getMarket(marketId));
      setMarket(queryClient.getQueryData(`market_${marketId}`));
    })();
  }, []);

  useEffect(() => {
    if (market) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      createKakaoButton();
    }
  }, [market]);

  const createKakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // javascript key 를 이용하여 initialize
        kakao.init('da7b40a3bd3c5f6a4a51b458f5297687');
      }
      kakao.Link.createDefaultButton({
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: name,
          // description: '#리액트 #카카오 #공유버튼',
          imageUrl: IMAGE_API_URL + imageUrl,
          link: {
            mobileWebUrl: window.location.href,
          },
        },
      });
    }
  };

  return (
    <button id="kakao-link-btn" className="w-auto">
      <img src={kakaoIcon} alt="" className="border border-theme-gray-light rounded-full mr-3 w-7 h-7 p-1" />
    </button>
  );
};

export default React.memo(KakaoShareButton);
