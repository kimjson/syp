import useSWR from 'swr';

export default function usePages() {
  return useSWR('/pages')
}