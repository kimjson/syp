import { FunctionComponent } from "react";
import styled from '@emotion/styled';

import Page from "@/interfaces/page";
import BlockLink from '@/components/BlockLink.styled';
import usePages from '@/hooks/swr/pages';
import useMounted from "@/hooks/useMounted";

const Item = styled.div`
  padding: 1em;
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
`;

interface Props {
  page: Page;
}

const Pages: FunctionComponent & {Page: FunctionComponent<Props>} = () => {
  const {data, isValidating, error} = usePages();
  const mounted = useMounted();
  if (!mounted) return null;
  if (isValidating || !data) {
    return <div>로딩 중...</div>;
  }
  if (error) {
    return <div>{error?.message}</div>
  }
  
  return data.map((page, i) => <Pages.Page key={i} page={page} />)
}

Pages.Page = ({page: {title, url, description}}) => {
  return (
    <Item>
      <BlockLink href={url} target="_blank">
        <h2>{title}</h2>
        <p>{description}</p>
      </BlockLink>
    </Item>
  )
};

export default Pages;
