import Page_ from '@src/entity/page';

type Page = Pick<Page_, 'title' | 'url' | 'description' | 'date' | 'isRead' | 'id'>

export default Page;