import { FunctionComponent } from "react";
import styled from '@emotion/styled';

import Page from "@/interfaces/page";
import BlockLink from '@/components/BlockLink.styled';
import usePages from '@/hooks/swr/pages';
import useMounted from "@/hooks/useMounted";
import ky from "ky-universal";

interface ItemProps {
  isRead: boolean;
}

const Item = styled.div`
  ${({isRead}: ItemProps) => isRead ? 'color: grey' : ''};
  padding: 1em;
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
`;

interface Props {
  viewRead: boolean;
}

interface PageProps {
  page: Page;
  refetch: () => void;
}

const Pages: FunctionComponent<Props> & {Page: FunctionComponent<PageProps>} = ({viewRead}) => {
  const {data, isValidating, error, mutate} = usePages();
  const mounted = useMounted();
  if (!mounted) return null;
  if (isValidating || !data) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>{error?.message}</div>
  }

  if (!data || data.length === 0) {
    return (
      <div>
        <p>아직 페이지가 하나도 없습니다. </p>
        <p><b>'SaveYourLink에 저장'</b>을 북마크바로 드래그해서 북마크릿을 생성하고, 원하는 웹 페이지에서 북마크릿을 눌러 링크를 저장해보세요.</p>
      </div>
    );
  }
  
  return data.filter(page => viewRead || !page.isRead).map((page, i) => <Pages.Page key={i} page={page} refetch={mutate} />)
}

Pages.Page = ({page: {id, title, url, description, isRead}, refetch}) => {
  async function handleLinkClick() {
    try {
      await ky.patch(`/api/page/${id}`, {json: {isRead: true}}).json();
      refetch();
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Item isRead={isRead}>
      <BlockLink href={url} target="_blank" onClick={handleLinkClick}>
        <h2>{title}</h2>
        <p>{description}</p>
      </BlockLink>
    </Item>
  )
};

export default Pages;
