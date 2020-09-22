import {useState} from 'react';
import styled from '@emotion/styled';

import Layout from '@src/components/Layout';
import Pages from '@src/components/Pages';

const ViewRead = styled.div`
  user-select: none;
`

const IndexPage = () => {
  const [viewRead, setViewRead] = useState(false);
  return (
    <Layout title="페이지들">
      <ViewRead>
        <input type="checkbox" id="viewRead" name="viewRead" defaultChecked={viewRead} onChange={() => setViewRead(!viewRead)} />
        <label htmlFor="viewRead">읽은 링크 표시</label>
      </ViewRead>
      <Pages viewRead={viewRead} />
    </Layout>
  )
}

export default IndexPage
