import useSWR from 'swr';
import ky from 'ky-universal';

import Page from '@src/entity/page';

interface PagesResponse {
  data: Page[];
}

export default function usePages() {
  return useSWR('/api/pages', async function(key) {
    const {data} = await ky(key).json<PagesResponse>();
    return data;
  })
}